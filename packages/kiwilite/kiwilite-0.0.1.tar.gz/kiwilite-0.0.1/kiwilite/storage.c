#define HAVE_ROUND

#include "Python.h"
#include "kiwilite.h"

#ifndef PyVarObject_HEAD_INIT
#	define PyVarObject_HEAD_INIT(type, size) PyObject_HEAD_INIT(type) size,
#endif

#ifndef Py_TYPE
#	define Py_TYPE(ob) (((PyObject*)(ob))->ob_type)
#endif

#if PY_MAJOR_VERSION >= 3
#	define PyInt_Check PyLong_Check
#	if PY_VERSION_HEX < 0x03030000
#		error "Python 3.0 - 3.2 are not supported."
#	else
#		define PyString_AsString(ob) \
			(PyUnicode_Check(ob)? PyUnicode_AsUTF8(ob): PyBytes_AsString(ob))
#	endif
#endif

static void _FormatTypeError(PyObject* arg, const char* err) {
	PyObject* repr = PyObject_Repr(arg);
	if (!repr) { return; }
	PyErr_Format(PyExc_TypeError, "%s, but %.100s has type %.100s", err,
		PyString_AsString(repr), Py_TYPE(arg)->tp_name);
	Py_DECREF(repr);
}

static PyObject* _CheckBytes(PyObject* bytes, const char* name) {
	if (!bytes || bytes == Py_None) {
		PyErr_Format(PyExc_TypeError, "the argument respect a string of %s, not None.", name);
		return NULL;
	} else if (PyUnicode_Check(bytes)) {
		return PyUnicode_AsEncodedObject(bytes, NULL, NULL);
	} else if (PyBytes_Check(bytes)) {
		Py_INCREF(bytes);
		return bytes;
	} else {
		_FormatTypeError(bytes, "the argument respect a string");
		return NULL;
	}
}

/*====================================================================*/

typedef struct {
	PyObject_HEAD
	Kw_Storage storage;
} StorageObject;

KwAPI_DATA(PyTypeObject) Storage_Type;

static void Storage_Dealloc(register StorageObject* self) {
	Kw_Free(&self->storage);
	PyObject_Del(self);
}

static PyObject* Storage_New(PyTypeObject* cls, PyObject* args, PyObject* kwargs) {
	StorageObject* self;
	PyObject *file = NULL;
	static char *kwlist[] = {"filename", 0};

	if (!PyArg_ParseTupleAndKeywords(args, kwargs, "S", kwlist, &file)) {
		return NULL;
	} else if (!(file = _CheckBytes(file, "filename"))) {
		return NULL;
	} else if (!(self = PyObject_New(StorageObject, &Storage_Type))) {
		Py_DECREF(file);
		return NULL;
	} else if (!(self->storage = Kw_New(PyBytes_AS_STRING(file)))) {
		PyErr_Format(PyExc_RuntimeError, "KiwiLite open storage (%s) error.", PyBytes_AS_STRING(file));
		Py_DECREF(file);
		return NULL;
	}
	Py_DECREF(file);
	return (PyObject*)self;
}

static PyObject* Storage_Get(StorageObject* self, PyObject* k) {
	struct _bytes key, value;
	if (!(k = _CheckBytes(k, "key"))) {
		return NULL;
	}
	key.data = PyBytes_AS_STRING(k);
	key.length = PyString_GET_SIZE(k);
	if (!Kw_Get(self->storage, &key, &value)) {
		PyErr_Format(PyExc_KeyError, "KiwiLite get value of key (%s).", PyBytes_AS_STRING(k));
		Py_DECREF(k);
		return NULL;
	}
	Py_DECREF(k);
	register PyObject* v = PyBytes_FromStringAndSize(value.data, value.length);
	free(value.data);
	return v;
}

static PyObject* Storage_Set(StorageObject* self, PyObject* data) {
	struct _bytes key;
	PyObject *k = NULL, *v = NULL, *set;
	Py_ssize_t pos = 0;
	IblMap map;

	if (!PyDict_Check(data)) {
		_FormatTypeError(data, "the argument respect dict as key-value data");
		return NULL;
	} else if (!(set = PySet_New(NULL))) {
		return NULL;
	}

	map = Kw_Data_New();
	if (!map) {
		Py_DECREF(set);
		PyErr_Format(PyExc_RuntimeError, "KiwiLite Set out of memory.");
		return NULL;
	}

	while (PyDict_Next(data, &pos, &k, &v)) {
		if (!(k = _CheckBytes(k, "key")))   { goto set_err; }
		if (!(v = _CheckBytes(v, "value"))) { goto set_err; }
		if (PySet_Add(set, k)) { goto set_err; }
		if (PySet_Add(set, v)) { goto set_err; }
		key.data = PyBytes_AS_STRING(k);
		key.length = PyString_GET_SIZE(k);
		register Kw_Data item = (Kw_Data)IblMap_Set(map, &key);
		item->value.data = PyBytes_AS_STRING(v);
		item->value.length = PyString_GET_SIZE(v);
		Py_DECREF(k);
		Py_DECREF(v);
		k = NULL;
		v = NULL;
	}

	if (!Kw_Set(self->storage, map)) {
		Py_DECREF(set);
		set = PyObject_Repr(data);
		if (!set) { goto set_err; }
		PyErr_Format(PyExc_KeyError, "KiwiLite set data (%s).", PyString_AsString(set));
		goto set_err;
	}

	Py_XDECREF(k);
	Py_XDECREF(v);
	IblMap_Free(map);
	Py_DECREF(set);
	Py_RETURN_NONE;

set_err:
	Py_XDECREF(k);
	Py_XDECREF(v);
	IblMap_Free(map);
	Py_DECREF(set);
	return NULL;
}

static PyObject* Storage_Log(StorageObject* self, PyObject* args) {
	int i, n;
	uint64* timestones;
	PyObject *arg1, *arg2;
	if (!PyArg_ParseTuple(args, "|OO:Log", &arg1, &arg2)) {
		return NULL;
	} else if (!PyInt_Check(arg1) && !PyLong_Check(arg1)) {
		_FormatTypeError(arg1, "the first argument respect integer as start timestamp");
		return NULL;
	} else if (!PyInt_Check(arg2) && !PyLong_Check(arg2)) {
		_FormatTypeError(arg2, "the secend argument respect integer as end timestamp");
		return NULL;
	} else if (!Kw_Log(self->storage, PyLong_AsLongLong(arg1), PyLong_AsLongLong(arg2), &timestones, &n)) {
		PyErr_Format(PyExc_RuntimeError, "KiwiLite log of start-end (%lld-%lld).",
			PyLong_AsLongLong(arg1), PyLong_AsLongLong(arg2));
		return NULL;
	}
	arg1 = PyTuple_New(n);
	if (!arg1) { goto log_return; }
	for (i = 0; i < n; i++) {
		arg2 = PyLong_FromUnsignedLongLong(timestones[i]);
		if (!arg2) { goto log_return; }
		if (PyTuple_SetItem(arg1, i, arg2) != 0) { goto log_return; }
	}

log_return:
	if (timestones) { free(timestones); }
	return arg1;
}

static PyObject* Storage_Lighten(StorageObject* self, PyObject* timestamp) {
	if (!PyInt_Check(timestamp) && !PyLong_Check(timestamp)) {
		_FormatTypeError(timestamp, "the argument respect integer as timestamp");
		return NULL;
	} else if (!Kw_Lighten(self->storage, PyLong_AsLongLong(timestamp))) {
		PyErr_Format(PyExc_RuntimeError, "KiwiLite lighten of timestamp (%lld).",
			PyLong_AsLongLong(timestamp));
		return NULL;
	}
	Py_RETURN_NONE;
}

static PyObject* Storage_Rollback(StorageObject* self, PyObject* timestamp) {
	if (!PyInt_Check(timestamp) && !PyLong_Check(timestamp)) {
		_FormatTypeError(timestamp, "the argument respect integer as timestamp");
		return NULL;
	} else if (!Kw_Rollback(self->storage, PyLong_AsLongLong(timestamp))) {
		PyErr_Format(PyExc_RuntimeError, "KiwiLite rollback of timestamp (%lld).",
			PyLong_AsLongLong(timestamp));
		return NULL;
	}
	Py_RETURN_NONE;
}

static PyObject* Storage_Enter(StorageObject* self) {
	Py_INCREF(self);
	return (PyObject*)self;
}

static PyObject* Storage_Exit(StorageObject* self, PyObject *args) {
	Kw_Free(&self->storage);
	Py_RETURN_NONE;
}

static PyMethodDef Storage_Methods[] = {
	{ "Get", (PyCFunction)Storage_Get, METH_O,
		"Get value bytes of key." },
	{ "Set", (PyCFunction)Storage_Set, METH_O,
		"Set map data of key and value and save storage file." },
	{ "Log", (PyCFunction)Storage_Log, METH_VARARGS,
		"Log: a list of timestones." },
	{ "Rollback", (PyCFunction)Storage_Rollback, METH_O,
		"Rollback to the last timestone before timestamp,"
		"and clear all data after timestamp." },
	{ "Lighten", (PyCFunction)Storage_Lighten, METH_O,
		"Lighten to the first timestone after timestamp,"
		"and clear all invalid data before timestamp." },
	{ "Lighten", (PyCFunction)Storage_Lighten, METH_O,
		"Lighten to the first timestone after timestamp,"
		"and clear all invalid data before timestamp." },
	{ "__enter__", (PyCFunction)Storage_Enter, METH_NOARGS,
		"__enter__() -> self." },
	{ "__exit__", (PyCFunction)Storage_Exit, METH_VARARGS,
		"__exit__(*excinfo) -> None.  Close the storage." },
	{ NULL, NULL}
};

PyTypeObject Storage_Type = {
	PyVarObject_HEAD_INIT(0, 0)
	"_kiwilite.Storage",                      /* tp_name           */
	sizeof(StorageObject),                    /* tp_basicsize      */
	0,                                        /* tp_itemsize       */
	(destructor)Storage_Dealloc,              /* tp_dealloc        */
	0,                                        /* tp_print          */
	0,                                        /* tp_getattr        */
	0,                                        /* tp_setattr        */
	0,                                        /* tp_compare        */
	0,                                        /* tp_repr           */
	0,                                        /* tp_as_number      */
	0,                                        /* tp_as_sequence    */
	0,                                        /* tp_as_mapping     */
	PyObject_HashNotImplemented,              /* tp_hash           */
	0,                                        /* tp_call           */
	0,                                        /* tp_str            */
	0,                                        /* tp_getattro       */
	0,                                        /* tp_setattro       */
	0,                                        /* tp_as_buffer      */
	Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE, /* tp_flags          */
	"Storage for kiwilite",                   /* tp_doc            */
	0,                                        /* tp_traverse       */
	0,                                        /* tp_clear          */
	0,                                        /* tp_richcompare    */
	0,                                        /* tp_weaklistoffset */
	0,                                        /* tp_iter           */
	0,                                        /* tp_iternext       */
	Storage_Methods,                          /* tp_methods        */
	0,                                        /* tp_members        */
	0,                                        /* tp_getset         */
	0,                                        /* tp_base           */
	0,                                        /* tp_dict           */
	0,                                        /* tp_descr_get      */
	0,                                        /* tp_descr_set      */
	0,                                        /* tp_dictoffset     */
	0,                                        /* tp_init           */
	0,                                        /* tp_alloc          */
	Storage_New,                              /* tp_new            */
};

static const char module_docstring[] =
"A single-file database storages key-value pairs.";

static PyMethodDef ModuleMethods[] = {
	{ NULL, NULL}
};

#if PY_MAJOR_VERSION >= 3
static struct PyModuleDef _module = {
	PyModuleDef_HEAD_INIT,
	"_storage",
	module_docstring,
	-1,
	ModuleMethods, /* m_methods */
	NULL,
	NULL,
	NULL,
	NULL
};
#define INITFUNC PyInit__storage
#define INITFUNC_ERRORVAL NULL
#else /* Python 2 */
#define INITFUNC init_storage
#define INITFUNC_ERRORVAL
#endif

#ifdef __cplusplus
extern "C" {
#endif

PyMODINIT_FUNC INITFUNC(void) {
	PyObject* m;
#if PY_MAJOR_VERSION >= 3
	m = PyModule_Create(&_module);
#else
	m = Py_InitModule3("_storage", ModuleMethods, module_docstring);
#endif
	if (!m) {
		return INITFUNC_ERRORVAL;
	}

	Storage_Type.ob_type = &PyType_Type;
	if (PyType_Ready(&Storage_Type) < 0) {
		Py_DECREF(m);
		return INITFUNC_ERRORVAL;
	}
	PyModule_AddObject(m, "Storage", (PyObject*)&Storage_Type);

#if PY_MAJOR_VERSION >= 3
	return m;
#endif
}

#ifdef __cplusplus
}
#endif
