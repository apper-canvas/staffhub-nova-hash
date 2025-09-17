import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { departmentService } from "@/services/api/departmentService";
import { employeeService } from "@/services/api/employeeService";
import { toast } from "react-toastify";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [departmentsData, employeesData] = await Promise.all([
        departmentService.getAll(),
        employeeService.getAll()
      ]);
      
      setDepartments(departmentsData);
      setEmployees(employeesData);
    } catch (err) {
      setError("Failed to load departments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getDepartmentEmployeeCount = (departmentName) => {
    return employees.filter(emp => emp.department === departmentName).length;
  };

  const getDepartmentManager = (managerId) => {
    const manager = employees.find(emp => emp.Id === managerId);
    return manager ? `${manager.firstName} ${manager.lastName}` : "Not assigned";
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Departments</h1>
          <p className="text-slate-600">Manage your organizational structure and team assignments</p>
        </div>
        <Button variant="primary">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      {departments.length === 0 ? (
        <Empty
          title="No departments found"
          description="Create your first department to organize your team structure."
          icon="Building"
          actionLabel="Add Department"
          onAction={() => toast.info("Department creation feature coming soon!")}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((department) => (
            <div
              key={department.Id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
                    <ApperIcon name="Building" className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{department.name}</h3>
                    <p className="text-sm text-slate-500">Department</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Employees</span>
                  <Badge variant="primary">
                    {getDepartmentEmployeeCount(department.name)}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Manager</span>
                  <span className="text-sm font-medium text-slate-900">
                    {getDepartmentManager(department.managerId)}
                  </span>
                </div>

                {department.budget && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Budget</span>
                    <span className="text-sm font-medium text-slate-900">
                      ${department.budget.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {department.description && (
                <div className="mb-4">
                  <p className="text-sm text-slate-600">{department.description}</p>
                </div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="ghost" size="sm">
                  <ApperIcon name="Edit2" className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <ApperIcon name="Trash2" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Department Statistics */}
      {departments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Department Overview</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  {departments.length}
                </div>
                <div className="text-sm text-slate-600">Total Departments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {employees.length}
                </div>
                <div className="text-sm text-slate-600">Total Employees</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-1">
                  {Math.round(employees.length / Math.max(departments.length, 1))}
                </div>
                <div className="text-sm text-slate-600">Avg per Department</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;