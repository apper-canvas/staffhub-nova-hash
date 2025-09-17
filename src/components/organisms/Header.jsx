import React from "react";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";

const Header = ({ onMobileMenuToggle, searchValue, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
          >
            <ApperIcon name="Menu" className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Building2" className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
              StaffHub
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              placeholder="Search employees..."
              className="w-64"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="relative p-2 rounded-lg text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors">
              <ApperIcon name="Bell" className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-700">HR Manager</p>
                <p className="text-xs text-slate-500">hr@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;