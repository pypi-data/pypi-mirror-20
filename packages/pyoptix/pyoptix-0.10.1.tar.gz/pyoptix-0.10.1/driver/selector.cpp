#include "selector.h"


NativeSelectorWrapper::NativeSelectorWrapper(optix::Selector selector){
    this->selector = selector;
    this->set_destroyable_object(this->selector.get());
}

NativeSelectorWrapper::~NativeSelectorWrapper() {
    if (!is_destroyed) this->selector->destroy();
}

void NativeSelectorWrapper::set_visit_program(NativeProgramWrapper* program) {
    this->selector->setVisitProgram(program->get_native());
}

void NativeSelectorWrapper::set_child_count(unsigned int count) {
    this->selector->setChildCount(count);
}

unsigned int NativeSelectorWrapper::get_child_count() {
    return this->selector->getChildCount();
}

void NativeSelectorWrapper::set_child_geometry_group(unsigned int index, NativeGeometryGroupWrapper* child) {
    this->selector->setChild(index, child->get_native());
}

void NativeSelectorWrapper::set_child_group(unsigned int index, NativeGroupWrapper* child) {
    this->selector->setChild(index, child->get_native());
}

void NativeSelectorWrapper::set_child_selector(unsigned int index, NativeSelectorWrapper* child) {
    this->selector->setChild(index, child->get_native());
}

void NativeSelectorWrapper::set_child_transform(unsigned int index, NativeTransformWrapper* child) {
    this->selector->setChild(index, child->get_native());
}

void NativeSelectorWrapper::remove_child(unsigned int index) {
    this->selector->removeChild(index);
}

optix::Selector NativeSelectorWrapper::get_native() {
    return this->selector;
}

void NativeSelectorWrapper::boost_python_expose() {
    boost::python::class_<NativeSelectorWrapper, boost::python::bases<NativeDestroyableWrapper> >(
                "NativeSelectorWrapper",
                "Wraps optix::Selector class",
                boost::python::no_init)

            .def("set_visit_program", &NativeSelectorWrapper::set_visit_program)
            .def("set_child_count", &NativeSelectorWrapper::set_child_count)
            .def("get_child_count", &NativeSelectorWrapper::get_child_count)
            .def("set_child_geometry_group", &NativeSelectorWrapper::set_child_geometry_group)
            .def("set_child_group", &NativeSelectorWrapper::set_child_group)
            .def("set_child_selector", &NativeSelectorWrapper::set_child_selector)
            .def("remove_child", &NativeSelectorWrapper::remove_child);
}
