
#include <Python.h>
#include <stddef.h>

/* this block of #ifs should be kept exactly identical between
   c/_cffi_backend.c, cffi/vengine_cpy.py, cffi/vengine_gen.py */
#if defined(_MSC_VER)
# include <malloc.h>   /* for alloca() */
# if _MSC_VER < 1600   /* MSVC < 2010 */
   typedef __int8 int8_t;
   typedef __int16 int16_t;
   typedef __int32 int32_t;
   typedef __int64 int64_t;
   typedef unsigned __int8 uint8_t;
   typedef unsigned __int16 uint16_t;
   typedef unsigned __int32 uint32_t;
   typedef unsigned __int64 uint64_t;
   typedef __int8 int_least8_t;
   typedef __int16 int_least16_t;
   typedef __int32 int_least32_t;
   typedef __int64 int_least64_t;
   typedef unsigned __int8 uint_least8_t;
   typedef unsigned __int16 uint_least16_t;
   typedef unsigned __int32 uint_least32_t;
   typedef unsigned __int64 uint_least64_t;
   typedef __int8 int_fast8_t;
   typedef __int16 int_fast16_t;
   typedef __int32 int_fast32_t;
   typedef __int64 int_fast64_t;
   typedef unsigned __int8 uint_fast8_t;
   typedef unsigned __int16 uint_fast16_t;
   typedef unsigned __int32 uint_fast32_t;
   typedef unsigned __int64 uint_fast64_t;
   typedef __int64 intmax_t;
   typedef unsigned __int64 uintmax_t;
# else
#  include <stdint.h>
# endif
# if _MSC_VER < 1800   /* MSVC < 2013 */
   typedef unsigned char _Bool;
# endif
#else
# include <stdint.h>
# if (defined (__SVR4) && defined (__sun)) || defined(_AIX)
#  include <alloca.h>
# endif
#endif

#if PY_MAJOR_VERSION < 3
# undef PyCapsule_CheckExact
# undef PyCapsule_GetPointer
# define PyCapsule_CheckExact(capsule) (PyCObject_Check(capsule))
# define PyCapsule_GetPointer(capsule, name) \
    (PyCObject_AsVoidPtr(capsule))
#endif

#if PY_MAJOR_VERSION >= 3
# define PyInt_FromLong PyLong_FromLong
#endif

#define _cffi_from_c_double PyFloat_FromDouble
#define _cffi_from_c_float PyFloat_FromDouble
#define _cffi_from_c_long PyInt_FromLong
#define _cffi_from_c_ulong PyLong_FromUnsignedLong
#define _cffi_from_c_longlong PyLong_FromLongLong
#define _cffi_from_c_ulonglong PyLong_FromUnsignedLongLong

#define _cffi_to_c_double PyFloat_AsDouble
#define _cffi_to_c_float PyFloat_AsDouble

#define _cffi_from_c_int_const(x)                                        \
    (((x) > 0) ?                                                         \
        ((unsigned long long)(x) <= (unsigned long long)LONG_MAX) ?      \
            PyInt_FromLong((long)(x)) :                                  \
            PyLong_FromUnsignedLongLong((unsigned long long)(x)) :       \
        ((long long)(x) >= (long long)LONG_MIN) ?                        \
            PyInt_FromLong((long)(x)) :                                  \
            PyLong_FromLongLong((long long)(x)))

#define _cffi_from_c_int(x, type)                                        \
    (((type)-1) > 0 ? /* unsigned */                                     \
        (sizeof(type) < sizeof(long) ?                                   \
            PyInt_FromLong((long)x) :                                    \
         sizeof(type) == sizeof(long) ?                                  \
            PyLong_FromUnsignedLong((unsigned long)x) :                  \
            PyLong_FromUnsignedLongLong((unsigned long long)x)) :        \
        (sizeof(type) <= sizeof(long) ?                                  \
            PyInt_FromLong((long)x) :                                    \
            PyLong_FromLongLong((long long)x)))

#define _cffi_to_c_int(o, type)                                          \
    ((type)(                                                             \
     sizeof(type) == 1 ? (((type)-1) > 0 ? (type)_cffi_to_c_u8(o)        \
                                         : (type)_cffi_to_c_i8(o)) :     \
     sizeof(type) == 2 ? (((type)-1) > 0 ? (type)_cffi_to_c_u16(o)       \
                                         : (type)_cffi_to_c_i16(o)) :    \
     sizeof(type) == 4 ? (((type)-1) > 0 ? (type)_cffi_to_c_u32(o)       \
                                         : (type)_cffi_to_c_i32(o)) :    \
     sizeof(type) == 8 ? (((type)-1) > 0 ? (type)_cffi_to_c_u64(o)       \
                                         : (type)_cffi_to_c_i64(o)) :    \
     (Py_FatalError("unsupported size for type " #type), (type)0)))

#define _cffi_to_c_i8                                                    \
                 ((int(*)(PyObject *))_cffi_exports[1])
#define _cffi_to_c_u8                                                    \
                 ((int(*)(PyObject *))_cffi_exports[2])
#define _cffi_to_c_i16                                                   \
                 ((int(*)(PyObject *))_cffi_exports[3])
#define _cffi_to_c_u16                                                   \
                 ((int(*)(PyObject *))_cffi_exports[4])
#define _cffi_to_c_i32                                                   \
                 ((int(*)(PyObject *))_cffi_exports[5])
#define _cffi_to_c_u32                                                   \
                 ((unsigned int(*)(PyObject *))_cffi_exports[6])
#define _cffi_to_c_i64                                                   \
                 ((long long(*)(PyObject *))_cffi_exports[7])
#define _cffi_to_c_u64                                                   \
                 ((unsigned long long(*)(PyObject *))_cffi_exports[8])
#define _cffi_to_c_char                                                  \
                 ((int(*)(PyObject *))_cffi_exports[9])
#define _cffi_from_c_pointer                                             \
    ((PyObject *(*)(char *, CTypeDescrObject *))_cffi_exports[10])
#define _cffi_to_c_pointer                                               \
    ((char *(*)(PyObject *, CTypeDescrObject *))_cffi_exports[11])
#define _cffi_get_struct_layout                                          \
    ((PyObject *(*)(Py_ssize_t[]))_cffi_exports[12])
#define _cffi_restore_errno                                              \
    ((void(*)(void))_cffi_exports[13])
#define _cffi_save_errno                                                 \
    ((void(*)(void))_cffi_exports[14])
#define _cffi_from_c_char                                                \
    ((PyObject *(*)(char))_cffi_exports[15])
#define _cffi_from_c_deref                                               \
    ((PyObject *(*)(char *, CTypeDescrObject *))_cffi_exports[16])
#define _cffi_to_c                                                       \
    ((int(*)(char *, CTypeDescrObject *, PyObject *))_cffi_exports[17])
#define _cffi_from_c_struct                                              \
    ((PyObject *(*)(char *, CTypeDescrObject *))_cffi_exports[18])
#define _cffi_to_c_wchar_t                                               \
    ((wchar_t(*)(PyObject *))_cffi_exports[19])
#define _cffi_from_c_wchar_t                                             \
    ((PyObject *(*)(wchar_t))_cffi_exports[20])
#define _cffi_to_c_long_double                                           \
    ((long double(*)(PyObject *))_cffi_exports[21])
#define _cffi_to_c__Bool                                                 \
    ((_Bool(*)(PyObject *))_cffi_exports[22])
#define _cffi_prepare_pointer_call_argument                              \
    ((Py_ssize_t(*)(CTypeDescrObject *, PyObject *, char **))_cffi_exports[23])
#define _cffi_convert_array_from_object                                  \
    ((int(*)(char *, CTypeDescrObject *, PyObject *))_cffi_exports[24])
#define _CFFI_NUM_EXPORTS 25

typedef struct _ctypedescr CTypeDescrObject;

static void *_cffi_exports[_CFFI_NUM_EXPORTS];
static PyObject *_cffi_types, *_cffi_VerificationError;

static int _cffi_setup_custom(PyObject *lib);   /* forward */

static PyObject *_cffi_setup(PyObject *self, PyObject *args)
{
    PyObject *library;
    int was_alive = (_cffi_types != NULL);
    (void)self; /* unused */
    if (!PyArg_ParseTuple(args, "OOO", &_cffi_types, &_cffi_VerificationError,
                                       &library))
        return NULL;
    Py_INCREF(_cffi_types);
    Py_INCREF(_cffi_VerificationError);
    if (_cffi_setup_custom(library) < 0)
        return NULL;
    return PyBool_FromLong(was_alive);
}

static int _cffi_init(void)
{
    PyObject *module, *c_api_object = NULL;

    module = PyImport_ImportModule("_cffi_backend");
    if (module == NULL)
        goto failure;

    c_api_object = PyObject_GetAttrString(module, "_C_API");
    if (c_api_object == NULL)
        goto failure;
    if (!PyCapsule_CheckExact(c_api_object)) {
        PyErr_SetNone(PyExc_ImportError);
        goto failure;
    }
    memcpy(_cffi_exports, PyCapsule_GetPointer(c_api_object, "cffi"),
           _CFFI_NUM_EXPORTS * sizeof(void *));

    Py_DECREF(module);
    Py_DECREF(c_api_object);
    return 0;

  failure:
    Py_XDECREF(module);
    Py_XDECREF(c_api_object);
    return -1;
}

#define _cffi_type(num) ((CTypeDescrObject *)PyList_GET_ITEM(_cffi_types, num))

/**********/



#include <X11/Xlib.h>
#include <X11/XKBlib.h>
#include <X11/extensions/scrnsaver.h>
#include <X11/extensions/dpms.h>
#include <X11/extensions/XKB.h>
#include <X11/extensions/XKBstr.h>


static void _cffi_check__XAnyEvent(XAnyEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  (void)((p->serial) << 1);
  (void)((p->send_event) << 1);
  { Display * *tmp = &p->display; (void)tmp; }
  (void)((p->window) << 1);
}
static PyObject *
_cffi_layout__XAnyEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XAnyEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XAnyEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XAnyEvent, type),
    sizeof(((XAnyEvent *)0)->type),
    offsetof(XAnyEvent, serial),
    sizeof(((XAnyEvent *)0)->serial),
    offsetof(XAnyEvent, send_event),
    sizeof(((XAnyEvent *)0)->send_event),
    offsetof(XAnyEvent, display),
    sizeof(((XAnyEvent *)0)->display),
    offsetof(XAnyEvent, window),
    sizeof(((XAnyEvent *)0)->window),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XAnyEvent(0);
}

static void _cffi_check__XClientMessageEvent(XClientMessageEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  (void)((p->serial) << 1);
  (void)((p->send_event) << 1);
  { Display * *tmp = &p->display; (void)tmp; }
  (void)((p->window) << 1);
  (void)((p->message_type) << 1);
  (void)((p->format) << 1);
  /* cannot generate 'union $1' in field 'data': unknown type name */
}
static PyObject *
_cffi_layout__XClientMessageEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XClientMessageEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XClientMessageEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XClientMessageEvent, type),
    sizeof(((XClientMessageEvent *)0)->type),
    offsetof(XClientMessageEvent, serial),
    sizeof(((XClientMessageEvent *)0)->serial),
    offsetof(XClientMessageEvent, send_event),
    sizeof(((XClientMessageEvent *)0)->send_event),
    offsetof(XClientMessageEvent, display),
    sizeof(((XClientMessageEvent *)0)->display),
    offsetof(XClientMessageEvent, window),
    sizeof(((XClientMessageEvent *)0)->window),
    offsetof(XClientMessageEvent, message_type),
    sizeof(((XClientMessageEvent *)0)->message_type),
    offsetof(XClientMessageEvent, format),
    sizeof(((XClientMessageEvent *)0)->format),
    offsetof(XClientMessageEvent, data),
    sizeof(((XClientMessageEvent *)0)->data),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XClientMessageEvent(0);
}

static void _cffi_check__XCreateWindowEvent(XCreateWindowEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  (void)((p->serial) << 1);
  (void)((p->send_event) << 1);
  { Display * *tmp = &p->display; (void)tmp; }
  (void)((p->parent) << 1);
  (void)((p->window) << 1);
  (void)((p->x) << 1);
  (void)((p->y) << 1);
  (void)((p->width) << 1);
  (void)((p->height) << 1);
  (void)((p->border_width) << 1);
  (void)((p->override_redirect) << 1);
}
static PyObject *
_cffi_layout__XCreateWindowEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XCreateWindowEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XCreateWindowEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XCreateWindowEvent, type),
    sizeof(((XCreateWindowEvent *)0)->type),
    offsetof(XCreateWindowEvent, serial),
    sizeof(((XCreateWindowEvent *)0)->serial),
    offsetof(XCreateWindowEvent, send_event),
    sizeof(((XCreateWindowEvent *)0)->send_event),
    offsetof(XCreateWindowEvent, display),
    sizeof(((XCreateWindowEvent *)0)->display),
    offsetof(XCreateWindowEvent, parent),
    sizeof(((XCreateWindowEvent *)0)->parent),
    offsetof(XCreateWindowEvent, window),
    sizeof(((XCreateWindowEvent *)0)->window),
    offsetof(XCreateWindowEvent, x),
    sizeof(((XCreateWindowEvent *)0)->x),
    offsetof(XCreateWindowEvent, y),
    sizeof(((XCreateWindowEvent *)0)->y),
    offsetof(XCreateWindowEvent, width),
    sizeof(((XCreateWindowEvent *)0)->width),
    offsetof(XCreateWindowEvent, height),
    sizeof(((XCreateWindowEvent *)0)->height),
    offsetof(XCreateWindowEvent, border_width),
    sizeof(((XCreateWindowEvent *)0)->border_width),
    offsetof(XCreateWindowEvent, override_redirect),
    sizeof(((XCreateWindowEvent *)0)->override_redirect),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XCreateWindowEvent(0);
}

static void _cffi_check__XDestroyWindowEvent(XDestroyWindowEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  (void)((p->serial) << 1);
  (void)((p->send_event) << 1);
  { Display * *tmp = &p->display; (void)tmp; }
  (void)((p->event) << 1);
  (void)((p->window) << 1);
}
static PyObject *
_cffi_layout__XDestroyWindowEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XDestroyWindowEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XDestroyWindowEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XDestroyWindowEvent, type),
    sizeof(((XDestroyWindowEvent *)0)->type),
    offsetof(XDestroyWindowEvent, serial),
    sizeof(((XDestroyWindowEvent *)0)->serial),
    offsetof(XDestroyWindowEvent, send_event),
    sizeof(((XDestroyWindowEvent *)0)->send_event),
    offsetof(XDestroyWindowEvent, display),
    sizeof(((XDestroyWindowEvent *)0)->display),
    offsetof(XDestroyWindowEvent, event),
    sizeof(((XDestroyWindowEvent *)0)->event),
    offsetof(XDestroyWindowEvent, window),
    sizeof(((XDestroyWindowEvent *)0)->window),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XDestroyWindowEvent(0);
}

static void _cffi_check__XErrorEvent(XErrorEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  { Display * *tmp = &p->display; (void)tmp; }
  (void)((p->resourceid) << 1);
  (void)((p->serial) << 1);
  (void)((p->error_code) << 1);
  (void)((p->request_code) << 1);
  (void)((p->minor_code) << 1);
}
static PyObject *
_cffi_layout__XErrorEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XErrorEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XErrorEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XErrorEvent, type),
    sizeof(((XErrorEvent *)0)->type),
    offsetof(XErrorEvent, display),
    sizeof(((XErrorEvent *)0)->display),
    offsetof(XErrorEvent, resourceid),
    sizeof(((XErrorEvent *)0)->resourceid),
    offsetof(XErrorEvent, serial),
    sizeof(((XErrorEvent *)0)->serial),
    offsetof(XErrorEvent, error_code),
    sizeof(((XErrorEvent *)0)->error_code),
    offsetof(XErrorEvent, request_code),
    sizeof(((XErrorEvent *)0)->request_code),
    offsetof(XErrorEvent, minor_code),
    sizeof(((XErrorEvent *)0)->minor_code),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XErrorEvent(0);
}

static void _cffi_check__XEvent(XEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  { XAnyEvent *tmp = &p->xany; (void)tmp; }
  { XKeyEvent *tmp = &p->xkey; (void)tmp; }
  { XCreateWindowEvent *tmp = &p->xcreatewindow; (void)tmp; }
  { XDestroyWindowEvent *tmp = &p->xdestroywindow; (void)tmp; }
  { XFocusChangeEvent *tmp = &p->xfocus; (void)tmp; }
  { XPropertyEvent *tmp = &p->xproperty; (void)tmp; }
}
static PyObject *
_cffi_layout__XEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XEvent, type),
    sizeof(((XEvent *)0)->type),
    offsetof(XEvent, xany),
    sizeof(((XEvent *)0)->xany),
    offsetof(XEvent, xkey),
    sizeof(((XEvent *)0)->xkey),
    offsetof(XEvent, xcreatewindow),
    sizeof(((XEvent *)0)->xcreatewindow),
    offsetof(XEvent, xdestroywindow),
    sizeof(((XEvent *)0)->xdestroywindow),
    offsetof(XEvent, xfocus),
    sizeof(((XEvent *)0)->xfocus),
    offsetof(XEvent, xproperty),
    sizeof(((XEvent *)0)->xproperty),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XEvent(0);
}

static void _cffi_check__XFocusChangeEvent(XFocusChangeEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  (void)((p->serial) << 1);
  (void)((p->send_event) << 1);
  { Display * *tmp = &p->display; (void)tmp; }
  (void)((p->window) << 1);
  (void)((p->mode) << 1);
  (void)((p->detail) << 1);
}
static PyObject *
_cffi_layout__XFocusChangeEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XFocusChangeEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XFocusChangeEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XFocusChangeEvent, type),
    sizeof(((XFocusChangeEvent *)0)->type),
    offsetof(XFocusChangeEvent, serial),
    sizeof(((XFocusChangeEvent *)0)->serial),
    offsetof(XFocusChangeEvent, send_event),
    sizeof(((XFocusChangeEvent *)0)->send_event),
    offsetof(XFocusChangeEvent, display),
    sizeof(((XFocusChangeEvent *)0)->display),
    offsetof(XFocusChangeEvent, window),
    sizeof(((XFocusChangeEvent *)0)->window),
    offsetof(XFocusChangeEvent, mode),
    sizeof(((XFocusChangeEvent *)0)->mode),
    offsetof(XFocusChangeEvent, detail),
    sizeof(((XFocusChangeEvent *)0)->detail),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XFocusChangeEvent(0);
}

static void _cffi_check__XKeyEvent(XKeyEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  (void)((p->serial) << 1);
  (void)((p->send_event) << 1);
  { Display * *tmp = &p->display; (void)tmp; }
  (void)((p->window) << 1);
  (void)((p->root) << 1);
  (void)((p->subwindow) << 1);
  (void)((p->time) << 1);
  (void)((p->x) << 1);
  (void)((p->y) << 1);
  (void)((p->x_root) << 1);
  (void)((p->y_root) << 1);
  (void)((p->state) << 1);
  (void)((p->keycode) << 1);
  (void)((p->same_screen) << 1);
}
static PyObject *
_cffi_layout__XKeyEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XKeyEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XKeyEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XKeyEvent, type),
    sizeof(((XKeyEvent *)0)->type),
    offsetof(XKeyEvent, serial),
    sizeof(((XKeyEvent *)0)->serial),
    offsetof(XKeyEvent, send_event),
    sizeof(((XKeyEvent *)0)->send_event),
    offsetof(XKeyEvent, display),
    sizeof(((XKeyEvent *)0)->display),
    offsetof(XKeyEvent, window),
    sizeof(((XKeyEvent *)0)->window),
    offsetof(XKeyEvent, root),
    sizeof(((XKeyEvent *)0)->root),
    offsetof(XKeyEvent, subwindow),
    sizeof(((XKeyEvent *)0)->subwindow),
    offsetof(XKeyEvent, time),
    sizeof(((XKeyEvent *)0)->time),
    offsetof(XKeyEvent, x),
    sizeof(((XKeyEvent *)0)->x),
    offsetof(XKeyEvent, y),
    sizeof(((XKeyEvent *)0)->y),
    offsetof(XKeyEvent, x_root),
    sizeof(((XKeyEvent *)0)->x_root),
    offsetof(XKeyEvent, y_root),
    sizeof(((XKeyEvent *)0)->y_root),
    offsetof(XKeyEvent, state),
    sizeof(((XKeyEvent *)0)->state),
    offsetof(XKeyEvent, keycode),
    sizeof(((XKeyEvent *)0)->keycode),
    offsetof(XKeyEvent, same_screen),
    sizeof(((XKeyEvent *)0)->same_screen),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XKeyEvent(0);
}

static void _cffi_check__XPropertyEvent(XPropertyEvent *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->type) << 1);
  (void)((p->serial) << 1);
  (void)((p->send_event) << 1);
  { Display * *tmp = &p->display; (void)tmp; }
  (void)((p->window) << 1);
  (void)((p->atom) << 1);
  (void)((p->time) << 1);
  (void)((p->state) << 1);
}
static PyObject *
_cffi_layout__XPropertyEvent(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XPropertyEvent y; };
  static Py_ssize_t nums[] = {
    sizeof(XPropertyEvent),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XPropertyEvent, type),
    sizeof(((XPropertyEvent *)0)->type),
    offsetof(XPropertyEvent, serial),
    sizeof(((XPropertyEvent *)0)->serial),
    offsetof(XPropertyEvent, send_event),
    sizeof(((XPropertyEvent *)0)->send_event),
    offsetof(XPropertyEvent, display),
    sizeof(((XPropertyEvent *)0)->display),
    offsetof(XPropertyEvent, window),
    sizeof(((XPropertyEvent *)0)->window),
    offsetof(XPropertyEvent, atom),
    sizeof(((XPropertyEvent *)0)->atom),
    offsetof(XPropertyEvent, time),
    sizeof(((XPropertyEvent *)0)->time),
    offsetof(XPropertyEvent, state),
    sizeof(((XPropertyEvent *)0)->state),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XPropertyEvent(0);
}

static void _cffi_check__XScreenSaverInfo(XScreenSaverInfo *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->window) << 1);
  (void)((p->state) << 1);
  (void)((p->kind) << 1);
  (void)((p->til_or_since) << 1);
  (void)((p->idle) << 1);
  (void)((p->eventMask) << 1);
}
static PyObject *
_cffi_layout__XScreenSaverInfo(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XScreenSaverInfo y; };
  static Py_ssize_t nums[] = {
    sizeof(XScreenSaverInfo),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XScreenSaverInfo, window),
    sizeof(((XScreenSaverInfo *)0)->window),
    offsetof(XScreenSaverInfo, state),
    sizeof(((XScreenSaverInfo *)0)->state),
    offsetof(XScreenSaverInfo, kind),
    sizeof(((XScreenSaverInfo *)0)->kind),
    offsetof(XScreenSaverInfo, til_or_since),
    sizeof(((XScreenSaverInfo *)0)->til_or_since),
    offsetof(XScreenSaverInfo, idle),
    sizeof(((XScreenSaverInfo *)0)->idle),
    offsetof(XScreenSaverInfo, eventMask),
    sizeof(((XScreenSaverInfo *)0)->eventMask),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XScreenSaverInfo(0);
}

static void _cffi_check__XWindowChanges(XWindowChanges *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->x) << 1);
  (void)((p->y) << 1);
  (void)((p->width) << 1);
  (void)((p->height) << 1);
  (void)((p->border_width) << 1);
  (void)((p->sibling) << 1);
  (void)((p->stack_mode) << 1);
}
static PyObject *
_cffi_layout__XWindowChanges(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XWindowChanges y; };
  static Py_ssize_t nums[] = {
    sizeof(XWindowChanges),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XWindowChanges, x),
    sizeof(((XWindowChanges *)0)->x),
    offsetof(XWindowChanges, y),
    sizeof(((XWindowChanges *)0)->y),
    offsetof(XWindowChanges, width),
    sizeof(((XWindowChanges *)0)->width),
    offsetof(XWindowChanges, height),
    sizeof(((XWindowChanges *)0)->height),
    offsetof(XWindowChanges, border_width),
    sizeof(((XWindowChanges *)0)->border_width),
    offsetof(XWindowChanges, sibling),
    sizeof(((XWindowChanges *)0)->sibling),
    offsetof(XWindowChanges, stack_mode),
    sizeof(((XWindowChanges *)0)->stack_mode),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XWindowChanges(0);
}

static void _cffi_check__XkbStateRec(XkbStateRec *p)
{
  /* only to generate compile-time warnings or errors */
  (void)p;
  (void)((p->group) << 1);
  (void)((p->locked_group) << 1);
  (void)((p->base_group) << 1);
  (void)((p->latched_group) << 1);
  (void)((p->mods) << 1);
  (void)((p->base_mods) << 1);
  (void)((p->latched_mods) << 1);
  (void)((p->locked_mods) << 1);
  (void)((p->compat_state) << 1);
  (void)((p->grab_mods) << 1);
  (void)((p->compat_grab_mods) << 1);
  (void)((p->lookup_mods) << 1);
  (void)((p->compat_lookup_mods) << 1);
  (void)((p->ptr_buttons) << 1);
}
static PyObject *
_cffi_layout__XkbStateRec(PyObject *self, PyObject *noarg)
{
  struct _cffi_aligncheck { char x; XkbStateRec y; };
  static Py_ssize_t nums[] = {
    sizeof(XkbStateRec),
    offsetof(struct _cffi_aligncheck, y),
    offsetof(XkbStateRec, group),
    sizeof(((XkbStateRec *)0)->group),
    offsetof(XkbStateRec, locked_group),
    sizeof(((XkbStateRec *)0)->locked_group),
    offsetof(XkbStateRec, base_group),
    sizeof(((XkbStateRec *)0)->base_group),
    offsetof(XkbStateRec, latched_group),
    sizeof(((XkbStateRec *)0)->latched_group),
    offsetof(XkbStateRec, mods),
    sizeof(((XkbStateRec *)0)->mods),
    offsetof(XkbStateRec, base_mods),
    sizeof(((XkbStateRec *)0)->base_mods),
    offsetof(XkbStateRec, latched_mods),
    sizeof(((XkbStateRec *)0)->latched_mods),
    offsetof(XkbStateRec, locked_mods),
    sizeof(((XkbStateRec *)0)->locked_mods),
    offsetof(XkbStateRec, compat_state),
    sizeof(((XkbStateRec *)0)->compat_state),
    offsetof(XkbStateRec, grab_mods),
    sizeof(((XkbStateRec *)0)->grab_mods),
    offsetof(XkbStateRec, compat_grab_mods),
    sizeof(((XkbStateRec *)0)->compat_grab_mods),
    offsetof(XkbStateRec, lookup_mods),
    sizeof(((XkbStateRec *)0)->lookup_mods),
    offsetof(XkbStateRec, compat_lookup_mods),
    sizeof(((XkbStateRec *)0)->compat_lookup_mods),
    offsetof(XkbStateRec, ptr_buttons),
    sizeof(((XkbStateRec *)0)->ptr_buttons),
    -1
  };
  (void)self; /* unused */
  (void)noarg; /* unused */
  return _cffi_get_struct_layout(nums);
  /* the next line is not executed, but compiled */
  _cffi_check__XkbStateRec(0);
}

static int _cffi_const_Above(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(Above);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "Above", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return ((void)lib,0);
}

static int _cffi_const_AnyKey(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(AnyKey);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "AnyKey", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_Above(lib);
}

static int _cffi_const_AnyModifier(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(AnyModifier);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "AnyModifier", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_AnyKey(lib);
}

static int _cffi_const_Below(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(Below);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "Below", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_AnyModifier(lib);
}

static int _cffi_const_CWBorderWidth(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CWBorderWidth);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CWBorderWidth", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_Below(lib);
}

static int _cffi_const_CWHeight(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CWHeight);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CWHeight", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CWBorderWidth(lib);
}

static int _cffi_const_CWSibling(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CWSibling);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CWSibling", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CWHeight(lib);
}

static int _cffi_const_CWStackMode(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CWStackMode);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CWStackMode", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CWSibling(lib);
}

static int _cffi_const_CWWidth(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CWWidth);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CWWidth", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CWStackMode(lib);
}

static int _cffi_const_CWX(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CWX);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CWX", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CWWidth(lib);
}

static int _cffi_const_CWY(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CWY);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CWY", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CWX(lib);
}

static int _cffi_const_ClientMessage(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(ClientMessage);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "ClientMessage", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CWY(lib);
}

static int _cffi_const_ControlMask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(ControlMask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "ControlMask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_ClientMessage(lib);
}

static int _cffi_const_CreateNotify(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CreateNotify);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CreateNotify", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_ControlMask(lib);
}

static int _cffi_const_CurrentTime(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(CurrentTime);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "CurrentTime", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CreateNotify(lib);
}

static int _cffi_const_DestroyNotify(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(DestroyNotify);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "DestroyNotify", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_CurrentTime(lib);
}

static int _cffi_const_FocusChangeMask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(FocusChangeMask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "FocusChangeMask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_DestroyNotify(lib);
}

static int _cffi_const_FocusIn(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(FocusIn);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "FocusIn", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_FocusChangeMask(lib);
}

static int _cffi_const_FocusOut(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(FocusOut);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "FocusOut", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_FocusIn(lib);
}

static int _cffi_const_GrabModeAsync(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(GrabModeAsync);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "GrabModeAsync", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_FocusOut(lib);
}

static int _cffi_const_GrabModeSync(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(GrabModeSync);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "GrabModeSync", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_GrabModeAsync(lib);
}

static int _cffi_const_KeyPress(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(KeyPress);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "KeyPress", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_GrabModeSync(lib);
}

static int _cffi_const_KeyRelease(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(KeyRelease);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "KeyRelease", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_KeyPress(lib);
}

static int _cffi_const_LockMask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(LockMask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "LockMask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_KeyRelease(lib);
}

static int _cffi_const_Mod1Mask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(Mod1Mask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "Mod1Mask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_LockMask(lib);
}

static int _cffi_const_Mod2Mask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(Mod2Mask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "Mod2Mask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_Mod1Mask(lib);
}

static int _cffi_const_Mod3Mask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(Mod3Mask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "Mod3Mask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_Mod2Mask(lib);
}

static int _cffi_const_Mod4Mask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(Mod4Mask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "Mod4Mask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_Mod3Mask(lib);
}

static int _cffi_const_Mod5Mask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(Mod5Mask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "Mod5Mask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_Mod4Mask(lib);
}

static int _cffi_const_NoSymbol(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(NoSymbol);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "NoSymbol", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_Mod5Mask(lib);
}

static int _cffi_const_PropModeAppend(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(PropModeAppend);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "PropModeAppend", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_NoSymbol(lib);
}

static int _cffi_const_PropModePrepend(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(PropModePrepend);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "PropModePrepend", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_PropModeAppend(lib);
}

static int _cffi_const_PropModeReplace(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(PropModeReplace);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "PropModeReplace", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_PropModePrepend(lib);
}

static int _cffi_const_PropertyChangeMask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(PropertyChangeMask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "PropertyChangeMask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_PropModeReplace(lib);
}

static int _cffi_const_PropertyNotify(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(PropertyNotify);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "PropertyNotify", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_PropertyChangeMask(lib);
}

static int _cffi_const_ShiftMask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(ShiftMask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "ShiftMask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_PropertyNotify(lib);
}

static int _cffi_const_StructureNotifyMask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(StructureNotifyMask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "StructureNotifyMask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_ShiftMask(lib);
}

static int _cffi_const_SubstructureNotifyMask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(SubstructureNotifyMask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "SubstructureNotifyMask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_StructureNotifyMask(lib);
}

static int _cffi_const_SubstructureRedirectMask(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(SubstructureRedirectMask);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "SubstructureRedirectMask", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_SubstructureNotifyMask(lib);
}

static int _cffi_const_XkbUseCoreKbd(PyObject *lib)
{
  PyObject *o;
  int res;
  o = _cffi_from_c_int_const(XkbUseCoreKbd);
  if (o == NULL)
    return -1;
  res = PyObject_SetAttrString(lib, "XkbUseCoreKbd", o);
  Py_DECREF(o);
  if (res < 0)
    return -1;
  return _cffi_const_SubstructureRedirectMask(lib);
}

static PyObject *
_cffi_f_ConnectionNumber(PyObject *self, PyObject *arg0)
{
  Display * x0;
  Py_ssize_t datasize;
  int result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = ConnectionNumber(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_DPMSDisable(PyObject *self, PyObject *arg0)
{
  Display * x0;
  Py_ssize_t datasize;
  int result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = DPMSDisable(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_DPMSEnable(PyObject *self, PyObject *arg0)
{
  Display * x0;
  Py_ssize_t datasize;
  int result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = DPMSEnable(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_DPMSInfo(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned short * x1;
  unsigned char * x2;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;

  if (!PyArg_ParseTuple(args, "OOO:DPMSInfo", &arg0, &arg1, &arg2))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(1), arg1, (char **)&x1);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x1 = alloca((size_t)datasize);
    memset((void *)x1, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x1, _cffi_type(1), arg1) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(2), arg2, (char **)&x2);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x2 = alloca((size_t)datasize);
    memset((void *)x2, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x2, _cffi_type(2), arg2) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = DPMSInfo(x0, x1, x2); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_DefaultRootWindow(PyObject *self, PyObject *arg0)
{
  Display * x0;
  Py_ssize_t datasize;
  unsigned long result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = DefaultRootWindow(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, unsigned long);
}

static PyObject *
_cffi_f_XChangeProperty(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  unsigned long x2;
  unsigned long x3;
  int x4;
  int x5;
  unsigned char * x6;
  int x7;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;
  PyObject *arg4;
  PyObject *arg5;
  PyObject *arg6;
  PyObject *arg7;

  if (!PyArg_ParseTuple(args, "OOOOOOOO:XChangeProperty", &arg0, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, unsigned long);
  if (x2 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x3 = _cffi_to_c_int(arg3, unsigned long);
  if (x3 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x4 = _cffi_to_c_int(arg4, int);
  if (x4 == (int)-1 && PyErr_Occurred())
    return NULL;

  x5 = _cffi_to_c_int(arg5, int);
  if (x5 == (int)-1 && PyErr_Occurred())
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(2), arg6, (char **)&x6);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x6 = alloca((size_t)datasize);
    memset((void *)x6, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x6, _cffi_type(2), arg6) < 0)
      return NULL;
  }

  x7 = _cffi_to_c_int(arg7, int);
  if (x7 == (int)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XChangeProperty(x0, x1, x2, x3, x4, x5, x6, x7); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XCloseDisplay(PyObject *self, PyObject *arg0)
{
  Display * x0;
  Py_ssize_t datasize;
  int result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XCloseDisplay(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XConfigureWindow(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  unsigned int x2;
  XWindowChanges * x3;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;

  if (!PyArg_ParseTuple(args, "OOOO:XConfigureWindow", &arg0, &arg1, &arg2, &arg3))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, unsigned int);
  if (x2 == (unsigned int)-1 && PyErr_Occurred())
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(3), arg3, (char **)&x3);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x3 = alloca((size_t)datasize);
    memset((void *)x3, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x3, _cffi_type(3), arg3) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XConfigureWindow(x0, x1, x2, x3); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XDeleteProperty(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  unsigned long x2;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;

  if (!PyArg_ParseTuple(args, "OOO:XDeleteProperty", &arg0, &arg1, &arg2))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, unsigned long);
  if (x2 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XDeleteProperty(x0, x1, x2); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XFlush(PyObject *self, PyObject *arg0)
{
  Display * x0;
  Py_ssize_t datasize;
  int result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XFlush(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XFree(PyObject *self, PyObject *arg0)
{
  void * x0;
  Py_ssize_t datasize;
  int result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(4), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(4), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XFree(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XGetErrorText(PyObject *self, PyObject *args)
{
  Display * x0;
  int x1;
  char * x2;
  int x3;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;

  if (!PyArg_ParseTuple(args, "OOOO:XGetErrorText", &arg0, &arg1, &arg2, &arg3))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, int);
  if (x1 == (int)-1 && PyErr_Occurred())
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(5), arg2, (char **)&x2);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x2 = alloca((size_t)datasize);
    memset((void *)x2, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x2, _cffi_type(5), arg2) < 0)
      return NULL;
  }

  x3 = _cffi_to_c_int(arg3, int);
  if (x3 == (int)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XGetErrorText(x0, x1, x2, x3); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XGetGeometry(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  unsigned long * x2;
  int * x3;
  int * x4;
  unsigned int * x5;
  unsigned int * x6;
  unsigned int * x7;
  unsigned int * x8;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;
  PyObject *arg4;
  PyObject *arg5;
  PyObject *arg6;
  PyObject *arg7;
  PyObject *arg8;

  if (!PyArg_ParseTuple(args, "OOOOOOOOO:XGetGeometry", &arg0, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7, &arg8))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(6), arg2, (char **)&x2);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x2 = alloca((size_t)datasize);
    memset((void *)x2, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x2, _cffi_type(6), arg2) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(7), arg3, (char **)&x3);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x3 = alloca((size_t)datasize);
    memset((void *)x3, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x3, _cffi_type(7), arg3) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(7), arg4, (char **)&x4);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x4 = alloca((size_t)datasize);
    memset((void *)x4, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x4, _cffi_type(7), arg4) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(8), arg5, (char **)&x5);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x5 = alloca((size_t)datasize);
    memset((void *)x5, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x5, _cffi_type(8), arg5) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(8), arg6, (char **)&x6);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x6 = alloca((size_t)datasize);
    memset((void *)x6, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x6, _cffi_type(8), arg6) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(8), arg7, (char **)&x7);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x7 = alloca((size_t)datasize);
    memset((void *)x7, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x7, _cffi_type(8), arg7) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(8), arg8, (char **)&x8);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x8 = alloca((size_t)datasize);
    memset((void *)x8, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x8, _cffi_type(8), arg8) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XGetGeometry(x0, x1, x2, x3, x4, x5, x6, x7, x8); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XGetWindowProperty(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  unsigned long x2;
  long x3;
  long x4;
  int x5;
  unsigned long x6;
  unsigned long * x7;
  int * x8;
  unsigned long * x9;
  unsigned long * x10;
  unsigned char * * x11;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;
  PyObject *arg4;
  PyObject *arg5;
  PyObject *arg6;
  PyObject *arg7;
  PyObject *arg8;
  PyObject *arg9;
  PyObject *arg10;
  PyObject *arg11;

  if (!PyArg_ParseTuple(args, "OOOOOOOOOOOO:XGetWindowProperty", &arg0, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7, &arg8, &arg9, &arg10, &arg11))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, unsigned long);
  if (x2 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x3 = _cffi_to_c_int(arg3, long);
  if (x3 == (long)-1 && PyErr_Occurred())
    return NULL;

  x4 = _cffi_to_c_int(arg4, long);
  if (x4 == (long)-1 && PyErr_Occurred())
    return NULL;

  x5 = _cffi_to_c_int(arg5, int);
  if (x5 == (int)-1 && PyErr_Occurred())
    return NULL;

  x6 = _cffi_to_c_int(arg6, unsigned long);
  if (x6 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(6), arg7, (char **)&x7);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x7 = alloca((size_t)datasize);
    memset((void *)x7, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x7, _cffi_type(6), arg7) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(7), arg8, (char **)&x8);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x8 = alloca((size_t)datasize);
    memset((void *)x8, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x8, _cffi_type(7), arg8) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(6), arg9, (char **)&x9);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x9 = alloca((size_t)datasize);
    memset((void *)x9, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x9, _cffi_type(6), arg9) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(6), arg10, (char **)&x10);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x10 = alloca((size_t)datasize);
    memset((void *)x10, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x10, _cffi_type(6), arg10) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(9), arg11, (char **)&x11);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x11 = alloca((size_t)datasize);
    memset((void *)x11, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x11, _cffi_type(9), arg11) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XGetWindowProperty(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XGrabKey(PyObject *self, PyObject *args)
{
  Display * x0;
  int x1;
  unsigned int x2;
  unsigned long x3;
  int x4;
  int x5;
  int x6;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;
  PyObject *arg4;
  PyObject *arg5;
  PyObject *arg6;

  if (!PyArg_ParseTuple(args, "OOOOOOO:XGrabKey", &arg0, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, int);
  if (x1 == (int)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, unsigned int);
  if (x2 == (unsigned int)-1 && PyErr_Occurred())
    return NULL;

  x3 = _cffi_to_c_int(arg3, unsigned long);
  if (x3 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x4 = _cffi_to_c_int(arg4, int);
  if (x4 == (int)-1 && PyErr_Occurred())
    return NULL;

  x5 = _cffi_to_c_int(arg5, int);
  if (x5 == (int)-1 && PyErr_Occurred())
    return NULL;

  x6 = _cffi_to_c_int(arg6, int);
  if (x6 == (int)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XGrabKey(x0, x1, x2, x3, x4, x5, x6); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XGrabKeyboard(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  int x2;
  int x3;
  int x4;
  unsigned long x5;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;
  PyObject *arg4;
  PyObject *arg5;

  if (!PyArg_ParseTuple(args, "OOOOOO:XGrabKeyboard", &arg0, &arg1, &arg2, &arg3, &arg4, &arg5))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, int);
  if (x2 == (int)-1 && PyErr_Occurred())
    return NULL;

  x3 = _cffi_to_c_int(arg3, int);
  if (x3 == (int)-1 && PyErr_Occurred())
    return NULL;

  x4 = _cffi_to_c_int(arg4, int);
  if (x4 == (int)-1 && PyErr_Occurred())
    return NULL;

  x5 = _cffi_to_c_int(arg5, unsigned long);
  if (x5 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XGrabKeyboard(x0, x1, x2, x3, x4, x5); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XGrabPointer(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  int x2;
  unsigned int x3;
  int x4;
  int x5;
  unsigned long x6;
  unsigned long x7;
  unsigned long x8;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;
  PyObject *arg4;
  PyObject *arg5;
  PyObject *arg6;
  PyObject *arg7;
  PyObject *arg8;

  if (!PyArg_ParseTuple(args, "OOOOOOOOO:XGrabPointer", &arg0, &arg1, &arg2, &arg3, &arg4, &arg5, &arg6, &arg7, &arg8))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, int);
  if (x2 == (int)-1 && PyErr_Occurred())
    return NULL;

  x3 = _cffi_to_c_int(arg3, unsigned int);
  if (x3 == (unsigned int)-1 && PyErr_Occurred())
    return NULL;

  x4 = _cffi_to_c_int(arg4, int);
  if (x4 == (int)-1 && PyErr_Occurred())
    return NULL;

  x5 = _cffi_to_c_int(arg5, int);
  if (x5 == (int)-1 && PyErr_Occurred())
    return NULL;

  x6 = _cffi_to_c_int(arg6, unsigned long);
  if (x6 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x7 = _cffi_to_c_int(arg7, unsigned long);
  if (x7 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x8 = _cffi_to_c_int(arg8, unsigned long);
  if (x8 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XGrabPointer(x0, x1, x2, x3, x4, x5, x6, x7, x8); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XInternAtom(PyObject *self, PyObject *args)
{
  Display * x0;
  char * x1;
  int x2;
  Py_ssize_t datasize;
  unsigned long result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;

  if (!PyArg_ParseTuple(args, "OOO:XInternAtom", &arg0, &arg1, &arg2))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(5), arg1, (char **)&x1);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x1 = alloca((size_t)datasize);
    memset((void *)x1, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x1, _cffi_type(5), arg1) < 0)
      return NULL;
  }

  x2 = _cffi_to_c_int(arg2, int);
  if (x2 == (int)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XInternAtom(x0, x1, x2); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, unsigned long);
}

static PyObject *
_cffi_f_XKeysymToKeycode(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  Py_ssize_t datasize;
  unsigned char result;
  PyObject *arg0;
  PyObject *arg1;

  if (!PyArg_ParseTuple(args, "OO:XKeysymToKeycode", &arg0, &arg1))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XKeysymToKeycode(x0, x1); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, unsigned char);
}

static PyObject *
_cffi_f_XNextEvent(PyObject *self, PyObject *args)
{
  Display * x0;
  XEvent * x1;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;

  if (!PyArg_ParseTuple(args, "OO:XNextEvent", &arg0, &arg1))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(10), arg1, (char **)&x1);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x1 = alloca((size_t)datasize);
    memset((void *)x1, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x1, _cffi_type(10), arg1) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XNextEvent(x0, x1); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XOpenDisplay(PyObject *self, PyObject *arg0)
{
  char * x0;
  Py_ssize_t datasize;
  Display * result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(5), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(5), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XOpenDisplay(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_pointer((char *)result, _cffi_type(0));
}

static PyObject *
_cffi_f_XPending(PyObject *self, PyObject *arg0)
{
  Display * x0;
  Py_ssize_t datasize;
  int result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XPending(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XScreenSaverQueryInfo(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  XScreenSaverInfo * x2;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;

  if (!PyArg_ParseTuple(args, "OOO:XScreenSaverQueryInfo", &arg0, &arg1, &arg2))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(11), arg2, (char **)&x2);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x2 = alloca((size_t)datasize);
    memset((void *)x2, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x2, _cffi_type(11), arg2) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XScreenSaverQueryInfo(x0, x1, x2); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XSelectInput(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  long x2;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;

  if (!PyArg_ParseTuple(args, "OOO:XSelectInput", &arg0, &arg1, &arg2))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, long);
  if (x2 == (long)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XSelectInput(x0, x1, x2); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XSendEvent(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  int x2;
  long x3;
  XEvent * x4;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;
  PyObject *arg4;

  if (!PyArg_ParseTuple(args, "OOOOO:XSendEvent", &arg0, &arg1, &arg2, &arg3, &arg4))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, int);
  if (x2 == (int)-1 && PyErr_Occurred())
    return NULL;

  x3 = _cffi_to_c_int(arg3, long);
  if (x3 == (long)-1 && PyErr_Occurred())
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(10), arg4, (char **)&x4);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x4 = alloca((size_t)datasize);
    memset((void *)x4, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x4, _cffi_type(10), arg4) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XSendEvent(x0, x1, x2, x3, x4); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XSetErrorHandler(PyObject *self, PyObject *arg0)
{
  int(* x0)(Display *, XErrorEvent *);
  int(* result)(Display *, XErrorEvent *);

  x0 = (int(*)(Display *, XErrorEvent *))_cffi_to_c_pointer(arg0, _cffi_type(12));
  if (x0 == (int(*)(Display *, XErrorEvent *))NULL && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XSetErrorHandler(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_pointer((char *)result, _cffi_type(12));
}

static PyObject *
_cffi_f_XStringToKeysym(PyObject *self, PyObject *arg0)
{
  char * x0;
  Py_ssize_t datasize;
  unsigned long result;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(5), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(5), arg0) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XStringToKeysym(x0); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, unsigned long);
}

static PyObject *
_cffi_f_XSync(PyObject *self, PyObject *args)
{
  Display * x0;
  int x1;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;

  if (!PyArg_ParseTuple(args, "OO:XSync", &arg0, &arg1))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, int);
  if (x1 == (int)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XSync(x0, x1); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XUngrabKey(PyObject *self, PyObject *args)
{
  Display * x0;
  int x1;
  unsigned int x2;
  unsigned long x3;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;
  PyObject *arg3;

  if (!PyArg_ParseTuple(args, "OOOO:XUngrabKey", &arg0, &arg1, &arg2, &arg3))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, int);
  if (x1 == (int)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, unsigned int);
  if (x2 == (unsigned int)-1 && PyErr_Occurred())
    return NULL;

  x3 = _cffi_to_c_int(arg3, unsigned long);
  if (x3 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XUngrabKey(x0, x1, x2, x3); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XUngrabKeyboard(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;

  if (!PyArg_ParseTuple(args, "OO:XUngrabKeyboard", &arg0, &arg1))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XUngrabKeyboard(x0, x1); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XUngrabPointer(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned long x1;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;

  if (!PyArg_ParseTuple(args, "OO:XUngrabPointer", &arg0, &arg1))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned long);
  if (x1 == (unsigned long)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XUngrabPointer(x0, x1); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XkbGetState(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned int x1;
  XkbStateRec * x2;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;

  if (!PyArg_ParseTuple(args, "OOO:XkbGetState", &arg0, &arg1, &arg2))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned int);
  if (x1 == (unsigned int)-1 && PyErr_Occurred())
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(13), arg2, (char **)&x2);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x2 = alloca((size_t)datasize);
    memset((void *)x2, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x2, _cffi_type(13), arg2) < 0)
      return NULL;
  }

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XkbGetState(x0, x1, x2); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static PyObject *
_cffi_f_XkbLockGroup(PyObject *self, PyObject *args)
{
  Display * x0;
  unsigned int x1;
  unsigned int x2;
  Py_ssize_t datasize;
  int result;
  PyObject *arg0;
  PyObject *arg1;
  PyObject *arg2;

  if (!PyArg_ParseTuple(args, "OOO:XkbLockGroup", &arg0, &arg1, &arg2))
    return NULL;

  datasize = _cffi_prepare_pointer_call_argument(
      _cffi_type(0), arg0, (char **)&x0);
  if (datasize != 0) {
    if (datasize < 0)
      return NULL;
    x0 = alloca((size_t)datasize);
    memset((void *)x0, 0, (size_t)datasize);
    if (_cffi_convert_array_from_object((char *)x0, _cffi_type(0), arg0) < 0)
      return NULL;
  }

  x1 = _cffi_to_c_int(arg1, unsigned int);
  if (x1 == (unsigned int)-1 && PyErr_Occurred())
    return NULL;

  x2 = _cffi_to_c_int(arg2, unsigned int);
  if (x2 == (unsigned int)-1 && PyErr_Occurred())
    return NULL;

  Py_BEGIN_ALLOW_THREADS
  _cffi_restore_errno();
  { result = XkbLockGroup(x0, x1, x2); }
  _cffi_save_errno();
  Py_END_ALLOW_THREADS

  (void)self; /* unused */
  return _cffi_from_c_int(result, int);
}

static int _cffi_setup_custom(PyObject *lib)
{
  return _cffi_const_XkbUseCoreKbd(lib);
}

static PyMethodDef _cffi_methods[] = {
  {"_cffi_layout__XAnyEvent", _cffi_layout__XAnyEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XClientMessageEvent", _cffi_layout__XClientMessageEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XCreateWindowEvent", _cffi_layout__XCreateWindowEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XDestroyWindowEvent", _cffi_layout__XDestroyWindowEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XErrorEvent", _cffi_layout__XErrorEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XEvent", _cffi_layout__XEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XFocusChangeEvent", _cffi_layout__XFocusChangeEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XKeyEvent", _cffi_layout__XKeyEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XPropertyEvent", _cffi_layout__XPropertyEvent, METH_NOARGS, NULL},
  {"_cffi_layout__XScreenSaverInfo", _cffi_layout__XScreenSaverInfo, METH_NOARGS, NULL},
  {"_cffi_layout__XWindowChanges", _cffi_layout__XWindowChanges, METH_NOARGS, NULL},
  {"_cffi_layout__XkbStateRec", _cffi_layout__XkbStateRec, METH_NOARGS, NULL},
  {"ConnectionNumber", _cffi_f_ConnectionNumber, METH_O, NULL},
  {"DPMSDisable", _cffi_f_DPMSDisable, METH_O, NULL},
  {"DPMSEnable", _cffi_f_DPMSEnable, METH_O, NULL},
  {"DPMSInfo", _cffi_f_DPMSInfo, METH_VARARGS, NULL},
  {"DefaultRootWindow", _cffi_f_DefaultRootWindow, METH_O, NULL},
  {"XChangeProperty", _cffi_f_XChangeProperty, METH_VARARGS, NULL},
  {"XCloseDisplay", _cffi_f_XCloseDisplay, METH_O, NULL},
  {"XConfigureWindow", _cffi_f_XConfigureWindow, METH_VARARGS, NULL},
  {"XDeleteProperty", _cffi_f_XDeleteProperty, METH_VARARGS, NULL},
  {"XFlush", _cffi_f_XFlush, METH_O, NULL},
  {"XFree", _cffi_f_XFree, METH_O, NULL},
  {"XGetErrorText", _cffi_f_XGetErrorText, METH_VARARGS, NULL},
  {"XGetGeometry", _cffi_f_XGetGeometry, METH_VARARGS, NULL},
  {"XGetWindowProperty", _cffi_f_XGetWindowProperty, METH_VARARGS, NULL},
  {"XGrabKey", _cffi_f_XGrabKey, METH_VARARGS, NULL},
  {"XGrabKeyboard", _cffi_f_XGrabKeyboard, METH_VARARGS, NULL},
  {"XGrabPointer", _cffi_f_XGrabPointer, METH_VARARGS, NULL},
  {"XInternAtom", _cffi_f_XInternAtom, METH_VARARGS, NULL},
  {"XKeysymToKeycode", _cffi_f_XKeysymToKeycode, METH_VARARGS, NULL},
  {"XNextEvent", _cffi_f_XNextEvent, METH_VARARGS, NULL},
  {"XOpenDisplay", _cffi_f_XOpenDisplay, METH_O, NULL},
  {"XPending", _cffi_f_XPending, METH_O, NULL},
  {"XScreenSaverQueryInfo", _cffi_f_XScreenSaverQueryInfo, METH_VARARGS, NULL},
  {"XSelectInput", _cffi_f_XSelectInput, METH_VARARGS, NULL},
  {"XSendEvent", _cffi_f_XSendEvent, METH_VARARGS, NULL},
  {"XSetErrorHandler", _cffi_f_XSetErrorHandler, METH_O, NULL},
  {"XStringToKeysym", _cffi_f_XStringToKeysym, METH_O, NULL},
  {"XSync", _cffi_f_XSync, METH_VARARGS, NULL},
  {"XUngrabKey", _cffi_f_XUngrabKey, METH_VARARGS, NULL},
  {"XUngrabKeyboard", _cffi_f_XUngrabKeyboard, METH_VARARGS, NULL},
  {"XUngrabPointer", _cffi_f_XUngrabPointer, METH_VARARGS, NULL},
  {"XkbGetState", _cffi_f_XkbGetState, METH_VARARGS, NULL},
  {"XkbLockGroup", _cffi_f_XkbLockGroup, METH_VARARGS, NULL},
  {"_cffi_setup", _cffi_setup, METH_VARARGS, NULL},
  {NULL, NULL, 0, NULL}    /* Sentinel */
};

#if PY_MAJOR_VERSION >= 3

static struct PyModuleDef _cffi_module_def = {
  PyModuleDef_HEAD_INIT,
  "_cffi__x703cd531x78635c57",
  NULL,
  -1,
  _cffi_methods,
  NULL, NULL, NULL, NULL
};

PyMODINIT_FUNC
PyInit__cffi__x703cd531x78635c57(void)
{
  PyObject *lib;
  lib = PyModule_Create(&_cffi_module_def);
  if (lib == NULL)
    return NULL;
  if (((void)lib,0) < 0 || _cffi_init() < 0) {
    Py_DECREF(lib);
    return NULL;
  }
  return lib;
}

#else

PyMODINIT_FUNC
init_cffi__x703cd531x78635c57(void)
{
  PyObject *lib;
  lib = Py_InitModule("_cffi__x703cd531x78635c57", _cffi_methods);
  if (lib == NULL)
    return;
  if (((void)lib,0) < 0 || _cffi_init() < 0)
    return;
  return;
}

#endif
