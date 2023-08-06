#ifndef IBELIE_KIWILITE_H__
#define IBELIE_KIWILITE_H__

#include "map.h"

#define BLOCK_SIZE  (4096)
#define READER_SIZE (32 * BLOCK_SIZE)

#ifdef __cplusplus
extern "C" {
#endif

/* only get special linkage if built as shared or platform is Cygwin */
#if defined(KIWILITE_ENABLE_SHARED) || defined(__CYGWIN__)
#	ifdef KIWILITE_BUILD_CORE
#		define KwAPI_FUNC(RTYPE) __declspec(dllexport) RTYPE
#		define KwAPI_DATA(RTYPE) extern __declspec(dllexport) RTYPE
#	else /* KIWILITE_BUILD_CORE */
#		if !defined(__CYGWIN__)
#			define KwAPI_FUNC(RTYPE) __declspec(dllimport) RTYPE
#		endif /* !__CYGWIN__ */
#		define KwAPI_DATA(RTYPE) extern __declspec(dllimport) RTYPE
#	endif /* KIWILITE_BUILD_CORE */
#endif /* KIWILITE_ENABLE_SHARED */

/* If no external linkage macros defined by now, create defaults */
#ifndef KwAPI_FUNC
#	define KwAPI_FUNC(RTYPE) RTYPE
#endif
#ifndef KwAPI_DATA
#	define KwAPI_DATA(RTYPE) extern RTYPE
#endif

IblMap_KEY_BYTES(Kw_Data,
	struct _bytes value;
);

typedef struct _Storage {
	FILE* file;
	IblMap index;
	uint64 lasttime;
	size_t header;
	size_t indexOffset;

	byte* buffer;
	size_t offset;
	size_t buf_len;
	size_t buf_cap;
	byte basicBuffer[READER_SIZE];
} *Kw_Storage;

KwAPI_FUNC(Kw_Storage) Kw_New(const string);
KwAPI_FUNC(void) Kw_Free(Kw_Storage*);
KwAPI_FUNC(bool) Kw_Get(Kw_Storage, bytes, bytes);
KwAPI_FUNC(bool) Kw_Set(Kw_Storage, IblMap);
KwAPI_FUNC(bool) Kw_Log(Kw_Storage, uint64, uint64, uint64**, size_t*);
KwAPI_FUNC(bool) Kw_Lighten(Kw_Storage, uint64);
KwAPI_FUNC(bool) Kw_Rollback(Kw_Storage, uint64);

#ifdef __cplusplus
}
#endif

#endif /* IBELIE_KIWILITE_H__ */
