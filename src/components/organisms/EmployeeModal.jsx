import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";

const EmployeeModal = ({ isOpen, onClose, employee, onSave, departments }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    departmentId: "",
    department: "",
    hireDate: "",
    salary: "",
    status: "active",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    emergencyContact: {
      name: "",
      relationship: "",
      phone: ""
    },
    notes: ""
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        position: employee.position || "",
        departmentId: employee.departmentId || "",
        department: employee.department || "",
        hireDate: employee.hireDate ? employee.hireDate.split("T")[0] : "",
        salary: employee.salary || "",
        status: employee.status || "active",
        address: employee.address || {
          street: "",
          city: "",
          state: "",
          zipCode: ""
        },
        emergencyContact: employee.emergencyContact || {
          name: "",
          relationship: "",
          phone: ""
        },
        notes: employee.notes || ""
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        departmentId: "",
        department: "",
        hireDate: "",
        salary: "",
        status: "active",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: ""
        },
        emergencyContact: {
          name: "",
          relationship: "",
          phone: ""
        },
        notes: ""
      });
    }
  }, [employee, isOpen]);

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      
      // Auto-populate department name when departmentId changes
      if (field === "departmentId") {
        const selectedDept = departments.find(dept => dept.Id.toString() === value);
        if (selectedDept) {
          setFormData(prev => ({
            ...prev,
            department: selectedDept.name
          }));
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <ApperIcon name="X" className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="First Name"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
              />
              <FormField
                label="Last Name"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
              />
              <FormField
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
              <FormField
                label="Phone"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          {/* Employment Information */}
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Employment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Position"
                id="position"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                required
              />
              <div className="space-y-2">
                <label htmlFor="department" className="block text-sm font-medium text-slate-700">
                  Department <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="department"
                  value={formData.departmentId}
                  onChange={(e) => handleChange("departmentId", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.Id} value={dept.Id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <FormField
                label="Hire Date"
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => handleChange("hireDate", e.target.value)}
                required
              />
              <FormField
                label="Salary"
                id="salary"
                type="number"
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
                placeholder="50000"
              />
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                  Status <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-lg font-medium text-slate-900 mb-4">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Contact Name"
                id="emergencyName"
                value={formData.emergencyContact.name}
                onChange={(e) => handleChange("emergencyContact.name", e.target.value)}
              />
              <FormField
                label="Relationship"
                id="emergencyRelationship"
                value={formData.emergencyContact.relationship}
                onChange={(e) => handleChange("emergencyContact.relationship", e.target.value)}
              />
              <FormField
                label="Contact Phone"
                id="emergencyPhone"
                value={formData.emergencyContact.phone}
                onChange={(e) => handleChange("emergencyContact.phone", e.target.value)}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
              Notes
            </label>
            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Additional notes about the employee..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-slate-200">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {employee ? "Update Employee" : "Add Employee"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;