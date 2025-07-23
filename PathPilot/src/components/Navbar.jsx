import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Navbar component for the PathPilot application
 * Provides navigation, user information, theme controls
 * 
 * @param {Object} props Component props
 * @param {Function} props.onLogout Function to handle user logout
 */
function Navbar({ onLogout }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { theme, toggleTheme, fontSize, changeFontSize } = useTheme();

  // Get user information from localStorage
  useEffect(() => {
    const role = localStorage.getItem('userRole') || '';
    const name = localStorage.getItem('userName') || 'User';
    setUserRole(role);
    setUserName(name);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle font size dropdown
  const toggleFontDropdown = () => {
    setIsFontDropdownOpen((prev) => !prev);
    setIsProfileDropdownOpen(false); // Close profile dropdown if open
  };

  // Toggle user profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
    setIsFontDropdownOpen(false); // Close font dropdown if open
  };

  // Check if the current route matches the given path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`bg-gradient-to-r ${theme === 'dark' ? 'from-gray-900 to-gray-800' : 'from-blue-600 to-indigo-600'} shadow-md transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/dashboard" className="flex items-center">
                <span className="text-white font-bold text-xl">PathPilot</span>
              </Link>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <NavLink to="/dashboard" isActive={isActive('/dashboard')}>Dashboard</NavLink>
              <NavLink to="/career-wizard" isActive={isActive('/career-wizard')}>Career Wizard</NavLink>
              <NavLink to="/resources" isActive={isActive('/resources')}>Resources</NavLink>
              <NavLink to="/calendar" isActive={isActive('/calendar')}>Calendar</NavLink>
              <NavLink to="/discover" isActive={isActive('/discover')}>Discover</NavLink>
              <NavLink to="/hackathon-finder" isActive={isActive('/hackathon-finder')}>Hackathons</NavLink>
              
              {/* Admin-only links */}
              {userRole === 'admin' && (
                <NavLink to="/admin/dashboard" isActive={isActive('/admin/dashboard')}>Admin</NavLink>
              )}
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 mr-3"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            {/* Font size dropdown */}
            <div className="relative mr-3">
              <button
                className="p-1 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
                title="Adjust font size"
                onClick={toggleFontDropdown}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
              
              {/* Font size options dropdown */}
              {isFontDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <button
                    onClick={() => { changeFontSize('small'); setIsFontDropdownOpen(false); }}
                    className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${fontSize === 'small' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                  >
                    Small Text
                  </button>
                  <button
                    onClick={() => { changeFontSize('normal'); setIsFontDropdownOpen(false); }}
                    className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${fontSize === 'normal' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                  >
                    Normal Text
                  </button>
                  <button
                    onClick={() => { changeFontSize('large'); setIsFontDropdownOpen(false); }}
                    className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${fontSize === 'large' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                  >
                    Large Text
                  </button>
                  <button
                    onClick={() => { changeFontSize('x-large'); setIsFontDropdownOpen(false); }}
                    className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${fontSize === 'x-large' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                  >
                    Extra Large Text
                  </button>
                </div>
              )}
            </div>

            {/* User profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button
                  className="flex items-center max-w-xs bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-white text-sm"
                  id="user-menu"
                  aria-expanded="false"
                  onClick={toggleProfileDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                    {userName.charAt(0).toUpperCase() || 'U'}
                  </div>
                </button>
              </div>
              
              {/* User dropdown menu */}
              <div
                className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ease-out duration-200 transform ${
                  isProfileDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  Signed in as <span className="font-semibold text-gray-700 dark:text-white">{userName}</span>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</div>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  Settings
                </Link>
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <MobileNavLink to="/dashboard" isActive={isActive('/dashboard')}>Dashboard</MobileNavLink>
          <MobileNavLink to="/career-wizard" isActive={isActive('/career-wizard')}>Career Wizard</MobileNavLink>
          <MobileNavLink to="/resources" isActive={isActive('/resources')}>Resources</MobileNavLink>
          <MobileNavLink to="/calendar" isActive={isActive('/calendar')}>Calendar</MobileNavLink>
          <MobileNavLink to="/discover" isActive={isActive('/discover')}>Discover</MobileNavLink>
          <MobileNavLink to="/hackathon-finder" isActive={isActive('/hackathon-finder')}>Hackathons</MobileNavLink>
          
          {userRole === 'admin' && (
            <MobileNavLink to="/admin/dashboard" isActive={isActive('/admin/dashboard')}>Admin</MobileNavLink>
          )}
        </div>
        
        {/* Mobile menu user section */}
        <div className="pt-4 pb-3 border-t border-blue-800 dark:border-gray-700">
          <div className="px-4 flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-800 flex items-center justify-center text-white font-semibold">
                {userName.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-white">{userName}</div>
              <div className="text-sm font-medium text-blue-300 dark:text-gray-400">Role: {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</div>
            </div>
            <button 
              onClick={toggleTheme}
              className="ml-auto p-1 rounded-full text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 dark:hover:bg-gray-700"
            >
              Your Profile
            </Link>
            <Link
              to="/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 dark:hover:bg-gray-700"
            >
              Settings
            </Link>
            <button
              onClick={onLogout}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-red-700 dark:hover:bg-red-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/**
 * Desktop navigation link component
 */
function NavLink({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-blue-700 dark:bg-gray-900 text-white'
          : 'text-white hover:bg-blue-500 dark:hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
}

/**
 * Mobile navigation link component
 */
function MobileNavLink({ to, isActive, children }) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? 'bg-blue-700 dark:bg-gray-900 text-white'
          : 'text-white hover:bg-blue-500 dark:hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;