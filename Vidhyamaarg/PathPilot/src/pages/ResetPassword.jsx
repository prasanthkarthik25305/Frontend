import React, { useState, useEffect } from 'react';
import { useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import apiClient from '../services/api';

const ResetPassword = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Redirect if no token
  if (!token) {
    return <Navigate to="/forgot-password" replace />;
  }

  useEffect(() => {
    validateToken();
    fetchPasswordRequirements();
  }, [token]);

  useEffect(() => {
    if (formData.newPassword) {
      validatePasswordStrength();
    } else {
      setPasswordStrength(null);
    }
  }, [formData.newPassword]);

  const validateToken = async () => {
    try {
      const response = await apiClient.get(`/auth/verify-reset-token/${token}`, { auth: false });
      if (response.valid) {
        setTokenValid(true);
        setUserEmail(response.email);
      } else {
        toast.error(response.message);
        navigate('/forgot-password');
      }
    } catch (error) {
      toast.error(error.message || 'Invalid or expired reset link');
      navigate('/forgot-password');
    } finally {
      setIsValidatingToken(false);
    }
  };

  const fetchPasswordRequirements = async () => {
    try {
      const response = await apiClient.get('/auth/password-requirements', { auth: false });
      setPasswordRequirements(response.requirements);
    } catch (error) {
      console.error('Failed to fetch password requirements:', error);
    }
  };

  const validatePasswordStrength = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/validate-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          password: formData.newPassword,
          userInfo: { email: userEmail }
        })
      });
      const data = await response.json();
      setPasswordStrength(data);
    } catch (error) {
      console.error('Password validation error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordStrength && !passwordStrength.isValid) {
      toast.error('Password does not meet security requirements');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.post('/auth/reset-password', {
        token,
        newPassword: formData.newPassword
      }, { auth: false });

      toast.success(response.message);
      navigate('/login', { replace: true });
    } catch (error) {
      if (error.message.includes('security requirements')) {
        toast.error('Password does not meet security requirements');
      } else {
        toast.error(error.message || 'Failed to reset password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'Very Strong': return 'text-green-600';
      case 'Strong': return 'text-green-500';
      case 'Medium': return 'text-yellow-500';
      case 'Weak': return 'text-orange-500';
      case 'Very Weak': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStrengthBarColor = (strength) => {
    switch (strength) {
      case 'Very Strong': return 'bg-green-500';
      case 'Strong': return 'bg-green-400';
      case 'Medium': return 'bg-yellow-400';
      case 'Weak': return 'bg-orange-400';
      case 'Very Weak': return 'bg-red-400';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthBarWidth = (score) => {
    return `${Math.max(score, 5)}%`;
  };

  if (isValidatingToken) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Validating reset link...
          </p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center">
            <h1 className={`text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              PathPilot
            </h1>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Your Learning Journey Starts Here
            </p>
          </div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Reset Your Password
          </h2>
          <p className={`mt-2 text-center text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Enter a new secure password for {userEmail}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="newPassword" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className={`font-medium ${getStrengthColor(passwordStrength.strength)}`}>
                      {passwordStrength.strength}
                    </span>
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {passwordStrength.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthBarColor(passwordStrength.strength)}`}
                      style={{ width: getStrengthBarWidth(passwordStrength.score) }}
                    ></div>
                  </div>
                  {passwordStrength.errors?.length > 0 && (
                    <div className="mt-2 text-sm text-red-600">
                      {passwordStrength.errors.map((error, index) => (
                        <div key={index}>• {error}</div>
                      ))}
                    </div>
                  )}
                  {passwordStrength.suggestions?.length > 0 && (
                    <div className="mt-2 text-sm text-blue-600">
                      <div className="font-medium">Suggestions:</div>
                      {passwordStrength.suggestions.map((suggestion, index) => (
                        <div key={index}>• {suggestion}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
              )}
            </div>
          </div>

          {/* Password Requirements */}
          {passwordRequirements.length > 0 && (
            <div className={`rounded-md border p-4 ${
              theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
            }`}>
              <h4 className={`text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password Requirements:
              </h4>
              <ul className={`text-xs space-y-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {passwordRequirements.map((req, index) => (
                  <li key={index}>• {req}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || (passwordStrength && !passwordStrength.isValid)}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className={`text-sm font-medium text-blue-600 hover:text-blue-500`}
            >
              ← Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;