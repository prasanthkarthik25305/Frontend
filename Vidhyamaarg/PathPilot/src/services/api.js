/**
 * API Service
 * 
 * This module handles all API communication between the frontend and backend.
 * It provides a centralized way to make HTTP requests with proper error handling,
 * authentication, and response processing.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * API Client class for handling HTTP requests
 */
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Get authentication token from localStorage
   * @returns {string|null} Auth token or null
   */
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Set authentication token in localStorage
   * @param {string} token - JWT token
   */
  setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  /**
   * Remove authentication token from localStorage
   */
  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  /**
   * Get default headers for requests
   * @param {boolean} includeAuth - Whether to include auth token
   * @returns {Object} Headers object
   */
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.auth !== false),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} data - Request body data
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create API client instance
const apiClient = new ApiClient();

/**
 * Authentication API methods
 */
export const authAPI = {
  /**
   * User login
   * @param {Object} credentials - Email and password
   * @returns {Promise<Object>} Login response with token and user data
   */
  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }
    return response;
  },

  /**
   * User registration
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registration response
   */
  async signup(userData) {
    const response = await apiClient.post('/auth/signup', userData);
    if (response.token) {
      apiClient.setAuthToken(response.token);
    }
    return response;
  },

  /**
   * Password reset request
   * @param {string} email - User email
   * @returns {Promise<Object>} Reset response
   */
  async forgotPassword(email) {
    return apiClient.post('/auth/forgot-password', { email });
  },

  /**
   * Logout user
   */
  logout() {
    apiClient.removeAuthToken();
    localStorage.removeItem('user');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return !!apiClient.getAuthToken();
  }
};

/**
 * Hackathon API methods
 */
export const hackathonAPI = {
  /**
   * Get all hackathons with optional filtering
   * @param {Object} filters - Search filters
   * @returns {Promise<Object>} Hackathons data
   */
  async getHackathons(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const endpoint = `/hackathons${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get(endpoint, { auth: false });
  },

  /**
   * Get hackathon by ID
   * @param {string} id - Hackathon ID
   * @returns {Promise<Object>} Hackathon data
   */
  async getHackathonById(id) {
    return apiClient.get(`/hackathons/${id}`, { auth: false });
  }
};

/**
 * User Profile API methods
 */
export const profileAPI = {
  /**
   * Get user profile
   * @returns {Promise<Object>} User profile data
   */
  async getProfile() {
    return apiClient.get('/profile');
  },

  /**
   * Update user profile
   * @param {Object} profileData - Profile update data
   * @returns {Promise<Object>} Updated profile
   */
  async updateProfile(profileData) {
    return apiClient.put('/profile', profileData);
  },

  /**
   * Update user preferences
   * @param {Object} preferences - User preferences
   * @returns {Promise<Object>} Updated preferences
   */
  async updatePreferences(preferences) {
    return apiClient.put('/profile/preferences', preferences);
  }
};

/**
 * Dashboard API methods
 */
export const dashboardAPI = {
  /**
   * Get dashboard data
   * @returns {Promise<Object>} Dashboard data
   */
  async getDashboardData() {
    return apiClient.get('/dashboard');
  }
};

/**
 * Health check API
 */
export const healthAPI = {
  /**
   * Check server health
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    return apiClient.get('/health', { auth: false });
  }
};

// Export the API client for direct use if needed
export default apiClient;