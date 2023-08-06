/******************************************************************************
 * Licensed under Apache License Version 2.0 - see LICENSE.rst
 *****************************************************************************/

typedef struct {
    PyObject_HEAD
    PyObject *funcs;
    int reverse;
    int all;
    PyObject *funcargs;
} PyIUObject_Chained;

PyTypeObject PyIUType_Chained;

/******************************************************************************
 * New
 *****************************************************************************/

static PyObject *
chained_new(PyTypeObject *type,
            PyObject *funcs,
            PyObject *kwargs)
{
    PyIUObject_Chained *self;

    PyObject *kwarg, *funcargs=NULL;
    Py_ssize_t nkwargs;
    int reverse = 0;
    int all = 0;

    /* Parse arguments */
    if (funcs == NULL || !PyTuple_Check(funcs) || PyTuple_Size(funcs) <= 0) {
        PyErr_Format(PyExc_TypeError, "at least 1 function must be given.");
        return NULL;
    }

    if (kwargs != NULL && PyDict_Check(kwargs) && PyDict_Size(kwargs)) {
        nkwargs = 0;

        kwarg = PyDict_GetItemString(kwargs, "reverse");
        if (kwarg != NULL) {
            reverse = PyLong_AsLong(kwarg);
            nkwargs++;
        }

        kwarg = PyDict_GetItemString(kwargs, "all");
        if (kwarg != NULL) {
            all = PyLong_AsLong(kwarg);
            nkwargs++;
        }

        if (PyDict_Size(kwargs) - nkwargs != 0) {
            PyErr_Format(PyExc_TypeError,
                         "`chained` got an unexpected keyword argument");
            return NULL;
        }
    }

    funcargs = PyTuple_New(1);
    if (funcargs == NULL) {
        return NULL;
    }
    /* Create struct */
    self = (PyIUObject_Chained *)type->tp_alloc(type, 0);
    if (self == NULL) {
        Py_DECREF(funcargs);
        return NULL;
    }
    Py_INCREF(funcs);
    self->funcs = funcs;
    self->reverse = reverse;
    self->all = all;
    self->funcargs = funcargs;
    return (PyObject *)self;
}

/******************************************************************************
 * Destructor
 *****************************************************************************/

static void
chained_dealloc(PyIUObject_Chained *self)
{
    PyObject_GC_UnTrack(self);
    Py_XDECREF(self->funcs);
    Py_XDECREF(self->funcargs);
    Py_TYPE(self)->tp_free(self);
}

/******************************************************************************
 * Traverse
 *****************************************************************************/

static int
chained_traverse(PyIUObject_Chained *self,
                 visitproc visit,
                 void *arg)
{
    Py_VISIT(self->funcs);
    Py_VISIT(self->funcargs);
    return 0;
}

/******************************************************************************
 * Call
 *****************************************************************************/

static PyObject *
chained_call(PyIUObject_Chained *self,
             PyObject *args,
             PyObject *kwargs)
{
    PyObject *func, *temp, *oldtemp, *result=NULL, *tmp=NULL;
    Py_ssize_t tuplesize, idx;

    tuplesize = PyTuple_Size(self->funcs);
    temp = NULL;

    /* Create a placeholder tuple for "all=True".  */
    if (self->all) {
        result = PyTuple_New(tuplesize);
        if (result == NULL) {
            return NULL;
        }
    }

    for (idx=0 ; idx<tuplesize ; idx++) {

        /* Get the function. */
        if (self->reverse) {
            func = PyTuple_GET_ITEM(self->funcs, tuplesize - idx - 1);
        } else {
            func = PyTuple_GET_ITEM(self->funcs, idx);
        }

        /* Call the function and process the result. */
        if (temp == NULL || self->all) {
            temp = PyObject_Call(func, args, kwargs);
            if (self->all) {
                PyTuple_SET_ITEM(result, idx, temp);
            }
        } else {
            oldtemp = temp;
            PYIU_RECYCLE_ARG_TUPLE(self->funcargs, temp, tmp, Py_DECREF(result);
                                                              Py_DECREF(oldtemp);
                                                              return NULL)
            temp = PyObject_Call(func, self->funcargs, NULL);
            Py_DECREF(oldtemp);
        }

        /* In case something went wrong when calling the function. */
        if (temp == NULL) {
            if (self->all) {
                Py_DECREF(result);
            }
            return NULL;
        }
    }

    if (self->all) {
        return result;
    } else {
        return temp;
    }
}

/******************************************************************************
 * Reduce
 *****************************************************************************/

static PyObject *
chained_reduce(PyIUObject_Chained *self,
               PyObject *unused)
{
    return Py_BuildValue("OO(ii)", Py_TYPE(self),
                         self->funcs,
                         self->reverse, self->all);
}

/******************************************************************************
 * Setstate
 *****************************************************************************/

static PyObject *
chained_setstate(PyIUObject_Chained *self,
                 PyObject *state)
{
    int reverse, all;

    if (!PyArg_ParseTuple(state, "ii", &reverse, &all)) {
        return NULL;
    }

    self->reverse = reverse;
    self->all = all;
    Py_RETURN_NONE;
}

/******************************************************************************
 * Methods
 *****************************************************************************/

static PyMethodDef chained_methods[] = {
    {"__reduce__", (PyCFunction)chained_reduce, METH_NOARGS, PYIU_reduce_doc},
    {"__setstate__", (PyCFunction)chained_setstate, METH_O, PYIU_setstate_doc},
    {NULL, NULL}
};

/******************************************************************************
 * Docstring
 *****************************************************************************/

PyDoc_STRVAR(chained_doc, "chained(*funcs, /, reverse=False, all=False)\n\
--\n\
\n\
Chained function calls.\n\
\n\
Parameters\n\
----------\n\
funcs\n\
    Any number of callables.\n\
\n\
reverse : bool, optional\n\
    If ``True`` apply the the `funcs` in reversed order.\n\
    Default is ``False``.\n\
\n\
all : bool, optional\n\
    If ``True`` apply each of the `funcs` seperatly and return a tuple\n\
    containing the individual results when calling the instance.\n\
\n\
Returns\n\
-------\n\
chained_func : callable\n\
    The chained `funcs`.\n\
\n\
Methods\n\
-------\n\
__call__(\\*args, \\*\\*kwargs)\n\
   Returns ``func1(...(funcn(*args, **kwargs)))``.\n\
   Or ``funcn(...(func1(*args, **kwargs)))`` (if `reverse` is True).\n\
   Or ``func1(*args, **kwargs), ..., funcn(*args, **kwargs)`` if `all` is True.\n\
\n\
Examples\n\
--------\n\
`chained` simple calls all `funcs` on the result of the previous one::\n\
\n\
    >>> from iteration_utilities import chained\n\
    >>> double = lambda x: x*2\n\
    >>> increment = lambda x: x+1\n\
    >>> double_then_increment = chained(double, increment)\n\
    >>> double_then_increment(10)\n\
    21\n\
\n\
Or apply them in reversed order::\n\
\n\
    >>> increment_then_double = chained(double, increment, reverse=True)\n\
    >>> increment_then_double(10)\n\
    22\n\
\n\
Or apply all of them on the input::\n\
\n\
    >>> double_and_increment = chained(double, increment, all=True)\n\
    >>> double_and_increment(10)\n\
    (20, 11)");

/******************************************************************************
 * Type
 *****************************************************************************/

PyTypeObject PyIUType_Chained = {
    PyVarObject_HEAD_INIT(NULL, 0)
    "iteration_utilities.chained",                      /* tp_name */
    sizeof(PyIUObject_Chained),                         /* tp_basicsize */
    0,                                                  /* tp_itemsize */
    /* methods */
    (destructor)chained_dealloc,                        /* tp_dealloc */
    0,                                                  /* tp_print */
    0,                                                  /* tp_getattr */
    0,                                                  /* tp_setattr */
    0,                                                  /* tp_reserved */
    0,                                                  /* tp_repr */
    0,                                                  /* tp_as_number */
    0,                                                  /* tp_as_sequence */
    0,                                                  /* tp_as_mapping */
    0,                                                  /* tp_hash */
    (ternaryfunc)chained_call,                          /* tp_call */
    0,                                                  /* tp_str */
    PyObject_GenericGetAttr,                            /* tp_getattro */
    0,                                                  /* tp_setattro */
    0,                                                  /* tp_as_buffer */
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_HAVE_GC |
        Py_TPFLAGS_BASETYPE,                            /* tp_flags */
    chained_doc,                                        /* tp_doc */
    (traverseproc)chained_traverse,                     /* tp_traverse */
    0,                                                  /* tp_clear */
    0,                                                  /* tp_richcompare */
    0,                                                  /* tp_weaklistoffset */
    0,                                                  /* tp_iter */
    0,                                                  /* tp_iternext */
    chained_methods,                                    /* tp_methods */
    0,                                                  /* tp_members */
    0,                                                  /* tp_getset */
    0,                                                  /* tp_base */
    0,                                                  /* tp_dict */
    0,                                                  /* tp_descr_get */
    0,                                                  /* tp_descr_set */
    0,                                                  /* tp_dictoffset */
    0,                                                  /* tp_init */
    0,                                                  /* tp_alloc */
    chained_new,                                        /* tp_new */
    PyObject_GC_Del,                                    /* tp_free */
};
