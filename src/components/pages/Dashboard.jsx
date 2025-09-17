import React, { useState, useEffect } from "react";
import StatCard from "@/components/molecules/StatCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { employeeService } from "@/services/api/employeeService";
import { departmentService } from "@/services/api/departmentService";
import { format, isAfter, subDays } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [employeesData, departmentsData] = await Promise.all([
        employeeService.getAll(),
        departmentService.getAll()
      ]);
      
      setEmployees(employeesData);
      setDepartments(departmentsData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const activeEmployees = employees.filter(emp => emp.status === "active").length;
  const pendingEmployees = employees.filter(emp => emp.status === "pending").length;
  const recentHires = employees.filter(emp => 
    isAfter(new Date(emp.hireDate), subDays(new Date(), 30))
  ).length;

  const recentActivities = [
    {
      type: "hire",
      message: "Sarah Johnson joined Marketing Department",
      time: "2 hours ago",
      icon: "UserPlus"
    },
    {
      type: "update",
      message: "Mike Davis promoted to Senior Developer",
      time: "4 hours ago",
      icon: "TrendingUp"
    },
    {
      type: "department",
      message: "New IT Department created",
      time: "1 day ago",
      icon: "Building"
    },
    {
      type: "hire",
      message: "Alex Chen joined Engineering Team",
      time: "2 days ago",
      icon: "UserPlus"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's what's happening with your team.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={employees.length}
          change="+2.5%"
          icon="Users"
          trend="up"
        />
        <StatCard
          title="Active Employees"
          value={activeEmployees}
          change="+1.2%"
          icon="UserCheck"
          trend="up"
        />
        <StatCard
          title="Departments"
          value={departments.length}
          change="0%"
          icon="Building"
          trend="up"
        />
        <StatCard
          title="Recent Hires"
          value={recentHires}
          change="+12%"
          icon="UserPlus"
          trend="up"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ApperIcon name={activity.icon} className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">{activity.message}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Department Overview */}
        <div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Departments</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {departments.slice(0, 5).map((department) => (
                  <div key={department.Id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Building" className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{department.name}</p>
                        <p className="text-xs text-slate-500">{department.employeeCount} employees</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary-900">Quick Actions</h3>
            <p className="text-primary-700 text-sm">Streamline your HR tasks</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200 hover:scale-105">
              Add Employee
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-md transition-all duration-200 hover:scale-105">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;