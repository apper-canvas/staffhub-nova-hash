import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { employeeService } from "@/services/api/employeeService";
import { departmentService } from "@/services/api/departmentService";
import { format, subMonths, isAfter } from "date-fns";
import Chart from "react-apexcharts";

const Reports = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedReport, setSelectedReport] = useState("overview");

  const loadData = async () => {
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
      setError("Failed to load report data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  const getDepartmentData = () => {
    return departments.map(dept => ({
      name: dept.name,
      count: employees.filter(emp => emp.department === dept.name).length
    }));
  };

  const getStatusData = () => {
    const statuses = ["active", "inactive", "pending"];
    return statuses.map(status => ({
      name: status,
      count: employees.filter(emp => emp.status === status).length
    }));
  };

  const getHiringTrend = () => {
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthName = format(date, "MMM yyyy");
      const hires = employees.filter(emp => {
        const hireDate = new Date(emp.hireDate);
        return hireDate.getMonth() === date.getMonth() && hireDate.getFullYear() === date.getFullYear();
      }).length;
      last6Months.push({ month: monthName, hires });
    }
    return last6Months;
  };

  const departmentData = getDepartmentData();
  const statusData = getStatusData();
  const hiringTrend = getHiringTrend();

  const departmentChartOptions = {
    chart: {
      type: "donut",
      height: 350
    },
    labels: departmentData.map(d => d.name),
    colors: ["#2563eb", "#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"],
    legend: {
      position: "bottom"
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }]
  };

  const statusChartOptions = {
    chart: {
      type: "bar",
      height: 350
    },
    xaxis: {
      categories: statusData.map(s => s.name.charAt(0).toUpperCase() + s.name.slice(1))
    },
    colors: ["#10b981", "#ef4444", "#f59e0b"],
    dataLabels: {
      enabled: false
    }
  };

  const trendChartOptions = {
    chart: {
      type: "line",
      height: 350
    },
    xaxis: {
      categories: hiringTrend.map(h => h.month)
    },
    colors: ["#2563eb"],
    stroke: {
      curve: "smooth",
      width: 3
    },
    markers: {
      size: 5
    }
  };

  const reportSections = [
    { id: "overview", label: "Overview", icon: "BarChart3" },
    { id: "departments", label: "Departments", icon: "Building" },
    { id: "hiring", label: "Hiring Trends", icon: "TrendingUp" },
    { id: "export", label: "Export Data", icon: "Download" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600">Insights into your workforce and organizational metrics</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="secondary">
            <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="primary">
            <ApperIcon name="Download" className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {reportSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedReport(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedReport === section.id
                    ? "bg-primary-100 text-primary-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <ApperIcon name={section.icon} className="h-4 w-4" />
                <span>{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Report Content */}
      {selectedReport === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Key Metrics</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Total Employees</span>
                <span className="text-2xl font-bold text-slate-900">{employees.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Active Employees</span>
                <span className="text-2xl font-bold text-green-600">
                  {employees.filter(emp => emp.status === "active").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Departments</span>
                <span className="text-2xl font-bold text-primary-600">{departments.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Recent Hires (30 days)</span>
                <span className="text-2xl font-bold text-accent-600">
                  {employees.filter(emp => 
                    isAfter(new Date(emp.hireDate), subMonths(new Date(), 1))
                  ).length}
                </span>
              </div>
            </div>
          </div>

          {/* Employee Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Employee Status</h3>
            </div>
            <div className="p-6">
              <Chart
                options={statusChartOptions}
                series={[{
                  name: "Employees",
                  data: statusData.map(s => s.count)
                }]}
                type="bar"
                height={300}
              />
            </div>
          </div>
        </div>
      )}

      {selectedReport === "departments" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Distribution Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Department Distribution</h3>
            </div>
            <div className="p-6">
              <Chart
                options={departmentChartOptions}
                series={departmentData.map(d => d.count)}
                type="donut"
                height={350}
              />
            </div>
          </div>

          {/* Department Details */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">Department Details</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                      <span className="font-medium text-slate-900">{dept.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{dept.count}</span>
                      <span className="text-slate-500 text-sm ml-1">employees</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport === "hiring" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Hiring Trends (Last 6 Months)</h3>
          </div>
          <div className="p-6">
            <Chart
              options={trendChartOptions}
              series={[{
                name: "New Hires",
                data: hiringTrend.map(h => h.hires)
              }]}
              type="line"
              height={400}
            />
          </div>
        </div>
      )}

      {selectedReport === "export" && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Export Data</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-12">
                <ApperIcon name="Users" className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Employee List</div>
                  <div className="text-sm text-slate-500">Export all employee data</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <ApperIcon name="Building" className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Department Report</div>
                  <div className="text-sm text-slate-500">Department structure and metrics</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <ApperIcon name="BarChart3" className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Analytics Summary</div>
                  <div className="text-sm text-slate-500">Key metrics and insights</div>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <ApperIcon name="Calendar" className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">Custom Date Range</div>
                  <div className="text-sm text-slate-500">Select specific time period</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;