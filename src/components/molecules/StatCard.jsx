import React from "react";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ title, value, change, icon, trend = "up", className = "" }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border border-slate-200 card-hover ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
            <ApperIcon name={icon} className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-3xl font-bold text-slate-900 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {value}
            </p>
          </div>
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center">
          <ApperIcon 
            name={trend === "up" ? "ArrowUpRight" : "ArrowDownRight"} 
            className={`h-4 w-4 ${trend === "up" ? "text-green-600" : "text-red-600"}`}
          />
          <span className={`text-sm font-medium ml-1 ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
            {change}
          </span>
          <span className="text-sm text-slate-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;