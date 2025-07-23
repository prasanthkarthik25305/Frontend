import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create context for authentication
const AuthContext = createContext();

/**
 * AuthProvider component
 * Provides authentication state and functions to the application
 */
export function AuthProvider({ children }) {
  // State for current user and loading state
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('pathpilot_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('pathpilot_user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Login function
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} - User object or error
   */
  const login = async (email, password) => {
    // For demonstration purposes, we'll use mock users
    const mockUsers = [
      { id: 1, name: 'Admin User', email: 'admin@pathpilot.com', role: 'admin', profileImage: null },
      { id: 2, name: 'Student User', email: 'student@pathpilot.com', role: 'student', profileImage: null }
    ];

    // In a real app, this would be an API call to validate credentials
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email exists in mock users (case-insensitive)
        const user = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
        
        if (user && password === 'password') { // Simple password check
          // Store user in state and localStorage
          setCurrentUser(user);
          localStorage.setItem('pathpilot_user', JSON.stringify(user));
          toast.success(`Welcome back, ${user.name}!`);
          resolve(user);
        } else {
          toast.error('Invalid email or password');
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // Simulate network delay
    });
  };

  /**
   * Signup function
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - Newly created user object or error
   */
  const signup = async (userData) => {
    // In a real app, this would be an API call to create a new user
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Create a new user object
          const newUser = {
            id: Date.now(), // Simple ID generation
            name: userData.name,
            email: userData.email,
            role: userData.role || 'student', // Default role is student
            profileImage: null
          };
          
          // Store user in state and localStorage
          setCurrentUser(newUser);
          localStorage.setItem('pathpilot_user', JSON.stringify(newUser));
          
          toast.success('Account created successfully!');
          resolve(newUser);
        } catch (error) {
          toast.error('Error creating account');
          reject(error);
        }
      }, 1000); // Simulate network delay
    });
  };

  /**
   * Logout function
   */
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pathpilot_user');
    toast.info('You have been logged out');
  };

  /**
   * Password reset request function
   * @param {string} email - User's email for password reset
   * @returns {Promise<boolean>} - Success status
   */
  const resetPassword = async (email) => {
    // In a real app, this would trigger a password reset email
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success(`Password reset link sent to ${email}`);
        resolve(true);
      }, 1000); // Simulate network delay
    });
  };

  /**
   * Update user profile function
   * @param {Object} profileData - Updated user profile data
   * @returns {Promise<Object>} - Updated user object
   */
  const updateProfile = async (profileData) => {
    // In a real app, this would be an API call to update user data
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update only provided fields
        const updatedUser = {
          ...currentUser,
          ...profileData
        };
        
        // Store updated user in state and localStorage
        setCurrentUser(updatedUser);
        localStorage.setItem('pathpilot_user', JSON.stringify(updatedUser));
        
        toast.success('Profile updated successfully');
        resolve(updatedUser);
      }, 1000); // Simulate network delay
    });
  };

  /**
   * Check if user has admin role
   * @returns {boolean} - True if user is admin
   */
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };

  // Context value to be provided
  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateProfile,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 * @returns {Object} - Authentication context value
 */
export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;