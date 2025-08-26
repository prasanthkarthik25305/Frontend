/**
 * Authentication Context
 * 
 * This context provides authentication state management across the application.
 * It handles user login, logout, and authentication state persistence.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize authentication state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const hasToken = authAPI.isAuthenticated();

        if (storedUser && hasToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        authAPI.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user
   * @param {Object} credentials - Email and password
   * @returns {Promise<boolean>} Success status
   */
  const login = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.token && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        
        toast.success('Login successful!');
        return true;
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   * @param {Object} userData - Registration data
   * @returns {Promise<boolean>} Success status
   */
  const signup = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.signup(userData);
      
      if (response.token && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.user));
        
        toast.success('Account created successfully!');
        return true;
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = () => {
    try {
      authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
    }
  };

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<boolean>} Success status
   */
  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
      await authAPI.forgotPassword(email);
      toast.success('Password reset instructions sent to your email');
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.message || 'Failed to send reset instructions');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update user data in context
   * @param {Object} userData - Updated user data
   */
  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;