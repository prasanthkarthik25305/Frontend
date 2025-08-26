import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Login page component
 * Handles user authentication for existing users
 */
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API call for now - would connect to Supabase in production
      setTimeout(() => {
        // Mock authentication logic
        if (formData.email === 'admin@pathpilot.com' && formData.password === 'admin123') {
          // Store user role in localStorage
          localStorage.setItem('userRole', 'admin');
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('isAuthenticated', 'true');
          
          toast.success('Welcome back, Admin!');
          navigate('/dashboard');
        } else if (formData.email === 'student@pathpilot.com' && formData.password === 'student123') {
          // Store user role in localStorage
          localStorage.setItem('userRole', 'student');
          localStorage.setItem('userEmail', formData.email);
          localStorage.setItem('isAuthenticated', 'true');
          
          toast.success('Welcome back! Ready to continue your journey?');
          navigate('/dashboard');
        } else {
          setError('Invalid email or password. Please try again.');
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to PathPilot
          </h2>
          <p className="mt-2 text-gray-600">
            Log in to continue your learning journey
          </p>
        </div>
        
        {/* Login form */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="mb-6">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            
            {/* Password field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-1">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            {/* Remember me checkbox */}
            <div className="flex items-center mb-6">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label 
                htmlFor="rememberMe" 
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>
          
          {/* Signup link */}
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account?</span>{' '}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </Link>
          </div>
          
          {/* Demo accounts */}
          <div className="mt-8 border-t pt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-blue-50 rounded">
                <p><strong>Admin:</strong> admin@pathpilot.com</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <p><strong>Student:</strong> student@pathpilot.com</p>
                <p><strong>Password:</strong> student123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;