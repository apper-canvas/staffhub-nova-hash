import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";

const NavigationItem = ({ to, icon, label, count }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isActive
            ? "text-primary-600 bg-primary-50 border-r-2 border-primary-600"
            : "text-slate-600 hover:text-primary-600 hover:bg-primary-50"
        }`
      }
    >
      <ApperIcon name={icon} className="h-5 w-5" />
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span className="px-2 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
          {count}
        </span>
      )}
    </NavLink>
  );
};

export default NavigationItem;