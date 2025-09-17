import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import EmployeeTable from "@/components/organisms/EmployeeTable";
import EmployeeModal from "@/components/organisms/EmployeeModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { employeeService } from "@/services/api/employeeService";
import { departmentService } from "@/services/api/departmentService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [employeesData, departmentsData] = await Promise.all([
        employeeService.getAll(),
        departmentService.getAll()
      ]);
      
      setEmployees(employeesData);
      setDepartments(departmentsData);
      setFilteredEmployees(employeesData);
    } catch (err) {
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    let filtered = employees;

    if (searchTerm) {
      filtered = filtered.filter(employee =>
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(employee => employee.status === statusFilter);
    }

    if (departmentFilter !== "all") {
      filtered = filtered.filter(employee => employee.department === departmentFilter);
    }

    setFilteredEmployees(filtered);
  }, [employees, searchTerm, statusFilter, departmentFilter]);

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (employeeId) => {
    const employee = employees.find(emp => emp.Id === employeeId);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleViewEmployee = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const handleDeleteEmployee = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeService.delete(employeeId);
        setEmployees(prev => prev.filter(emp => emp.Id !== employeeId));
        toast.success("Employee deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete employee.");
      }
    }
  };

  const handleSaveEmployee = async (employeeData) => {
    try {
      if (selectedEmployee) {
        const updatedEmployee = await employeeService.update(selectedEmployee.Id, employeeData);
        setEmployees(prev => prev.map(emp => emp.Id === selectedEmployee.Id ? updatedEmployee : emp));
        toast.success("Employee updated successfully!");
      } else {
        const newEmployee = await employeeService.create(employeeData);
        setEmployees(prev => [...prev, newEmployee]);
        toast.success("Employee added successfully!");
      }
      setIsModalOpen(false);
      setSelectedEmployee(null);
    } catch (err) {
      toast.error("Failed to save employee.");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadEmployees} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
          <p className="text-slate-600">Manage your team members and their information</p>
        </div>
        <Button onClick={handleAddEmployee} variant="primary">
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees..."
          />
          
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.Id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <Button variant="secondary" className="flex items-center justify-center">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      {filteredEmployees.length === 0 ? (
        <Empty
          title="No employees found"
          description="No employees match your current filters or you haven't added any employees yet."
          icon="Users"
          actionLabel="Add Employee"
          onAction={handleAddEmployee}
        />
      ) : (
        <EmployeeTable
          employees={filteredEmployees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
          onView={handleViewEmployee}
        />
      )}

      {/* Employee Modal */}
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        departments={departments}
        onSave={handleSaveEmployee}
      />
    </div>
  );
};

export default Employees;