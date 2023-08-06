#include "geometry_group.h"


NativeGeometryGroupWrapper::NativeGeometryGroupWrapper(optix::GeometryGroup geometry_group) {
    this->geometry_group = geometry_group;
    this->set_destroyable_object(this->geometry_group.get());
}

NativeGeometryGroupWrapper::~NativeGeometryGroupWrapper() {
    if (!is_destroyed) this->geometry_group->destroy();
}

void NativeGeometryGroupWrapper::set_acceleration(NativeAccelerationWrapper* acceleration) {
    this->geometry_group->setAcceleration(acceleration->get_native());
}

void NativeGeometryGroupWrapper::set_child_count(unsigned int count) {
    this->geometry_group->setChildCount(count);
}

unsigned int NativeGeometryGroupWrapper::get_child_count() {
    return this->geometry_group->getChildCount();
}

void NativeGeometryGroupWrapper::set_child_geometry_instance(unsigned int index, NativeGeometryInstanceWrapper* geometry_instance) {
    this->geometry_group->setChild(index, geometry_instance->get_native());
}

void NativeGeometryGroupWrapper::remove_child(unsigned int index) {
    this->geometry_group->removeChild(index);
}

optix::GeometryGroup NativeGeometryGroupWrapper::get_native() {
    return this->geometry_group;
}

void NativeGeometryGroupWrapper::boost_python_expose() {
    boost::python::class_<NativeGeometryGroupWrapper, boost::python::bases<NativeDestroyableWrapper> >(
                "NativeGeometryGroupWrapper",
                "Wraps optix::GeometryGroup class",
                boost::python::no_init)

            .def("set_acceleration", &NativeGeometryGroupWrapper::set_acceleration)
            .def("set_child_count", &NativeGeometryGroupWrapper::set_child_count)
            .def("get_child_count", &NativeGeometryGroupWrapper::get_child_count)
            .def("set_child_geometry_instance", &NativeGeometryGroupWrapper::set_child_geometry_instance)
            .def("remove_child", &NativeGeometryGroupWrapper::remove_child);
}
