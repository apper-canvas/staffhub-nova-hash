import React from "react";
import NavigationItem from "@/components/molecules/NavigationItem";

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    { to: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { to: "/employees", icon: "Users", label: "Employees", count: 47 },
    { to: "/departments", icon: "Building", label: "Departments", count: 8 },
    { to: "/reports", icon: "BarChart3", label: "Reports" },
    { to: "/settings", icon: "Settings", label: "Settings" }
  ];

  // Desktop sidebar (static)
  const DesktopSidebar = () => (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-screen">
      <div className="flex-1 py-6">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              count={item.count}
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
          <h4 className="font-semibold text-primary-900 text-sm mb-1">Need Help?</h4>
          <p className="text-xs text-primary-700 mb-3">Contact support for assistance</p>
          <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
            Get Support →
          </button>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar (overlay)
  const MobileSidebar = () => (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1 py-6">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                count={item.count}
              />
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-200">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
            <h4 className="font-semibold text-primary-900 text-sm mb-1">Need Help?</h4>
            <p className="text-xs text-primary-700 mb-3">Contact support for assistance</p>
            <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
              Get Support →
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;