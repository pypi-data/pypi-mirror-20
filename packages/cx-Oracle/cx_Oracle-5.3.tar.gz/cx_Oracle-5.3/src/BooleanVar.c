//-----------------------------------------------------------------------------
// Copyright 2016, 2017, Oracle and/or its affiliates. All rights reserved.
//
// Portions Copyright 2007-2015, Anthony Tuininga. All rights reserved.
//
// Portions Copyright 2001-2007, Computronix (Canada) Ltd., Edmonton, Alberta,
// Canada. All rights reserved.
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// BooleanVar.c
//   Defines the routines for handling boolean variables (only available after
// Oracle 12.1).
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Data types
//-----------------------------------------------------------------------------
typedef struct {
    Variable_HEAD
    boolean *data;
} udt_BooleanVar;


//-----------------------------------------------------------------------------
// Declaration of variable functions.
//-----------------------------------------------------------------------------
static int BooleanVar_SetValue(udt_BooleanVar*, unsigned, PyObject*);
static PyObject *BooleanVar_GetValue(udt_BooleanVar*, unsigned);


//-----------------------------------------------------------------------------
// Python type declaration
//-----------------------------------------------------------------------------
static PyTypeObject g_BooleanVarType = {
    PyVarObject_HEAD_INIT(NULL, 0)
    "cx_Oracle.BOOLEAN",                // tp_name
    sizeof(udt_BooleanVar),             // tp_basicsize
    0,                                  // tp_itemsize
    0,                                  // tp_dealloc
    0,                                  // tp_print
    0,                                  // tp_getattr
    0,                                  // tp_setattr
    0,                                  // tp_compare
    0,                                  // tp_repr
    0,                                  // tp_as_number
    0,                                  // tp_as_sequence
    0,                                  // tp_as_mapping
    0,                                  // tp_hash
    0,                                  // tp_call
    0,                                  // tp_str
    0,                                  // tp_getattro
    0,                                  // tp_setattro
    0,                                  // tp_as_buffer
    Py_TPFLAGS_DEFAULT,                 // tp_flags
    0                                   // tp_doc
};


//-----------------------------------------------------------------------------
// variable type declarations
//-----------------------------------------------------------------------------
static udt_VariableType vt_Boolean = {
    (InitializeProc) NULL,
    (FinalizeProc) NULL,
    (PreDefineProc) NULL,
    (PostDefineProc) NULL,
    (PostBindProc) NULL,
    (PreFetchProc) NULL,
    (IsNullProc) NULL,
    (SetValueProc) BooleanVar_SetValue,
    (GetValueProc) BooleanVar_GetValue,
    (GetBufferSizeProc) NULL,
    &g_BooleanVarType,                  // Python type
    SQLT_BOL,                           // Oracle type
    SQLCS_IMPLICIT,                     // charset form
    sizeof(boolean),                    // element length
    0,                                  // is character data
    0,                                  // is variable length
    1,                                  // can be copied
    0                                   // can be in array
};


//-----------------------------------------------------------------------------
// BooleanVar_GetValue()
//   Returns the value stored at the given array position.
//-----------------------------------------------------------------------------
static PyObject *BooleanVar_GetValue(
    udt_BooleanVar *var,                // variable to determine value for
    unsigned pos)                       // array position
{
    return OracleBooleanToPythonBoolean(&var->data[pos]);
}


//-----------------------------------------------------------------------------
// BooleanVar_SetValue()
//   Set the value of the variable at the given array position.
//-----------------------------------------------------------------------------
static int BooleanVar_SetValue(
    udt_BooleanVar *var,                // variable to set value for
    unsigned pos,                       // array position to set
    PyObject *value)                    // value to set
{
    return PythonBooleanToOracleBoolean(value, &var->data[pos]);
}

