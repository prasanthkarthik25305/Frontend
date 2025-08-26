/**
 * Validation Utilities
 * 
 * This module provides validation functions for API inputs
 * to ensure data integrity and security.
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter'
    };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }

  if (!/(?=.*\d)/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }

  return {
    isValid: true,
    message: 'Password is valid'
  };
};

/**
 * Validate user registration data
 * @param {Object} userData - User data to validate
 * @returns {Object} Validation result
 */
const validateUserRegistration = (userData) => {
  const { email, password, firstName, lastName } = userData;
  const errors = [];

  if (!firstName || firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }

  if (!lastName || lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }

  if (!email || !isValidEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.push(passwordValidation.message);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate profile update data
 * @param {Object} profileData - Profile data to validate
 * @returns {Object} Validation result
 */
const validateProfileUpdate = (profileData) => {
  const { firstName, lastName, bio, skills } = profileData;
  const errors = [];

  if (firstName && firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }

  if (lastName && lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }

  if (bio && bio.length > 500) {
    errors.push('Bio must be less than 500 characters');
  }

  if (skills && !Array.isArray(skills)) {
    errors.push('Skills must be an array');
  }

  if (skills && skills.length > 20) {
    errors.push('Maximum 20 skills allowed');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize string input
 * @param {string} input - String to sanitize
 * @returns {string} Sanitized string
 */
const sanitizeString = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Validate hackathon query parameters
 * @param {Object} query - Query parameters
 * @returns {Object} Validation result
 */
const validateHackathonQuery = (query) => {
  const { category, difficulty, location, limit, offset } = query;
  const errors = [];

  const validDifficulties = ['beginner', 'intermediate', 'advanced'];
  if (difficulty && !validDifficulties.includes(difficulty.toLowerCase())) {
    errors.push('Difficulty must be one of: beginner, intermediate, advanced');
  }

  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    errors.push('Limit must be a number between 1 and 100');
  }

  if (offset && (isNaN(offset) || parseInt(offset) < 0)) {
    errors.push('Offset must be a non-negative number');
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      category: category ? sanitizeString(category) : undefined,
      difficulty: difficulty ? difficulty.toLowerCase() : undefined,
      location: location ? sanitizeString(location) : undefined,
      limit: limit ? parseInt(limit) : 20,
      offset: offset ? parseInt(offset) : 0
    }
  };
};

module.exports = {
  isValidEmail,
  validatePassword,
  validateUserRegistration,
  validateProfileUpdate,
  sanitizeString,
  validateHackathonQuery
};