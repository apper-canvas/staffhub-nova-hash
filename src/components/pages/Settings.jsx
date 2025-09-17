import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    companyName: "StaffHub Company",
    companyEmail: "hr@staffhub.com",
    companyPhone: "+1 (555) 123-4567",
    address: "123 Business St, City, State 12345",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    currency: "USD"
  });

  const handleSettingChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const settingsTabs = [
    { id: "general", label: "General", icon: "Settings" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "security", label: "Security", icon: "Shield" },
    { id: "integration", label: "Integrations", icon: "Zap" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600">Manage your application preferences and configuration</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-4">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-primary-100 text-primary-700"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <ApperIcon name={tab.icon} className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            {activeTab === "general" && (
              <>
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">General Settings</h3>
                  <p className="text-slate-600 text-sm mt-1">Basic company and application settings</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      label="Company Name"
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => handleSettingChange("companyName", e.target.value)}
                    />
                    <FormField
                      label="Company Email"
                      id="companyEmail"
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => handleSettingChange("companyEmail", e.target.value)}
                    />
                    <FormField
                      label="Company Phone"
                      id="companyPhone"
                      value={settings.companyPhone}
                      onChange={(e) => handleSettingChange("companyPhone", e.target.value)}
                    />
                    <div className="space-y-2">
                      <label htmlFor="timezone" className="block text-sm font-medium text-slate-700">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange("timezone", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </select>
                    </div>
                  </div>

                  <FormField
                    label="Company Address"
                    id="address"
                    value={settings.address}
                    onChange={(e) => handleSettingChange("address", e.target.value)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="dateFormat" className="block text-sm font-medium text-slate-700">
                        Date Format
                      </label>
                      <select
                        id="dateFormat"
                        value={settings.dateFormat}
                        onChange={(e) => handleSettingChange("dateFormat", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="currency" className="block text-sm font-medium text-slate-700">
                        Currency
                      </label>
                      <select
                        id="currency"
                        value={settings.currency}
                        onChange={(e) => handleSettingChange("currency", e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <Button onClick={handleSaveSettings} variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "notifications" && (
              <>
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">Notification Settings</h3>
                  <p className="text-slate-600 text-sm mt-1">Configure how you receive notifications</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">New Employee Added</h4>
                        <p className="text-sm text-slate-500">Get notified when a new employee is added</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Employee Status Changes</h4>
                        <p className="text-sm text-slate-500">Notifications for status updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Department Changes</h4>
                        <p className="text-sm text-slate-500">Updates about department modifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Weekly Reports</h4>
                        <p className="text-sm text-slate-500">Receive weekly summary reports</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <Button onClick={handleSaveSettings} variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <>
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">Security Settings</h3>
                  <p className="text-slate-600 text-sm mt-1">Manage security and access preferences</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <ApperIcon name="Shield" className="h-5 w-5 text-yellow-600 mr-2" />
                      <h4 className="text-sm font-medium text-yellow-800">Security Features</h4>
                    </div>
                    <p className="text-sm text-yellow-700 mt-1">
                      Advanced security features are available in the enterprise version.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Session Timeout</h4>
                        <p className="text-sm text-slate-500">Automatically log out inactive users</p>
                      </div>
                      <select className="px-3 py-1 border border-slate-300 rounded-md text-sm">
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="240">4 hours</option>
                        <option value="480">8 hours</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-slate-900">Data Backup</h4>
                        <p className="text-sm text-slate-500">Regular data backup frequency</p>
                      </div>
                      <select className="px-3 py-1 border border-slate-300 rounded-md text-sm">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-200">
                    <Button onClick={handleSaveSettings} variant="primary">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "integration" && (
              <>
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-900">Integrations</h3>
                  <p className="text-slate-600 text-sm mt-1">Connect with third-party services</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <ApperIcon name="Mail" className="h-4 w-4 text-blue-600" />
                          </div>
                          <h4 className="font-medium text-slate-900">Email Service</h4>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Connected
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-3">Send notifications and reports via email</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Configure
                      </Button>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <ApperIcon name="Calendar" className="h-4 w-4 text-green-600" />
                          </div>
                          <h4 className="font-medium text-slate-900">Calendar</h4>
                        </div>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                          Not Connected
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-3">Sync employee schedules and events</p>
                      <Button variant="primary" size="sm" className="w-full">
                        Connect
                      </Button>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <ApperIcon name="MessageSquare" className="h-4 w-4 text-purple-600" />
                          </div>
                          <h4 className="font-medium text-slate-900">Slack</h4>
                        </div>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                          Not Connected
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-3">Send notifications to Slack channels</p>
                      <Button variant="primary" size="sm" className="w-full">
                        Connect
                      </Button>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <ApperIcon name="Database" className="h-4 w-4 text-orange-600" />
                          </div>
                          <h4 className="font-medium text-slate-900">Export Tools</h4>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Available
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mb-3">Export data to various formats</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Configure
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;