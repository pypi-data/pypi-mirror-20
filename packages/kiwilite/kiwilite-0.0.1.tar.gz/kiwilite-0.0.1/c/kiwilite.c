#define _CRT_SECURE_NO_WARNINGS

#include "kiwilite.h"
#include "time.h"

#define OFFSET_SIZE        (8)
#define HEADER_SIZE        (OFFSET_SIZE)
#define INDEX_KEY_PREFIX   (7)
#define INDEX_KEY_SIZE     (INDEX_KEY_PREFIX + OFFSET_SIZE + OFFSET_SIZE)
#define INDEX_MIN_SIZE     (2 + INDEX_KEY_SIZE)
#define INDEX_VALUE_OFFSET (1 + INDEX_KEY_SIZE)
#define INDEX_TIME_OFFSET  (1 + INDEX_KEY_PREFIX)
#define INDEX_PREV_OFFSET  (1 + INDEX_KEY_PREFIX + OFFSET_SIZE)

#ifdef __cplusplus
extern "C" {
#endif

static const char INDEX_KEY_BYTES_ALL[] = {INDEX_KEY_SIZE, '@', 'i', 'b', 'e', 'l', 'i', 'e'};
static const char*INDEX_KEY_BYTES       = INDEX_KEY_BYTES_ALL + 1;

IblMap_KEY_BYTES(IndexMap,
	size_t offset;
	size_t length;
);

static bool _Kw_Clear(Kw_Storage s) {
	if (!IblFileTruncate(s->file, 0)) {
		printf("[KiwiLite] Clear: %s.\n", strerror(errno));
		return false;
	}
	s->header = 0;
	s->indexOffset = 0;
	IblMap_Clear(s->index);
	return true;
}

static size_t _Kw_ExpandBuffer(Kw_Storage s, size_t n) {
	if (s->buf_len + n > s->buf_cap) {
		register byte* buffer;
		if (!s->buffer && n <= READER_SIZE) {
			buffer = s->basicBuffer;
			s->buf_cap = READER_SIZE;
		} else {
			register size_t capacity = 2 * s->buf_cap + n;
			buffer = (byte*)calloc(capacity, sizeof(byte));
			if (!buffer) {
				printf("[KiwiLite] Expand Buffer out of memory %d.\n", capacity);
				return -1;
			}
			s->buf_cap = capacity;
			if (s->buffer) {
				memcpy(buffer, s->buffer, s->buf_len * sizeof(byte));
				if (s->buffer != s->basicBuffer) {
					free(s->buffer);
				}
			}
		}
		s->buffer = buffer;
	}
	register size_t m = s->buf_len;
	s->buf_len += n;
	return m;
}

static size_t _Kw_EnsureBuffer(Kw_Storage s, size_t n) {
	while (true) {
		register size_t m = _Kw_ExpandBuffer(s, n);
		if (m >= 0 || s->buf_len <= 0) {
			return m;
		} else if (fwrite(s->buffer, sizeof(byte), s->buf_len, s->file) < s->buf_len) {
			printf("[KiwiLite] Ensure Buffer: %s.\n", strerror(errno));
			return -1;
		} else {
			s->buf_len = 0;
			s->offset += s->buf_len;
		}
	}
}

/* Write varint length and bytes. */
static bool _Kw_DullWriteBytes(Kw_Storage s, byte* buffer, size_t buf_len) {
	size_t m = _Kw_EnsureBuffer(s, IblSizeVarint(buf_len));
	if (m < 0) { return false; }
	IblPutUvarint(s->buffer + m, buf_len);
	if ((m = _Kw_EnsureBuffer(s, buf_len)) >= 0) {
		memcpy(s->buffer + m, buffer, buf_len * sizeof(byte));
	} else if (s->buf_len <= 0) {
		return false;
	} else if ((m = fwrite(buffer, sizeof(byte), buf_len, s->file)) < buf_len) {
		printf("[KiwiLite] Write Bytes: %s.\n", strerror(errno));
		return false;
	} else {
		s->offset += m;
	}
	return true;
}

/* Write index. */
static bool _Kw_WriteIndex(Kw_Storage s) {
	/* calculate index length */
	register IndexMap idx;
	register IblMap_Item item;
	register size_t indexLength = 0;
	for (item = IblMap_Begin(s->index); item; item = IblMap_Next(s->index, item)) {
		idx = (IndexMap)item;
		indexLength += IblSizeVarint(idx->key.length) + idx->key.length +
			IblSizeVarint(idx->offset) + IblSizeVarint(idx->length);
	}
	register size_t m = _Kw_ExpandBuffer(s, IblSizeVarint(indexLength) + indexLength);

	/* write index */
	if (m >= 0) {
		m += IblPutUvarint(s->buffer + m, indexLength);
		for (item = IblMap_Begin(s->index); item; item = IblMap_Next(s->index, item)) {
			idx = (IndexMap)item;
			m += IblPutUvarint(s->buffer + m, idx->key.length);
			memcpy(s->buffer + m, idx->key.data, idx->key.length * sizeof(byte));
			m += idx->key.length;
			m += IblPutUvarint(s->buffer + m, idx->length);
			m += IblPutUvarint(s->buffer + m, idx->offset);
		}
	} else {
		if ((m = _Kw_EnsureBuffer(s, IblSizeVarint(indexLength))) < 0) {
			return false;
		}
		IblPutUvarint(s->buffer + m, indexLength);
		for (item = IblMap_Begin(s->index); item; item = IblMap_Next(s->index, item)) {
			idx = (IndexMap)item;
			if (!_Kw_DullWriteBytes(s, idx->key.data, idx->key.length)) {
				return false;
			}
			if ((m = _Kw_EnsureBuffer(s, IblSizeVarint(idx->length))) < 0) {
				return false;
			}
			IblPutUvarint(s->buffer + m, idx->length);
			if ((m = _Kw_EnsureBuffer(s, IblSizeVarint(idx->offset))) < 0) {
				return false;
			}
			IblPutUvarint(s->buffer + m, idx->offset);
		}
	}

	return true;
}

/* Scan the storage file and rebuild index. */
static void _Kw_Rebuild(Kw_Storage s, IblMap index, size_t start, size_t end, size_t buf_len) {
	size_t head = 0, tail, n;
	size_t anchor = 0;
	size_t keyLenSize, lengthSize, offsetSize;
	uint64 keyLength, length, offset;
	struct _bytes key = {NULL, 0};
	byte* buffer = s->basicBuffer;
	if (start >= end) {
	} else if (fseek(s->file, start, SEEK_SET)) {
		printf("[KiwiLite] Rebuild seek header: %s.\n", strerror(errno));
		goto rebuild_end;
	}
	while (anchor < end) {
		if (anchor == 0) {
			anchor = start;
		}
		tail = buf_len;
		if (tail <= head) {
			tail = head = 0;
		} else if (head != 0) {
			memcpy(buffer, buffer + head, tail - head * sizeof(byte));
			tail -= head;
			head = 0;
		}
		if (tail >= READER_SIZE) {
			printf("[KiwiLite] Warning: Rebuild parsing error.\n");
			goto rebuild_end;
		}
		register size_t extra = end - anchor;
		if (extra < READER_SIZE - tail) {
			buf_len = extra + tail;
		} else {
			buf_len = READER_SIZE;
		}
		if (buf_len <= tail) {
		} else if ((n = fread(buffer + tail, sizeof(byte), buf_len - tail, s->file)) <= 0) {
			printf("[KiwiLite] Rebuild read buffer: %s.\n", strerror(errno));
			goto rebuild_end;
		} else {
			buf_len = n + tail;
			anchor += n;
		}
		while (head < buf_len) {
			if (!key.data) {
				keyLenSize = IblUvarint(buffer + head, buf_len - head, &keyLength);
				if (keyLenSize == 0) {
					break;
				} else if (keyLenSize < 0) {
					printf("[KiwiLite] Warning: Rebuild bad key length.\n");
					break;
				} else if (head + keyLenSize + keyLength > buf_len) {
					if (keyLength >= READER_SIZE / 2) {
						key.length = (size_t)keyLength;
						key.data = (byte*)calloc((size_t)keyLength + 1, sizeof(byte));
						if (!key.data) {
							printf("[KiwiLite] Warning: Rebuild key out of memory %d.\n", (size_t)keyLength + 1);
							goto rebuild_end;
						}
						n = head + keyLenSize;
						memcpy(key.data, buffer + n, (buf_len - n) * sizeof(byte));
						n = buf_len - n;
						if (fread(key.data + n, sizeof(byte), (size_t)keyLength - n, s->file) < keyLength - n) {
							printf("[KiwiLite] Rebuild read key: %s.\n", strerror(errno));
							goto rebuild_end;
						} else {
							anchor += (size_t)keyLength - n;
							head = buf_len + (size_t)keyLength - n;
						}
					}
					break;
				} else {
					head += keyLenSize;
					key.length = (size_t)keyLength;
					key.data = (byte*)calloc((size_t)keyLength + 1, sizeof(byte));
					if (!key.data) {
						printf("[KiwiLite] Warning: Rebuild key out of memory %d.\n", (size_t)keyLength + 1);
						goto rebuild_end;
					}
					memcpy(key.data, buffer + head, (size_t)keyLength * sizeof(byte));
					head += (size_t)keyLength;
				}
			}

			lengthSize = IblUvarint(buffer + head, buf_len - head, &length);
			if (lengthSize == 0) {
				break;
			} else if (lengthSize < 0) {
				printf("[KiwiLite] Warning: Rebuild ignore bad length.\n");
				break;
			}

			if (start == HEADER_SIZE) {
				head += lengthSize;
				offset = anchor + head - buf_len;
				head += (size_t)length;
				if (head > buf_len) {
					anchor += head - buf_len;
					if (fseek(s->file, anchor, SEEK_SET)) {
						printf("[KiwiLite] Rebuild seek value: %s.\n", strerror(errno));
						goto rebuild_end;
					}
				}
			} else {
				offsetSize = IblUvarint(buffer + head + lengthSize, buf_len - head - lengthSize, &offset);
				if (offsetSize == 0) {
					break;
				} else if (offsetSize < 0) {
					printf("[KiwiLite] Warning: Rebuild ignore bad offset.\n");
					break;
				}
				head += lengthSize + offsetSize;
			}

			if (keyLength != INDEX_KEY_SIZE || strncmp(key.data, INDEX_KEY_BYTES, INDEX_KEY_PREFIX)) {
				if (length <= 0 || length >= anchor) {
					IblMap_Del(index, &key);
				} else {
					register IndexMap idx = (IndexMap)IblMap_Set(index, &key);
					idx->offset = (size_t)offset;
					idx->length = (size_t)length;
				}
			}
			if (key.data) { free(key.data); }
			key.data = NULL;
		}
	}

rebuild_end:
	if (key.data) { free(key.data); }
}

/* Verify the storage file and refresh the cached index. */
static void _Kw_Verify(Kw_Storage s) {
	/* read header and index of storage file */
	size_t header, buf_len = 0;
	size_t indexLenSize;
	uint64 indexLength, offset;
	byte* buffer = s->basicBuffer;
	if (fseek(s->file, 0, SEEK_SET)) {
		printf("[KiwiLite] Verify seek header: %s.\n", strerror(errno));
		return;
	} else if (fread(buffer, sizeof(byte), HEADER_SIZE, s->file) < HEADER_SIZE) {
		/* 1. the file has no data, init cache */
		if (s->index) {
			IblMap_Clear(s->index);
		} else {
			s->index = IndexMap_New();
		}
		s->header = 0;
		s->indexOffset = 0;
		return;
	}

	header = (size_t)IblUint64(buffer);
	if ((header = (size_t)IblUint64(buffer)) == s->header) { return; }

	offset = header;
	if (fseek(s->file, (size_t)offset, SEEK_SET)) {
		printf("[KiwiLite] Verify seek index: %s.\n", strerror(errno));
		goto verify_rebuild;
	} else if ((buf_len = fread(buffer, sizeof(byte), READER_SIZE, s->file)) <= 0) {
		printf("[KiwiLite] Warning: cannot read index (%s), rebuild index.\n", strerror(errno));
		goto verify_rebuild;
	}
	offset += buf_len;

	if (memcmp(buffer, INDEX_KEY_BYTES_ALL, (1 + INDEX_KEY_PREFIX) * sizeof(byte))) {
		printf("[KiwiLite] Warning: Verify bad index-key-prefix, rebuild index.\n");
		goto verify_rebuild;
	}
	indexLenSize = IblUvarint(buffer + INDEX_VALUE_OFFSET, buf_len - INDEX_VALUE_OFFSET, &indexLength);
	if (indexLenSize <= 0 || indexLength <= 0) {
		printf("[KiwiLite] Warning: Verify bad index length, rebuild index.\n");
		goto verify_rebuild;
	}
	buf_len -= indexLenSize + INDEX_VALUE_OFFSET;
	memcpy(buffer, buffer + indexLenSize + INDEX_VALUE_OFFSET, buf_len * sizeof(byte));

	/* 2. refresh index */
	if (s->index) {
		IblMap_Clear(s->index);
	} else {
		s->index = IndexMap_New();
	}
	_Kw_Rebuild(s, s->index, (size_t)offset, (size_t)(offset + indexLength) - buf_len, buf_len);
	s->header = header;
	s->indexOffset = header;
	return;

verify_rebuild:

	/* 3. bad index data; scan the whole file to rebuild index */
	if (fseek(s->file, 0, SEEK_END)) {
		printf("[KiwiLite] Verify seek end: %s.\n", strerror(errno));
		return;
	}
	register long tail = ftell(s->file);
	if (tail <= 0) {
		printf("[KiwiLite] Warning: Verify bad tail.\n");
		return;
	}
	if (s->index) {
		IblMap_Clear(s->index);
	} else {
		s->index = IndexMap_New();
	}
	_Kw_Rebuild(s, s->index, HEADER_SIZE, tail, 0);
	s->header = header;
	s->indexOffset = tail - INDEX_VALUE_OFFSET;
	printf("[KiwiLite] Rebuild index.\n");
}

Kw_Storage Kw_New(const string file) {
	register Kw_Storage s = (Kw_Storage)calloc(1, sizeof(struct _Storage));
	if (s) { s->file = IblFileOpen(file); }
	return s;
}

void Kw_Free(Kw_Storage* s) {
	if (!(*s))       { return; }
	if ((*s)->index) { IblMap_Free((*s)->index); }
	if ((*s)->file)  { fclose((*s)->file); }
	if ((*s)->buffer != (*s)->basicBuffer) {
		free((*s)->buffer);
	}
	free(*s);
	*s = NULL;
}

/* Get value bytes of key. */
bool Kw_Get(Kw_Storage s, bytes key, bytes value) {
	if (!s->file) { return false; }
	clearerr(s->file);
	if (!s->index) { _Kw_Verify(s); }
	register IndexMap item = (IndexMap)IblMap_Get(s->index, key);
	if (!item) {
		value->data = NULL;
		value->length = 0;
	} else {
		if (fseek(s->file, item->offset, SEEK_SET)) {
			printf("[KiwiLite] Get seek: %s.\n", strerror(errno));
			return false;
		}
		value->data = (byte*)calloc(item->length, sizeof(byte));
		if (!value->data) {
			printf("[KiwiLite] Get out of memory %d.\n", item->length);
			return false;
		}
		if (fread(value->data, sizeof(byte), item->length, s->file) < item->length) {
			free(value->data);
			printf("[KiwiLite] Get read: %s.\n", strerror(errno));
			return false;
		}
		value->length = item->length;
	}
	return true;
}

/* Set map data of key and value and save storage file. */
bool Kw_Set(Kw_Storage s, IblMap data) {
	register IblMap index;
	if (!s->file) { return false; }
	clearerr(s->file);
	if (!s->index) { _Kw_Verify(s); }

	/* seek and clear old index */
	register size_t m;
	if (s->indexOffset) {
		if ((m = _Kw_EnsureBuffer(s, 1)) < 0) { return false; }
		s->offset = s->indexOffset + INDEX_VALUE_OFFSET;
		s->buffer[m] = 0;
	} else {
		s->offset = HEADER_SIZE;
	}
	if (fseek(s->file, s->offset, SEEK_SET)) {
		printf("[KiwiLite] Set seek: %s.\n", strerror(errno));
		return false;
	} else if (!(index = IndexMap_New())) {
		return false;
	}

	/* calculate data length */
	register uint64 dataLength = 0;
	register IblMap_Item item;
	for (item = IblMap_Begin(data); item; item = IblMap_Next(data, item)) {
		register Kw_Data d = (Kw_Data)item;
		dataLength += d->key.length + IblSizeVarint(d->key.length) + d->value.length + IblSizeVarint(d->value.length);
	}
	m = _Kw_ExpandBuffer(s, (size_t)dataLength);

	/* write (key, value) data */
	if (m >= 0) {
		for (item = IblMap_Begin(data); item; item = IblMap_Next(data, item)) {
			register Kw_Data d = (Kw_Data)item;
			m += IblPutUvarint(s->buffer + m, d->key.length);
			memcpy(s->buffer + m, d->key.data, d->key.length * sizeof(byte));
			m += d->key.length;
			m += IblPutUvarint(s->buffer + m, d->value.length);
			register IndexMap idx = (IndexMap)IblMap_Set(index, &d->key);
			idx->offset = s->offset + m;
			idx->length = d->value.length;
			memcpy(s->buffer + m, d->value.data, d->value.length * sizeof(byte));
			m += d->value.length;
		}
	} else {
		for (item = IblMap_Begin(data); item; item = IblMap_Next(data, item)) {
			register Kw_Data d = (Kw_Data)item;
			if (!_Kw_DullWriteBytes(s, d->key.data, d->key.length)) { goto set_err; }
			if (!_Kw_DullWriteBytes(s, d->value.data, d->value.length)) { goto set_err; }
			register IndexMap idx = (IndexMap)IblMap_Set(index, &d->key);
			idx->offset = s->offset + s->buf_len - d->value.length;
			idx->length = d->value.length;
		}
	}

	/* get new index offset and write index key */
	if ((m = _Kw_EnsureBuffer(s, INDEX_VALUE_OFFSET)) < 0) { goto set_err; }
	register size_t indexOffset = s->offset + m;
	memcpy(s->buffer + m, INDEX_KEY_BYTES_ALL, (1 + INDEX_KEY_PREFIX) * sizeof(byte));
	m += 1 + INDEX_KEY_PREFIX;
	register uint64 currtime = time(NULL) * (uint64)1E9;
	if (s->lasttime >= currtime) {
		s->lasttime++;
	} else {
		s->lasttime = currtime;
	}
	IblPutUint64(s->buffer + m, s->lasttime);
	IblPutUint64(s->buffer + m + 8, s->indexOffset);

	/* write index */
	for (item = IblMap_Begin(index); item; item = IblMap_Next(index, item)) {
		register IndexMap i = (IndexMap)item;
		if (i->length > 0) {
			register IndexMap idx = (IndexMap)IblMap_Set(s->index, &i->key);
			idx->offset = i->offset;
			idx->length = i->length;
		} else {
			IblMap_Del(s->index, &i->key);
		}
	}
	if (!_Kw_WriteIndex(s)) {
		goto set_err;
	} else if ((m = fwrite(s->buffer, sizeof(byte), s->buf_len, s->file)) < s->buf_len) {
		printf("[KiwiLite] Set write index: %s.\n", strerror(errno));
		goto set_err;
	} else {
		s->buf_len = 0;
		s->offset += m;
	}

	/* write header */
	if (!IblFileWriteUint64At(s->file, indexOffset, 0)) {
		printf("[KiwiLite] Set write header: %s.\n", strerror(errno));
		goto set_err;
	}
	s->indexOffset = indexOffset;
	s->header = indexOffset;

	IblMap_Free(index);
	return true;

set_err:
	IblMap_Free(index);
	return false;
}

/* Log: a list of timestones. */
bool Kw_Log(Kw_Storage s, uint64 start, uint64 end, uint64** timestones, size_t* n) {
	size_t buf_cap = 10, buf_len = 0;
	uint64 bootstrap[10];
	uint64* buffer = bootstrap;
	if (!s->file) { return false; }
	clearerr(s->file);
	if (!s->index) { _Kw_Verify(s); }

	register byte* timestone = s->basicBuffer;
	register size_t offset = s->indexOffset;
	while (offset > 0) {
		if (fseek(s->file, offset, SEEK_SET)) {
			printf("[KiwiLite] Log seek: %s.\n", strerror(errno));
			goto log_err;
		} else if (fread(timestone, sizeof(byte), INDEX_MIN_SIZE, s->file) < INDEX_MIN_SIZE) {
			printf("[KiwiLite] Log read: %s.\n", strerror(errno));
			goto log_err;
		} else if ((offset != s->indexOffset && timestone[INDEX_MIN_SIZE-1] != 0) ||
			memcmp(timestone, INDEX_KEY_BYTES_ALL, (1 + INDEX_KEY_PREFIX) * sizeof(byte))) {
			printf("[KiwiLite] Log: index Error.\n");
			goto log_err;
		}
		register uint64 t = IblUint64(timestone + INDEX_TIME_OFFSET);
		if (end == 0 || t <= end) {
			if (buf_len >= buf_cap) {
				buf_cap <<= 1;
				register uint64* new_buffer = (uint64*)calloc(buf_cap, sizeof(uint64));
				if (!new_buffer) {
					printf("[KiwiLite] Log out of memory %d.\n", buf_cap);
					goto log_err;
				}
				memcmp(new_buffer, buffer, buf_len * sizeof(byte));
				if (buffer != bootstrap) { free(buffer); }
				buffer = new_buffer;
			}
			buffer[buf_len++] = t;
		}
		if (start != 0 && t < start) { break; }
		offset = (size_t)IblUint64(timestone + INDEX_PREV_OFFSET);
	}

	*n = buf_len;
	*timestones = (uint64*)calloc(buf_len, sizeof(uint64));
	if (!*timestones) {
		printf("[KiwiLite] Log out of memory %d.\n", buf_len);
		goto log_err;
	}
	register size_t i;
	for (i = 0; i < buf_len; i++) {
		(*timestones)[i] = buffer[buf_len - i - 1];
	}

	if (buffer && buffer != bootstrap) { free(buffer); }
	return true;

log_err:
	if (buffer && buffer != bootstrap) { free(buffer); }
	return false;
}

IblMap_KEY_NUMERIC(Fragment, size_t,
	size_t total;
	size_t offset;
	size_t length;
)

bool Kw_Lighten(Kw_Storage s, uint64 timestamp) {
	size_t buf_cap = 10, buf_len = 0, fragment_cap = READER_SIZE;
	uint64 bootstrap[10];
	uint64* buffer = bootstrap;
	byte defragmentBytes[READER_SIZE];
	byte* fragmentBytes = defragmentBytes;

	IblMap index = NULL;
	IblMap fragments = NULL;
	struct _bytes key;
	size_t offset;

	if (!s->file) { return false; }
	clearerr(s->file);
	if (!s->index) { _Kw_Verify(s); }
	if (!s->indexOffset) {
		printf("[KiwiLite] Warning: storage file is empty.\n");
		return true;
	}

	register uint64 t;
	register byte* timestone = s->basicBuffer;

	if (timestamp == 0) {
		buffer[buf_len++] = s->indexOffset;
		if (fseek(s->file, s->indexOffset, SEEK_SET)) {
			printf("[KiwiLite] Lighten seek timestamp: %s.\n", strerror(errno));
			return false;
		} else if (fread(timestone, sizeof(byte), INDEX_MIN_SIZE, s->file) < INDEX_MIN_SIZE) {
			printf("[KiwiLite] Lighten read timestamp: %s.\n", strerror(errno));
			return false;
		} else if (memcmp(timestone, INDEX_KEY_BYTES_ALL, (1 + INDEX_KEY_PREFIX) * sizeof(byte))) {
			printf("[KiwiLite] Lighten: index Error.\n");
			return false;
		} else {
			t = IblUint64(timestone + INDEX_TIME_OFFSET);
		}
	} else {
		// backtracking
		register uint64 pT;
		register size_t prev = s->indexOffset;
		while (prev > 0) {
			if (fseek(s->file, prev, SEEK_SET)) {
				printf("[KiwiLite] Lighten backtracking seek: %s.\n", strerror(errno));
				goto lighten_err;
			} else if (fread(timestone, sizeof(byte), INDEX_MIN_SIZE, s->file) < INDEX_MIN_SIZE) {
				printf("[KiwiLite] Lighten backtracking read: %s.\n", strerror(errno));
				goto lighten_err;
			} else if ((prev != s->indexOffset && timestone[INDEX_MIN_SIZE-1] != 0) ||
				memcmp(timestone, INDEX_KEY_BYTES_ALL, (1 + INDEX_KEY_PREFIX) * sizeof(byte))) {
				printf("[KiwiLite] Lighten: backtracking index Error.\n");
				goto lighten_err;
			} else if ((pT = IblUint64(timestone + INDEX_TIME_OFFSET)) < timestamp) {
				break;
			} else {
				if (buf_len >= buf_cap) {
					buf_cap <<= 1;
					register uint64* new_buffer = (uint64*)calloc(buf_cap, sizeof(uint64));
					if (!new_buffer) {
						printf("[KiwiLite] Lighten: timestone out of memory %d.\n", buf_cap);
						goto lighten_err;
					}
					memcmp(new_buffer, buffer, buf_len * sizeof(byte));
					if (buffer != bootstrap) { free(buffer); }
					buffer = new_buffer;
				}
				buffer[buf_len++] = prev;
				t = pT;
				prev = (size_t)IblUint64(timestone + INDEX_PREV_OFFSET);
			}
		}
		if (prev == 0) {
			printf("[KiwiLite] Warning: no need to lighten, current %lld.\n", pT);
			if (buffer && buffer != bootstrap) { free(buffer); }
			return true;
		}
	}

	// sort timestone
	register size_t i, m;
	for (i = 0; i < buf_len / 2; i++) {
		register size_t j = buf_len - i - 1;
		register uint64 temp = buffer[i];
		buffer[i] = buffer[j];
		buffer[j] = temp;
	}
	register size_t lightenEnd = (size_t)buffer[0];

	// rebuild index of timestamp
	index = s->index;
	if (lightenEnd != s->indexOffset) {
		// scan before lightenEnd to rebuild index
		index = IndexMap_New();
		if (!index) {
			printf("[KiwiLite] Lighten: index alloc error.\n");
			goto lighten_err;
		}
		_Kw_Rebuild(s, index, HEADER_SIZE, lightenEnd, 0);
	}

	// sort fragments
	fragments = Fragment_New();
	register IblMap_Item item;
	for (item = IblMap_Begin(index); item; item = IblMap_Next(index, item)) {
		register IndexMap idx = (IndexMap)item;
		register size_t keyLenSize = IblSizeVarint(idx->key.length);
		register size_t extraLength = IblSizeVarint(idx->length) + idx->key.length + keyLenSize;
		offset = idx->offset - extraLength;
		register Fragment fragment = (Fragment)IblMap_Set(fragments, &offset);
		fragment->total = extraLength + idx->length;
		fragment->offset = keyLenSize;
		fragment->length = idx->key.length;
	}

	// defragmentation and update s.index
	s->offset = HEADER_SIZE;
	for (item = IblMap_Begin(fragments); item; item = IblMap_Next(fragments, item)) {
		register Fragment fragment = (Fragment)item;
		if (fragment->total > fragment_cap) {
			fragment_cap = fragment_cap * 2 + fragment->total;
			fragmentBytes = (byte*)calloc(fragment_cap, sizeof(byte));
			if (!fragmentBytes) {
				printf("[KiwiLite] Lighten: fragment out of memory %d.\n", fragment_cap);
			}
		}
		if (fseek(s->file, fragment->key, SEEK_SET)) {
			printf("[KiwiLite] Lighten seek fragment from: %s.\n", strerror(errno));
			goto lighten_err;
		} else if (fread(fragmentBytes, sizeof(byte), fragment->total, s->file) < fragment->total) {
			printf("[KiwiLite] Lighten read fragment: %s.\n", strerror(errno));
			goto lighten_err;
		} else if ((m = _Kw_EnsureBuffer(s, fragment->total)) >= 0) {
			memcpy(s->buffer + m, fragmentBytes, fragment->total * sizeof(byte));
		} else if (s->buf_len <= 0) {
			goto lighten_err;
		} else if (fseek(s->file, s->offset, SEEK_SET)) {
			printf("[KiwiLite] Lighten seek fragment to: %s.\n", strerror(errno));
			goto lighten_err;
		} else if (fwrite(fragmentBytes, sizeof(byte), fragment->total, s->file) != fragment->total) {
			printf("[KiwiLite] Lighten write fragment: %s.\n", strerror(errno));
			goto lighten_err;
		} else {
			s->offset += fragment->total;
		}
		key.length = fragment->length;
		key.data = fragmentBytes + fragment->offset;
		register IndexMap idx = (IndexMap)IblMap_Get(s->index, &key);
		if (idx && idx->offset < lightenEnd) {
			idx->offset = s->offset + s->buf_len - idx->length;
		}
	}

	// update s.index
	if (s->buf_len <= 0) {
	} else if (fseek(s->file, s->offset, SEEK_SET)) {
		printf("[KiwiLite] Lighten seek fragment buffer: %s.\n", strerror(errno));
	} else if ((m = fwrite(s->buffer, sizeof(byte), s->buf_len, s->file)) < s->buf_len) {
		printf("[KiwiLite] Lighten write fragment buffer: %s.\n", strerror(errno));
		goto lighten_err;
	} else {
		s->buf_len = 0;
		s->offset += m;
	}
	register size_t deltaOffset = lightenEnd - s->offset;
	for (item = IblMap_Begin(s->index); item; item = IblMap_Next(s->index, item)) {
		register IndexMap idx = (IndexMap)item;
		if (idx->offset > lightenEnd) {
			idx->offset -= deltaOffset;
		}
	}

	// shift data
	register size_t shiftEnd = s->indexOffset + INDEX_VALUE_OFFSET;
	for (offset = lightenEnd; offset < shiftEnd;) {
		register size_t length = shiftEnd - offset;
		length = length > READER_SIZE ? READER_SIZE : length;
		if (fseek(s->file, offset, SEEK_SET)) {
			printf("[KiwiLite] Lighten shift from: %s.\n", strerror(errno));
			goto lighten_err;
		} else if (fread(s->basicBuffer, sizeof(byte), length, s->file) < length) {
			printf("[KiwiLite] Lighten shift read: %s.\n", strerror(errno));
			goto lighten_err;
		} else if (fseek(s->file, s->offset, SEEK_SET)) {
			printf("[KiwiLite] Lighten shift to: %s.\n", strerror(errno));
			goto lighten_err;
		} else if (fwrite(s->basicBuffer, sizeof(byte), length, s->file) != length) {
			printf("[KiwiLite] Lighten shift write: %s.\n", strerror(errno));
			goto lighten_err;
		} else {
			s->offset += length;
			offset += length;
		}
	}

	// write index
	if (!_Kw_WriteIndex(s)) {
		goto lighten_err;
	} else if ((m = fwrite(s->buffer, sizeof(byte), s->buf_len, s->file)) < s->buf_len) {
		printf("[KiwiLite] Lighten write index: %s.\n", strerror(errno));
		goto lighten_err;
	} else {
		s->buf_len = 0;
		s->offset += m;
	}

	// update 'prev' field of timestone
	register uint64 prevOffset = 0;
	for (i = 0; i < buf_len; i++) {
		if (!IblFileWriteUint64At(s->file, prevOffset,
			(size_t)buffer[i] - deltaOffset + INDEX_PREV_OFFSET)) {
			printf("[KiwiLite] Lighten write timestones: %s.\n", strerror(errno));
			goto lighten_err;
		}
		prevOffset = buffer[i] - deltaOffset;
	}

	// write header and truncate
	if (!IblFileWriteUint64At(s->file, s->indexOffset - deltaOffset, 0)) {
		printf("[KiwiLite] Lighten write header: %s.\n", strerror(errno));
		goto lighten_err;
	}
	if (!IblFileTruncate(s->file, s->offset)) {
		printf("[KiwiLite] Lighten truncate: %s.\n", strerror(errno));
		goto lighten_err;
	}
	s->indexOffset -= deltaOffset;
	s->header = s->indexOffset;

	printf("[KiwiLite] Lighten file to %lld.\n", t);
	if (fragmentBytes && fragmentBytes != defragmentBytes) { free(fragmentBytes); }
	if (buffer && buffer != bootstrap) { free(buffer); }
	IblMap_Free(fragments);
	if (index != s->index) {
		IblMap_Free(index);
	}
	return true;

lighten_err:
	if (fragmentBytes && fragmentBytes != defragmentBytes) { free(fragmentBytes); }
	if (buffer && buffer != bootstrap) { free(buffer); }
	IblMap_Free(fragments);
	if (index != s->index) {
		IblMap_Free(index);
	}
	return false;
}

bool Kw_Rollback(Kw_Storage s, uint64 timestamp) {
	if (!s->file) { return false; }
	clearerr(s->file);
	if (!s->index) { _Kw_Verify(s); }

	// clear all data
	if (timestamp == 0) {
		printf("[KiwiLite] Clear file.\n");
		return _Kw_Clear(s);
	}

	// verify
	if (!s->indexOffset) {
		printf("[KiwiLite] Warning: storage file is empty.\n");
		return true;
	}

	// backtracking
	register uint64 t;
	register size_t m, indexOffset = s->indexOffset;
	register byte* timestone = s->basicBuffer;
	while (indexOffset > 0) {
		if (fseek(s->file, indexOffset, SEEK_SET)) {
			printf("[KiwiLite] Rollback backtracking seek: %s.\n", strerror(errno));
			return false;
		} else if (fread(timestone, sizeof(byte), INDEX_MIN_SIZE, s->file) < INDEX_MIN_SIZE) {
			printf("[KiwiLite] Rollback backtracking read: %s.\n", strerror(errno));
			return false;
		} else if ((indexOffset != s->indexOffset && timestone[INDEX_MIN_SIZE-1] != 0) ||
			memcmp(timestone, INDEX_KEY_BYTES_ALL, (1 + INDEX_KEY_PREFIX) * sizeof(byte))) {
			printf("[KiwiLite] Rollback: index Error.\n");
			return false;
		} else if ((t = IblUint64(timestone + INDEX_TIME_OFFSET)) <= timestamp) {
			break;
		} else {
			indexOffset = (size_t)IblUint64(timestone + INDEX_PREV_OFFSET);
		}
	}
	if (!indexOffset) {
		printf("[KiwiLite] Warning: clear file, before %lld.\n", t);
		return _Kw_Clear(s);
	} else if (indexOffset == s->indexOffset) {
		printf("[KiwiLite] Warning: no need to rollback, current %lld.\n", t);
		return true;
	}

	// scan before timestamp to rebuild index
	IblMap_Clear(s->index);
	_Kw_Rebuild(s, s->index, HEADER_SIZE, indexOffset, 0);

	// write index
	s->offset = indexOffset + INDEX_VALUE_OFFSET;
	if (fseek(s->file, s->offset, SEEK_SET)) {
		printf("[KiwiLite] Rollback seek index: %s.\n", strerror(errno));
		return false;
	}
	if (!_Kw_WriteIndex(s)) {
		return false;
	} else if ((m = fwrite(s->buffer, sizeof(byte), s->buf_len, s->file)) < s->buf_len) {
		printf("[KiwiLite] Rollback write index: %s.\n", strerror(errno));
		return false;
	} else {
		s->buf_len = 0;
		s->offset += m;
	}

	// write header and truncate
	if (!IblFileWriteUint64At(s->file, indexOffset, 0)) {
		printf("[KiwiLite] Rollback write header: %s.\n", strerror(errno));
		return false;
	}
	if (!IblFileTruncate(s->file, s->offset)) {
		printf("[KiwiLite] Rollback truncate: %s.\n", strerror(errno));
		return false;
	}
	s->indexOffset = indexOffset;
	s->header = indexOffset;

	printf("[KiwiLite] Rollback file to %lld.\n", t);
	return true;
}

#ifdef __cplusplus
}
#endif
