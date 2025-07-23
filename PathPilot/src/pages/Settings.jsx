import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Settings page component
 * Allows users to customize app settings, account preferences, and notifications
 */
function Settings() {
  // Get theme context
  const { theme, toggleTheme, fontSize, changeFontSize } = useTheme();
  
  // Get user data from localStorage
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    role: localStorage.getItem('userRole') || 'student',
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: theme === 'dark',
    language: 'english',
    fontSizePreference: fontSize,
    calendarSync: true,
    autoSave: true,
  });
  
  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('pathpilot-settings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(prev => ({
        ...prev,
        ...parsedSettings,
        darkMode: theme === 'dark', // Sync with theme context
        fontSizePreference: fontSize, // Sync with theme context
      }));
    }
  }, [theme, fontSize]);
  
  // Handle settings change
  const handleSettingChange = (settingName, value) => {
    setSettings(prev => {
      const newSettings = {
        ...prev,
        [settingName]: value,
      };
      
      // Save settings to localStorage
      localStorage.setItem('pathpilot-settings', JSON.stringify(newSettings));
      
      // Special handling for theme and font size
      if (settingName === 'darkMode') {
        toggleTheme();
      }
      
      if (settingName === 'fontSizePreference') {
        changeFontSize(value);
      }
      
      return newSettings;
    });
    
    // Show success toast
    toast.success(`Setting updated successfully`);
  };
  
  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    
    // Save user data to localStorage
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    
    toast.success('Profile updated successfully');
  };
  
  // Handle account deletion
  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    
    if (confirmDelete) {
      // In production, this would make an API call to delete the user account
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('pathpilot-settings');
      
      // Redirect to home page (this will happen on next render)
      window.location.href = '/';
      
      toast.success('Account deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Settings
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar navigation */}
          <div className="md:col-span-1">
            <nav className="space-y-1 sticky top-4">
              <a href="#profile" className="block px-4 py-2 bg-blue-50 dark:bg-gray-700 rounded-md font-medium text-blue-600 dark:text-blue-300">
                Profile Settings
              </a>
              <a href="#appearance" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300">
                Appearance
              </a>
              <a href="#notifications" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300">
                Notifications
              </a>
              <a href="#integrations" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300">
                Integrations
              </a>
              <a href="#account" className="block px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300">
                Account Management
              </a>
            </nav>
          </div>
          
          {/* Settings content */}
          <div className="md:col-span-2 space-y-8">
            {/* Profile Settings */}
            <section id="profile" className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    disabled
                    className="w-full px-4 py-2 border bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-300 rounded-lg cursor-not-allowed"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Profile
                </button>
              </form>
            </section>
            
            {/* Appearance Settings */}
            <section id="appearance" className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Appearance</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Theme</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleSettingChange('darkMode', false)}
                    className={`px-4 py-2 rounded-lg border ${
                      !settings.darkMode ? 'bg-blue-100 border-blue-500 text-blue-600' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    } transition-colors`}
                  >
                    Light Mode
                  </button>
                  <button
                    onClick={() => handleSettingChange('darkMode', true)}
                    className={`px-4 py-2 rounded-lg border ${
                      settings.darkMode ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-300' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    } transition-colors`}
                  >
                    Dark Mode
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Font Size</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleSettingChange('fontSizePreference', 'small')}
                    className={`px-4 py-2 rounded-lg border ${
                      settings.fontSizePreference === 'small' ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-300' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    } transition-colors`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => handleSettingChange('fontSizePreference', 'normal')}
                    className={`px-4 py-2 rounded-lg border ${
                      settings.fontSizePreference === 'normal' ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-300' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    } transition-colors`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => handleSettingChange('fontSizePreference', 'large')}
                    className={`px-4 py-2 rounded-lg border ${
                      settings.fontSizePreference === 'large' ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-300' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    } transition-colors`}
                  >
                    Large
                  </button>
                  <button
                    onClick={() => handleSettingChange('fontSizePreference', 'x-large')}
                    className={`px-4 py-2 rounded-lg border ${
                      settings.fontSizePreference === 'x-large' ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-600 dark:text-blue-300' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    } transition-colors`}
                  >
                    Extra Large
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This setting helps make text more readable based on your preferences.
                </p>
              </div>
            </section>
            
            {/* Notification Settings */}
            <section id="notifications" className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive emails about important updates and events
                    </p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="emailNotifications"
                      className={`block h-6 w-12 rounded-full transition-colors cursor-pointer ${
                        settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform ${
                          settings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      id="pushNotifications"
                      checked={settings.pushNotifications}
                      onChange={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="pushNotifications"
                      className={`block h-6 w-12 rounded-full transition-colors cursor-pointer ${
                        settings.pushNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform ${
                          settings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Integrations Settings */}
            <section id="integrations" className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Integrations</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Calendar Sync</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sync events with your calendar application
                    </p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      id="calendarSync"
                      checked={settings.calendarSync}
                      onChange={() => handleSettingChange('calendarSync', !settings.calendarSync)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="calendarSync"
                      className={`block h-6 w-12 rounded-full transition-colors cursor-pointer ${
                        settings.calendarSync ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform ${
                          settings.calendarSync ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-Save Progress</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically save your learning progress
                    </p>
                  </div>
                  <div className="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      id="autoSave"
                      checked={settings.autoSave}
                      onChange={() => handleSettingChange('autoSave', !settings.autoSave)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="autoSave"
                      className={`block h-6 w-12 rounded-full transition-colors cursor-pointer ${
                        settings.autoSave ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform ${
                          settings.autoSave ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Account Management */}
            <section id="account" className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Account Management</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <button 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    onClick={() => toast.info('Password change functionality would be implemented in production')}
                  >
                    Change Password
                  </button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Export Your Data</h3>
                  <button 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    onClick={() => toast.info('Data export functionality would be implemented in production')}
                  >
                    Export Data
                  </button>
                </div>
                
                <div>
                  <h3 className="font-medium text-red-600 dark:text-red-400 mb-2">Delete Account</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    This action will permanently delete your account and all associated data.
                  </p>
                  <button 
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    onClick={handleDeleteAccount}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;