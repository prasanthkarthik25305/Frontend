/**
 * Password Validation Utilities
 * 
 * This module provides comprehensive password validation with strict security rules
 * to ensure user account security.
 */

/**
 * Password validation configuration
 */
const PASSWORD_CONFIG = {
  minLength: 12,
  maxLength: 128,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  minSpecialChars: 1,
  minNumbers: 1,
  maxRepeatingChars: 2,
  forbiddenPatterns: [
    'password',
    '123456',
    'qwerty',
    'admin',
    'login',
    'user',
    'pathpilot'
  ],
  forbiddenSequences: true // Prevents abc, 123, etc.
};

/**
 * Validate password strength according to strict security rules
 * @param {string} password - Password to validate
 * @param {Object} userInfo - User information to check against
 * @returns {Object} Validation result with detailed feedback
 */
export const validatePasswordStrength = (password, userInfo = {}) => {
  const errors = [];
  const warnings = [];
  const suggestions = [];

  // Basic length validation
  if (!password || password.length < PASSWORD_CONFIG.minLength) {
    errors.push(`Password must be at least ${PASSWORD_CONFIG.minLength} characters long`);
  }

  if (password && password.length > PASSWORD_CONFIG.maxLength) {
    errors.push(`Password must not exceed ${PASSWORD_CONFIG.maxLength} characters`);
  }

  // Character type requirements
  if (PASSWORD_CONFIG.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter (A-Z)');
    suggestions.push('Add an uppercase letter');
  }

  if (PASSWORD_CONFIG.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter (a-z)');
    suggestions.push('Add a lowercase letter');
  }

  if (PASSWORD_CONFIG.requireNumbers) {
    const numberCount = (password.match(/\d/g) || []).length;
    if (numberCount < PASSWORD_CONFIG.minNumbers) {
      errors.push(`Password must contain at least ${PASSWORD_CONFIG.minNumbers} number(s)`);
      suggestions.push('Add a number');
    }
  }

  if (PASSWORD_CONFIG.requireSpecialChars) {
    const specialCharCount = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/g) || []).length;
    if (specialCharCount < PASSWORD_CONFIG.minSpecialChars) {
      errors.push(`Password must contain at least ${PASSWORD_CONFIG.minSpecialChars} special character(s) (!@#$%^&*)`);
      suggestions.push('Add a special character like !@#$%^&*');
    }
  }

  // Check for repeating characters
  if (PASSWORD_CONFIG.maxRepeatingChars > 0) {
    const repeatingPattern = new RegExp(`(.)\\1{${PASSWORD_CONFIG.maxRepeatingChars},}`, 'i');
    if (repeatingPattern.test(password)) {
      errors.push(`Password cannot have more than ${PASSWORD_CONFIG.maxRepeatingChars} repeating characters in a row`);
      suggestions.push('Avoid repeating the same character multiple times');
    }
  }

  // Check for forbidden patterns
  PASSWORD_CONFIG.forbiddenPatterns.forEach(pattern => {
    if (password.toLowerCase().includes(pattern.toLowerCase())) {
      errors.push(`Password cannot contain common words like "${pattern}"`);
      suggestions.push('Avoid using common words or dictionary terms');
    }
  });

  // Check against user information
  if (userInfo.firstName && password.toLowerCase().includes(userInfo.firstName.toLowerCase())) {
    errors.push('Password cannot contain your first name');
    suggestions.push('Avoid using personal information in your password');
  }

  if (userInfo.lastName && password.toLowerCase().includes(userInfo.lastName.toLowerCase())) {
    errors.push('Password cannot contain your last name');
    suggestions.push('Avoid using personal information in your password');
  }

  if (userInfo.email) {
    const emailParts = userInfo.email.split('@')[0];
    if (password.toLowerCase().includes(emailParts.toLowerCase())) {
      errors.push('Password cannot contain parts of your email address');
      suggestions.push('Avoid using your email or username in your password');
    }
  }

  // Check for sequential characters
  if (PASSWORD_CONFIG.forbiddenSequences) {
    const hasSequentialChars = checkSequentialCharacters(password);
    if (hasSequentialChars) {
      warnings.push('Avoid using sequential characters (abc, 123, qwe)');
      suggestions.push('Mix up the character order to make it more secure');
    }
  }

  // Calculate password strength score
  const score = calculatePasswordScore(password);
  const strength = getPasswordStrengthLevel(score);

  return {
    isValid: errors.length === 0,
    score,
    strength,
    errors,
    warnings,
    suggestions,
    requirements: getPasswordRequirements()
  };
};

/**
 * Check for sequential characters in password
 * @param {string} password - Password to check
 * @returns {boolean} True if sequential patterns found
 */
const checkSequentialCharacters = (password) => {
  const sequences = [
    'abcdefghijklmnopqrstuvwxyz',
    'qwertyuiopasdfghjklzxcvbnm',
    '1234567890'
  ];

  const lowerPassword = password.toLowerCase();

  for (const sequence of sequences) {
    for (let i = 0; i <= sequence.length - 3; i++) {
      const subSeq = sequence.substring(i, i + 3);
      const reverseSubSeq = subSeq.split('').reverse().join('');
      
      if (lowerPassword.includes(subSeq) || lowerPassword.includes(reverseSubSeq)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Calculate password strength score
 * @param {string} password - Password to score
 * @returns {number} Score from 0-100
 */
const calculatePasswordScore = (password) => {
  if (!password) return 0;

  let score = 0;

  // Length scoring
  score += Math.min(password.length * 2, 25);

  // Character variety scoring
  if (/[a-z]/.test(password)) score += 5;
  if (/[A-Z]/.test(password)) score += 5;
  if (/\d/.test(password)) score += 5;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) score += 10;

  // Bonus for multiple character types
  const charTypes = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)
  ].filter(Boolean).length;

  score += charTypes * 5;

  // Penalty for common patterns
  if (PASSWORD_CONFIG.forbiddenPatterns.some(pattern => 
    password.toLowerCase().includes(pattern.toLowerCase()))) {
    score -= 20;
  }

  // Penalty for sequential characters
  if (checkSequentialCharacters(password)) {
    score -= 15;
  }

  // Penalty for repeating characters
  const repeatingPattern = /(.)\1{2,}/i;
  if (repeatingPattern.test(password)) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
};

/**
 * Get password strength level based on score
 * @param {number} score - Password score (0-100)
 * @returns {string} Strength level
 */
const getPasswordStrengthLevel = (score) => {
  if (score >= 80) return 'Very Strong';
  if (score >= 60) return 'Strong';
  if (score >= 40) return 'Medium';
  if (score >= 20) return 'Weak';
  return 'Very Weak';
};

/**
 * Get password requirements for display
 * @returns {Array} List of password requirements
 */
export const getPasswordRequirements = () => {
  return [
    `At least ${PASSWORD_CONFIG.minLength} characters long`,
    'At least one uppercase letter (A-Z)',
    'At least one lowercase letter (a-z)',
    `At least ${PASSWORD_CONFIG.minNumbers} number(s)`,
    `At least ${PASSWORD_CONFIG.minSpecialChars} special character(s) (!@#$%^&*)`,
    'No more than 2 repeating characters in a row',
    'Cannot contain common words or personal information',
    'Avoid sequential characters (abc, 123, qwe)'
  ];
};

/**
 * Generate a strong password suggestion
 * @returns {string} Suggested strong password
 */
export const generateStrongPassword = () => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let password = '';
  
  // Ensure at least one of each required type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];
  
  // Fill remaining length with random characters
  const allChars = lowercase + uppercase + numbers + specialChars;
  for (let i = password.length; i < PASSWORD_CONFIG.minLength + 2; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};

export default {
  validatePasswordStrength,
  getPasswordRequirements,
  generateStrongPassword
};