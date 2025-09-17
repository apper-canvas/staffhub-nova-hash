import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { employeeService } from "@/services/api/employeeService";
import { format } from "date-fns";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadEmployee = async () => {
    try {
      setLoading(true);
      setError("");
      const employeeData = await employeeService.getById(parseInt(id));
      setEmployee(employeeData);
    } catch (err) {
      setError("Failed to load employee details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployee();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadEmployee} />;
  if (!employee) return <Error message="Employee not found" />;

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "active";
      case "inactive": return "inactive";
      case "pending": return "pending";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/employees")}
            className="p-2"
          >
            <ApperIcon name="ArrowLeft" className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {employee.firstName} {employee.lastName}
            </h1>
            <p className="text-slate-600">{employee.position} • {employee.department}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant={getStatusVariant(employee.status)}>
            {employee.status}
          </Badge>
          <Button variant="primary">
            <ApperIcon name="Edit2" className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {employee.firstName} {employee.lastName}
                  </h2>
                  <p className="text-slate-600">{employee.email}</p>
                  <p className="text-slate-600">{employee.phone}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    First Name
                  </label>
                  <p className="text-slate-900">{employee.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Last Name
                  </label>
                  <p className="text-slate-900">{employee.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <p className="text-slate-900">{employee.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <p className="text-slate-900">{employee.phone || "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Employment Information</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Position
                  </label>
                  <p className="text-slate-900">{employee.position}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Department
                  </label>
                  <p className="text-slate-900">{employee.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Hire Date
                  </label>
                  <p className="text-slate-900">
                    {format(new Date(employee.hireDate), "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Employment Status
                  </label>
                  <Badge variant={getStatusVariant(employee.status)} className="mt-1">
                    {employee.status}
                  </Badge>
                </div>
                {employee.salary && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Salary
                    </label>
                    <p className="text-slate-900">
                      ${employee.salary.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          {employee.emergencyContact && (employee.emergencyContact.name || employee.emergencyContact.phone) && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Emergency Contact</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Contact Name
                    </label>
                    <p className="text-slate-900">{employee.emergencyContact.name || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Relationship
                    </label>
                    <p className="text-slate-900">{employee.emergencyContact.relationship || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <p className="text-slate-900">{employee.emergencyContact.phone || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="Edit2" className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="FileText" className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ApperIcon name="Mail" className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Employment Stats */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-4">Employment Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-primary-700">Time at Company</span>
                <span className="font-semibold text-primary-900">
                  {Math.floor((new Date() - new Date(employee.hireDate)) / (1000 * 60 * 60 * 24 * 365))} years
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-700">Department</span>
                <span className="font-semibold text-primary-900">{employee.department}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-primary-700">Status</span>
                <Badge variant={getStatusVariant(employee.status)}>
                  {employee.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {employee.notes && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
          </div>
          <div className="p-6">
            <p className="text-slate-700 whitespace-pre-wrap">{employee.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;