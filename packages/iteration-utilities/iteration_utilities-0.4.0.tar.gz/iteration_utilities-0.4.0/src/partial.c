/******************************************************************************
 * Licensed under Apache License Version 2.0 - see LICENSE.rst
 *****************************************************************************/

PyObject PlaceholderStruct;

#define PYIU_Placeholder (&PlaceholderStruct)


static PyObject *
placeholder_repr(PyObject *self)
{
    return PyUnicode_FromString("_");
}

#if PY_MAJOR_VERSION == 3
static PyObject *
placeholder_reduce(PyObject *self)
{
    return PyUnicode_FromString("iteration_utilities.Placeholder");
}

static PyMethodDef placeholder_methods[] = {
    {"__reduce__", (PyCFunction)placeholder_reduce, METH_NOARGS, NULL},
    {NULL, NULL}
};
#else
static PyMethodDef placeholder_methods[] = {
    {NULL, NULL}
};
#endif

static PyObject *
placeholder_new(PyTypeObject *type, PyObject *args, PyObject *kwargs)
{
    if (PyTuple_GET_SIZE(args) || (kwargs && PyDict_Size(kwargs))) {
        PyErr_SetString(PyExc_TypeError, "PlaceholderType takes no arguments");
        return NULL;
    }
    Py_INCREF(PYIU_Placeholder);
    return PYIU_Placeholder;
}

PyDoc_STRVAR(placeholder_doc, "PlaceholderType(/)\n\
--\n\
\n\
A placeholder for :py:func:`iteration_utilities.partial`. It defines the\n\
class for ``iteration_utilities.partial._`` and \n\
``iteration_utilities.Placeholder``.\n\
");

PyTypeObject Placeholder_Type = {
    PyVarObject_HEAD_INIT(NULL, 0)
    "iteration_utilities.PlaceholderType",
    0,
    0,
    0,                         /*tp_dealloc*/
    0,                         /*tp_print*/
    0,                         /*tp_getattr*/
    0,                         /*tp_setattr*/
    0,                         /*tp_reserved*/
    placeholder_repr,          /*tp_repr*/
    0,                         /*tp_as_number*/
    0,                         /*tp_as_sequence*/
    0,                         /*tp_as_mapping*/
    0,                         /*tp_hash */
    0,                         /*tp_call */
    0,                         /*tp_str */
    0,                         /*tp_getattro */
    0,                         /*tp_setattro */
    0,                         /*tp_as_buffer */
    Py_TPFLAGS_DEFAULT,        /*tp_flags */
    placeholder_doc,           /*tp_doc */
    0,                         /*tp_traverse */
    0,                         /*tp_clear */
    0,                         /*tp_richcompare */
    0,                         /*tp_weaklistoffset */
    0,                         /*tp_iter */
    0,                         /*tp_iternext */
    placeholder_methods,       /*tp_methods */
    0,                         /*tp_members */
    0,                         /*tp_getset */
    0,                         /*tp_base */
    0,                         /*tp_dict */
    0,                         /*tp_descr_get */
    0,                         /*tp_descr_set */
    0,                         /*tp_dictoffset */
    0,                         /*tp_init */
    0,                         /*tp_alloc */
    placeholder_new,           /*tp_new */
};

PyObject PlaceholderStruct = {
    _PyObject_EXTRA_INIT
    1, &Placeholder_Type
};

static Py_ssize_t
PyIUPlaceholder_NumInTuple(PyObject *tup)
{
    Py_ssize_t cnts = 0;
    Py_ssize_t i;

    /* Find the placeholders (if any) in the tuple. */
    for ( i=0 ; i < PyTuple_GET_SIZE(tup) ; i++ ) {
        if (PyTuple_GET_ITEM(tup, i) == PYIU_Placeholder) {
            cnts++;
        }
    }

    return cnts;
}

static Py_ssize_t *
PyIUPlaceholder_PosInTuple(PyObject *tup, Py_ssize_t cnts)
{
    Py_ssize_t *pos = PyMem_Malloc((size_t)cnts * sizeof(Py_ssize_t));
    Py_ssize_t j = 0;
    Py_ssize_t i;

    if (pos == NULL) {
        PyErr_Format(PyExc_MemoryError,
                     "Memory Error when trying to allocate array for partial.");
        goto Fail;
    }

    /* Find the placeholders (if any) in the tuple. */
    for ( i=0 ; i < PyTuple_GET_SIZE(tup) ; i++ ) {
        if (PyTuple_GET_ITEM(tup, i) == PYIU_Placeholder) {
            pos[j] = i;
            j++;
        }
    }

    if (j != cnts) {
        PyErr_Format(PyExc_TypeError,
                     "Something went wrong... totally wrong!");
        goto Fail;
    }

    return pos;

Fail:
    PyMem_Free(pos);
    return NULL;

}


/******************************************************************************
 * The following code is has a different license:
 *
 * PSF license - see licenses/LICENSE_PYTHON.rst
 *
 * These functions are _roughly_ identical to the one in "functoolsmodule.c" in
 * CPython.
 *
 * Changes with respect to the original Python functions are licensed under
 * the "iteration_utilities" license:
 * Apache License Version 2.0 - see LICENSE.rst
 *
 *****************************************************************************/


typedef struct {
    PyObject_HEAD
    PyObject *fn;
    PyObject *args;
    PyObject *kw;
    PyObject *dict;
    PyObject *weakreflist; /* List of weak references */
    Py_ssize_t numph;
    Py_ssize_t *posph;
} PyIUObject_Partial;

PyTypeObject PyIUType_Partial;


static int
partial_traverse(PyIUObject_Partial *self, visitproc visit, void *arg)
{
    Py_VISIT(self->fn);
    Py_VISIT(self->args);
    Py_VISIT(self->kw);
    Py_VISIT(self->dict);
    return 0;
}


static void
partial_dealloc(PyIUObject_Partial *self)
{
    PyObject_GC_UnTrack(self);
    if (self->weakreflist != NULL) {
        PyObject_ClearWeakRefs((PyObject *) self);
    }
    Py_XDECREF(self->fn);
    Py_XDECREF(self->args);
    Py_XDECREF(self->kw);
    Py_XDECREF(self->dict);
    if (self->posph != NULL) {
        PyMem_Free(self->posph);
    }
    Py_TYPE(self)->tp_free(self);
}


static PyObject *
partial_new(PyTypeObject *type, PyObject *args, PyObject *kw)
{
    PyObject *func;
    PyObject *nargs;
    PyObject *pargs = NULL;
    PyObject *pkw = NULL;
    PyIUObject_Partial *self = NULL;
    Py_ssize_t startslice = 1;

    if (PyTuple_GET_SIZE(args) < 1) {
        PyErr_SetString(PyExc_TypeError,
                        "type 'partial' takes at least one argument");
        goto Fail;
    }

    /* create PyIUObject_Partial structure */
    self = (PyIUObject_Partial *)type->tp_alloc(type, 0);
    if (self == NULL) {
        goto Fail;
    }

    func = PyTuple_GET_ITEM(args, 0);
    /* Unwrap the function; if it's another partial and we're not in a subclass
       and (that's important) there is no custom attribute set
       (__dict__ = NULL). That means even if the dict was only accessed but
       empty!
       */
    if (Py_TYPE(func) == &PyIUType_Partial &&
            type == &PyIUType_Partial &&
            ((PyIUObject_Partial *)func)->dict == NULL) {

        Py_ssize_t tuplesize = PyTuple_GET_SIZE(args) - 1;
        PyIUObject_Partial *part = (PyIUObject_Partial *)func;

        if (part->numph && tuplesize) {
            /* Creating a partial from another partial which had placeholders
               needs to be specially treated. At least if there are positional
               keywords given these will replace the placeholders!
               */
            Py_ssize_t i, stop;

            pargs = PYUI_TupleCopy(part->args);
            if (pargs == NULL) {
                return NULL;
            }
            /* Only replace min(part->numpy, tuplesize) placeholders, otherwise
               this will make out of bounds memory accesses (besides doing
               something undefined).
               */
            stop = part->numph > tuplesize ? tuplesize : part->numph;
            for ( i=0 ; i < stop ; i++ ) {
                PyObject *tmp = PyTuple_GET_ITEM(args, i+1);
                PyObject *ph = PyTuple_GET_ITEM(pargs, part->posph[i]);
                Py_INCREF(tmp);
                PyTuple_SET_ITEM(pargs, part->posph[i], tmp);
                Py_DECREF(ph);
            }
            /* Just alter the startslice so the arguments will be sliced
               correctly later. It is also a good indicator if the pargs need
               to be decremented later. */
            startslice = startslice + stop;
        } else {
            pargs = part->args;
        }
        pkw = part->kw;
        func = part->fn;
    }

    if (!PyCallable_Check(func)) {
        PyErr_SetString(PyExc_TypeError,
                        "the first argument must be callable");
        goto Fail;
    }
    self->posph = NULL;

    self->fn = func;
    Py_INCREF(func);

    nargs = PyTuple_GetSlice(args, startslice, PY_SSIZE_T_MAX);
    if (nargs == NULL) {
        goto Fail;
    }

    if (pargs == NULL || PyTuple_GET_SIZE(pargs) == 0) {
        /* Save the arguments. */
        self->args = nargs;
        Py_INCREF(nargs);
    } else if (PyTuple_GET_SIZE(nargs) == 0) {
        self->args = pargs;
        Py_INCREF(pargs);
    } else {
        self->args = PySequence_Concat(pargs, nargs);
        if (self->args == NULL) {
            Py_DECREF(nargs);
            goto Fail;
        }
    }
    /* Check how many placeholders exist and at which positions. */
    self->numph = PyIUPlaceholder_NumInTuple(self->args);
    if (self->numph) {
        self->posph = PyIUPlaceholder_PosInTuple(self->args, self->numph);
        if (self->posph == NULL) {
            goto Fail;
        }
    }
    Py_DECREF(nargs);
    /* If we already exchanged placeholders we already got a reference to
       pargs so we need to decrement them once. */
    if (startslice != 1) {
        Py_DECREF(pargs);
        startslice = 1;  /* So the "Fail" won't decrement them again. */
    }

    if (pkw == NULL || PyDict_Size(pkw) == 0) {
        if (kw == NULL) {
            self->kw = PyDict_New();
        } else if (Py_REFCNT(kw) == 1) {
            Py_INCREF(kw);
            self->kw = kw;
        } else {
            self->kw = PyDict_Copy(kw);
        }
    } else {
        self->kw = PyDict_Copy(pkw);
        if (kw != NULL && self->kw != NULL) {
            if (PyDict_Merge(self->kw, kw, 1) != 0) {
                goto Fail;
            }
        }
    }

    if (self->kw == NULL) {
        goto Fail;
    }

    return (PyObject *)self;

Fail:
    if (startslice != 1) {
        Py_DECREF(pargs);
    }
    Py_XDECREF(self);
    return NULL;
}


static PyObject *
partial_call(PyIUObject_Partial *self, PyObject *args, PyObject *kw)
{
    PyObject *ret;
    PyObject *argappl = NULL;
    PyObject *kwappl = NULL;
    Py_ssize_t i;

    if (PyTuple_GET_SIZE(self->args) == 0) {
        argappl = args;
        Py_INCREF(args);
    } else if (PyTuple_GET_SIZE(args) == 0) {
        if (self->numph) {
            PyErr_SetString(PyExc_TypeError,
                            "not enough values to fill the placeholders.");
            return NULL;
        }
        argappl = self->args;
        Py_INCREF(self->args);
    } else {
        if (self->numph) {
            Py_ssize_t tuplesize = PyTuple_GET_SIZE(args);
            if (tuplesize == self->numph) {
                /* Exactly that many arguments as there are placeholders, just
                   fill in the blanks.
                   */
                if (Py_REFCNT(self->args) == 1) {
                    argappl = self->args;
                    Py_INCREF(argappl);
                } else {
                    /* We need a new argappl because someone else holds a
                       reference to the the args attribute. This will be a bit
                       slower but better than the surprise of having a tuple
                       change while the function is called. Why is self->args
                       exposed?
                       */
                    argappl = PYUI_TupleCopy(self->args);
                    if (argappl == NULL) {
                        goto Fail;
                    }
                }
                /* Temporary replace the placeholders with the given args.
                   These are switched back to placeholders after the function
                   call. Let's just hope that nobody decrefs them out of
                   existence.
                   CAREFUL: These items live on a stolen reference!!!
                   */
                for (i = 0 ; i < self->numph ; i++) {
                    PyTuple_SET_ITEM(argappl,
                                     self->posph[i],
                                     PyTuple_GET_ITEM(args, i));
                }
            } else if (tuplesize > self->numph) {
                /* More arguments than placeholders, fill in the placeholders
                   and concat the remaining items.
                   To keep the state clean first try to slice the passed in
                   args (those which shouldn't fill the placeholders), then
                   concat the self->args and the slice (creating a new
                   reference) so we can simply fill in the blanks without
                   potentially altering the original self->args
                   */
                PyObject *tmp = PyTuple_GetSlice(args,
                                                 self->numph, PY_SSIZE_T_MAX);
                if (tmp == NULL) {
                    return NULL;
                }
                argappl = PySequence_Concat(self->args, tmp);
                Py_DECREF(tmp);
                if (argappl == NULL) {
                    goto Fail;
                }
                /* See above.
                   CAREFUL: These items live on a stolen reference!!!
                   */
                for (i = 0 ; i < self->numph ; i++) {
                    PyTuple_SET_ITEM(argappl,
                                     self->posph[i],
                                     PyTuple_GET_ITEM(args, i));
                }
            } else {
                PyErr_SetString(PyExc_TypeError,
                                "not enough values to fill the placeholders.");
                return NULL;
            }
        } else {
            argappl = PySequence_Concat(self->args, args);
            if (argappl == NULL) {
                goto Fail;
            }
        }

    }

    if (PyDict_Size(self->kw) == 0) {
        kwappl = kw;
        Py_XINCREF(kwappl);
    } else {
        kwappl = PyDict_Copy(self->kw);
        if (kwappl == NULL) {
            goto Fail;
        }
        if (kw != NULL) {
            if (PyDict_Merge(kwappl, kw, 1) != 0) {
                goto Fail;
            }
        }
    }

    /* Actually call the function. */
    ret = PyObject_Call(self->fn, argappl, kwappl);

    /* Before decref'ing argappl we need to be make sure that there are no
       items inside that live on a borrowed reference!!! */
    if (self->numph) {
        for (i = 0 ; i < self->numph ; i++) {
            PyTuple_SET_ITEM(argappl, self->posph[i], PYIU_Placeholder);
        }
    }
    Py_DECREF(argappl);
    Py_XDECREF(kwappl);
    return ret;

Fail:
    /* Before decref'ing argappl we need to be make sure that there are no
       items inside that live on a borrowed reference!!! */
    if (self->numph && argappl != NULL) {
        for (i = 0 ; i < self->numph ; i++) {
            PyTuple_SET_ITEM(argappl, self->posph[i], PYIU_Placeholder);
        }
    }
    Py_XDECREF(argappl);
    Py_XDECREF(kwappl);
    return NULL;
}


#define OFF(x) offsetof(PyIUObject_Partial, x)
static PyMemberDef partial_memberlist[] = {
    {"func",            T_OBJECT,       OFF(fn),        READONLY,
     "Function object to use in future partial calls."},
    {"args",            T_OBJECT,       OFF(args),      READONLY,
     "Tuple of arguments to future partial calls."},
    {"keywords",        T_OBJECT,       OFF(kw),        READONLY,
     "Dictionary of keyword arguments to future partial calls."},
    {"num_placeholders",T_PYSSIZET,     OFF(numph),     READONLY,
     "Number of placeholders in the args."},
    {NULL}  /* Sentinel */
};

#if PY_MAJOR_VERSION == 2 || (PY_MAJOR_VERSION == 3 && PY_MINOR_VERSION < 3)
static PyObject *
partial_get_dict(PyIUObject_Partial *self)
{
    if (self->dict == NULL) {
        self->dict = PyDict_New();
        if (self->dict == NULL) {
            return NULL;
        }
    }
    Py_INCREF(self->dict);
    return self->dict;
}


static int
partial_set_dict(PyIUObject_Partial *self, PyObject *value)
{
    PyObject *tmp;

    /* It is illegal to del p.__dict__ */
    if (value == NULL) {
        PyErr_SetString(PyExc_TypeError,
                        "a partial object's dictionary may not be deleted");
        return -1;
    }
    /* Can only set __dict__ to a dictionary */
    if (!PyDict_Check(value)) {
        PyErr_SetString(PyExc_TypeError,
                        "setting partial object's dictionary to a non-dict");
        return -1;
    }
    tmp = self->dict;
    Py_INCREF(value);
    self->dict = value;
    Py_XDECREF(tmp);
    return 0;
}

static PyGetSetDef partial_getsetlist[] = {
    {"__dict__", (getter)partial_get_dict, (setter)partial_set_dict, NULL},
    {NULL} /* Sentinel */
};
#else
static PyGetSetDef partial_getsetlist[] = {
    {"__dict__", PyObject_GenericGetDict, PyObject_GenericSetDict, NULL},
    {NULL} /* Sentinel */
};
#endif


static PyObject *
partial_repr(PyIUObject_Partial *self)
{
    PyObject *result = NULL;
    PyObject *arglist;
    Py_ssize_t i, n;
    PyObject *key, *value;
    int ok;

    ok = Py_ReprEnter((PyObject *)self);
    if (ok != 0) {
        return ok > 0 ? PyUnicode_FromString("...") : NULL;
    }

    arglist = PyUnicode_FromString("");
    if (arglist == NULL) {
        goto done;
    }

    /* Pack positional arguments */
    n = PyTuple_GET_SIZE(self->args);
    for (i = 0; i < n; i++) {
        PyObject *tmp = PyUnicode_FromFormat("%U, %R", arglist,
                                             PyTuple_GET_ITEM(self->args, i));
        Py_CLEAR(arglist);
        arglist = tmp;
        if (arglist == NULL) {
            goto done;
        }
    }

    /* Pack keyword arguments */
    i = 0;
    while (PyDict_Next(self->kw, &i, &key, &value)) {
        PyObject *tmp;
        /* This is mostly a special case because of Python2 which segfaults
           for normal strings when used as "%U" in "PyUnicode_FromFormat"
           However setstate also allows to pass in arbitary dictionaries
           with non-string keys. To prevent segfaults in that case this
           branch is also important for python3.
           */
        PyObject *othertmp = PyUnicode_FromObject(key);
        if (othertmp == NULL) {
            Py_DECREF(arglist);
            goto done;
        }
        tmp = PyUnicode_FromFormat("%U, %U=%R", arglist, othertmp, value);
        Py_DECREF(othertmp);

        Py_CLEAR(arglist);
        arglist = tmp;
        if (arglist == NULL) {
            goto done;
        }
    }

    result = PyUnicode_FromFormat("%s(%R%U)", Py_TYPE(self)->tp_name,
                                  self->fn, arglist);
    Py_DECREF(arglist);


done:
    Py_ReprLeave((PyObject *)self);
    return result;
}

static PyObject *
partial_reduce(PyIUObject_Partial *self, PyObject *unused)
{
    return Py_BuildValue("O(O)(OOOO)", Py_TYPE(self), self->fn, self->fn,
                         self->args, self->kw,
                         self->dict ? self->dict : Py_None);
}

static PyObject *
partial_setstate(PyIUObject_Partial *self, PyObject *state)
{
    PyObject *fn, *fnargs, *kw, *dict;

    if (!PyTuple_Check(state) ||
            !PyArg_ParseTuple(state, "OOOO", &fn, &fnargs, &kw, &dict) ||
            !PyCallable_Check(fn) ||
            !PyTuple_Check(fnargs) ||
            (kw != Py_None && !PyDict_Check(kw))) {
        PyErr_SetString(PyExc_TypeError, "invalid partial state");
        return NULL;
    }

    if(!PyTuple_CheckExact(fnargs)) {
        fnargs = PySequence_Tuple(fnargs);
    } else {
        Py_INCREF(fnargs);
    }
    if (fnargs == NULL) {
        return NULL;
    }

    if (kw == Py_None) {
        kw = PyDict_New();
    } else if (!PyDict_CheckExact(kw)) {
        kw = PyDict_Copy(kw);
    } else {
        Py_INCREF(kw);
    }
    if (kw == NULL) {
        Py_DECREF(fnargs);
        return NULL;
    }

    Py_INCREF(fn);
    PYIU_NULL_IF_NONE(dict);
    Py_XINCREF(dict);

    Py_CLEAR(self->fn);
    Py_CLEAR(self->args);
    Py_CLEAR(self->kw);
    Py_CLEAR(self->dict);
    self->fn = fn;
    self->args = fnargs;
    self->kw = kw;
    self->dict = dict;

    /* Free potentially existing array of positions and recreate it. */
    if (self->posph != NULL) {
        PyMem_Free(self->posph);
    }
    self->numph = PyIUPlaceholder_NumInTuple(self->args);
    if (self->numph) {
        self->posph = PyIUPlaceholder_PosInTuple(self->args, self->numph);
        if (self->posph == NULL) {
            return NULL;
        }
    } else {
        self->posph = NULL;
    }
    Py_RETURN_NONE;
}


static PyMethodDef partial_methods[] = {
    {"__reduce__",   (PyCFunction)partial_reduce,   METH_NOARGS},
    {"__setstate__", (PyCFunction)partial_setstate, METH_O},
    {NULL,              NULL}
};


PyDoc_STRVAR(partial_doc, "partial(func, *args, **kwargs)\n\
--\n\
\n\
Like :py:func:`functools.partial` but supporting placeholders.\n\
\n\
.. versionadded:: 0.4.0\n\
\n\
Parameters\n\
----------\n\
\n\
func : callable\n\
    The function to partially wrap.\n\
\n\
args : any type\n\
    The positional arguments for `func`.\n\
    \n\
    .. note::\n\
       Using ``partial._`` as one or multiple positional arguments will be\n\
       interpreted as placeholder that need to be filled when the `partial`\n\
       instance is called.\n\
\n\
kwargs : any type\n\
    The keyword arguments for `func`.\n\
\n\
Returns\n\
-------\n\
\n\
partial : callable\n\
    The `func` where the given positional arguments are fixed (or represented\n\
    as placeholders) and with optional keyword arguments.\n\
\n\
Notes\n\
-----\n\
While placeholders can be used for the `args` they can't be used for the\n\
`kwargs`.\n\
\n\
Examples\n\
--------\n\
The :py:func:`iteration_utilities.partial` can be used as slightly slower\n\
drop-in replacement for :py:func:`functools.partial`. However it offers the\n\
possibility to pass in placeholders as positional arguments. This can be\n\
especially useful if a function does not allow keyword arguments::\n\
\n\
    >>> from iteration_utilities import partial\n\
    >>> isint = partial(isinstance, partial._, int)\n\
    >>> isint(10)\n\
    True\n\
    >>> isint(11.11)\n\
    False\n\
\n\
In this case the `isint` function is equivalent but faster than\n\
``lambda x: isinstance(x, int)``.\n\
The ``partial._`` attribute or the ``iteration_utilities.Placeholder`` or\n\
instances of :py:func:`iteration_utilities.PlaceholderType` can be used\n\
as placeholders for the positional arguments.\n\
\n\
For example most iterators in `iteration_utilities` take the `iterable` as\n\
the first argument so other arguments can be easily added::\n\
\n\
    >>> from iteration_utilities import accumulate, Placeholder\n\
    >>> from operator import mul\n\
    >>> cumprod = partial(accumulate, Placeholder, mul)\n\
    >>> list(cumprod([1,2,3,4,5]))\n\
    [1, 2, 6, 24, 120]\n\
\n\
Attributes\n\
----------\n\
_ : ``iteration_utilities.Placeholder``\n\
");

PyTypeObject PyIUType_Partial = {
    PyVarObject_HEAD_INIT(NULL, 0)
    "iteration_utilities.partial",                   /* tp_name */
    sizeof(PyIUObject_Partial),                      /* tp_basicsize */
    0,                                               /* tp_itemsize */
    /* methods */
    (destructor)partial_dealloc,                     /* tp_dealloc */
    0,                                               /* tp_print */
    0,                                               /* tp_getattr */
    0,                                               /* tp_setattr */
    0,                                               /* tp_reserved */
    (reprfunc)partial_repr,                          /* tp_repr */
    0,                                               /* tp_as_number */
    0,                                               /* tp_as_sequence */
    0,                                               /* tp_as_mapping */
    0,                                               /* tp_hash */
    (ternaryfunc)partial_call,                       /* tp_call */
    0,                                               /* tp_str */
    PyObject_GenericGetAttr,                         /* tp_getattro */
    PyObject_GenericSetAttr,                         /* tp_setattro */
    0,                                               /* tp_as_buffer */
    Py_TPFLAGS_DEFAULT | Py_TPFLAGS_HAVE_GC |
        Py_TPFLAGS_BASETYPE,                         /* tp_flags */
    partial_doc,                                     /* tp_doc */
    (traverseproc)partial_traverse,                  /* tp_traverse */
    0,                                               /* tp_clear */
    0,                                               /* tp_richcompare */
    offsetof(PyIUObject_Partial, weakreflist),       /* tp_weaklistoffset */
    0,                                               /* tp_iter */
    0,                                               /* tp_iternext */
    partial_methods,                                 /* tp_methods */
    partial_memberlist,                              /* tp_members */
    partial_getsetlist,                              /* tp_getset */
    0,                                               /* tp_base */
    0,                                               /* tp_dict */
    0,                                               /* tp_descr_get */
    0,                                               /* tp_descr_set */
    offsetof(PyIUObject_Partial, dict),              /* tp_dictoffset */
    0,                                               /* tp_init */
    0,                                               /* tp_alloc */
    partial_new,                                     /* tp_new */
    PyObject_GC_Del,                                 /* tp_free */
};
