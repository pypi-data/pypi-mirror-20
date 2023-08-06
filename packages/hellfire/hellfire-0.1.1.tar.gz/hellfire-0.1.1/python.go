package hellfire // import "pathspider.net/hellfire"

// #include <Python.h>
// int PyArg_ParseTuple_UUUU(PyObject*, PyObject**, PyObject**, PyObject**, PyObject**);
import "C"
import "unsafe"

func stringFromPython(obj *C.PyObject) string {
	bytes := C.PyUnicode_AsUTF8String(obj)
	cstr := C.PyBytes_AsString(bytes)
	str := C.GoString(cstr)

	C.free(unsafe.Pointer(cstr))
	C.Py_DecRef(bytes)

	return str
}

//export performLookupsFromPython
func performLookupsFromPython(self *C.PyObject, args *C.PyObject) {
	var testListOptionsObj *C.PyObject
	var lookupTypeObj *C.PyObject
	var outputTypeObj *C.PyObject
	var canidAddressObj *C.PyObject

	if C.PyArg_ParseTuple_UUUU(args, &testListOptionsObj, &lookupTypeObj, &outputTypeObj, &canidAddressObj) == 0 {
		return;
	}

	testListOptions := stringFromPython(testListOptionsObj)
	lookupType := stringFromPython(lookupTypeObj)
	outputType := stringFromPython(outputTypeObj)
	canidAddress := stringFromPython(canidAddressObj)

	PerformLookups(testListOptions, lookupType, outputType, canidAddress)
}
