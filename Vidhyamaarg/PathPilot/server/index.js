/**
 * PathPilot Backend Server
 * 
 * This is the main entry point for the Node.js/Express backend server.
 * It provides API endpoints for authentication, hackathon data, and user management.
 * 
 * Features:
 * - User authentication (JWT-based)
 * - Hackathon data management
 * - User profile management
 * - CORS enabled for frontend communication
 * - Environment-based configuration
 */

import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { sendPasswordResetEmail, generatePasswordResetToken } from './services/emailService.js';
import { validatePasswordStrength, getPasswordRequirements } from './utils/passwordValidator.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'pathpilot-secret-key-2024';

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../dist')));

// In-memory storage (replace with database in production)
let users = [];
let hackathons = [];
let userProfiles = {};
let passwordResetTokens = {}; // Store password reset tokens

// Load initial data
const initializeData = async () => {
  try {
    // Load sample hackathons data
    const hackathonDataPath = path.join(__dirname, 'data', 'hackathons.json');
    const hackathonData = await fs.readFile(hackathonDataPath, 'utf8');
    hackathons = JSON.parse(hackathonData);
    console.log('✓ Hackathon data loaded successfully');
  } catch (error) {
    console.log('⚠ No hackathon data file found, using empty array');
    hackathons = [];
  }
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// API Routes

/**
 * Authentication Routes
 */

// User Registration
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date().toISOString()
    };

    users.push(user);

    // Create user profile
    userProfiles[user.id] = {
      userId: user.id,
      firstName,
      lastName,
      email,
      bio: '',
      skills: [],
      preferences: {
        theme: 'light',
        notifications: true
      }
    };

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Password Reset Request
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Always return success to prevent email enumeration attacks
    // But only send email if user exists
    const user = users.find(u => u.email === email);
    
    if (user) {
      // Generate reset token
      const { token, expiry } = generatePasswordResetToken();
      
      // Store reset token
      passwordResetTokens[token] = {
        userId: user.id,
        email: user.email,
        expiry,
        used: false,
        createdAt: new Date()
      };

      // Send password reset email
      const emailSent = await sendPasswordResetEmail(email, token, user.firstName);
      
      if (!emailSent) {
        console.error('Failed to send password reset email to:', email);
      }
    }

    // Always return success message
    res.json({ 
      message: 'If an account with this email exists, password reset instructions have been sent to your email address.' 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Verify Reset Token
app.get('/api/auth/verify-reset-token/:token', (req, res) => {
  try {
    const { token } = req.params;

    const resetData = passwordResetTokens[token];
    if (!resetData) {
      return res.status(400).json({ 
        message: 'Invalid reset token',
        valid: false 
      });
    }

    if (resetData.used) {
      return res.status(400).json({ 
        message: 'Reset token has already been used',
        valid: false 
      });
    }

    if (new Date() > resetData.expiry) {
      delete passwordResetTokens[token];
      return res.status(400).json({ 
        message: 'Reset token has expired. Please request a new password reset.',
        valid: false 
      });
    }

    res.json({ 
      message: 'Reset token is valid',
      valid: true,
      email: resetData.email
    });
  } catch (error) {
    console.error('Verify reset token error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Verify token
    const resetData = passwordResetTokens[token];
    if (!resetData) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }

    if (resetData.used) {
      return res.status(400).json({ message: 'Reset token has already been used' });
    }

    if (new Date() > resetData.expiry) {
      delete passwordResetTokens[token];
      return res.status(400).json({ message: 'Reset token has expired. Please request a new password reset.' });
    }

    // Find user
    const user = users.find(u => u.id === resetData.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate new password strength
    const passwordValidation = validatePasswordStrength(newPassword, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });

    if (!passwordValidation.isValid) {
      return res.status(400).json({
        message: 'New password does not meet security requirements',
        errors: passwordValidation.errors,
        suggestions: passwordValidation.suggestions,
        requirements: passwordValidation.requirements
      });
    }

    // Check if new password is different from current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ 
        message: 'New password must be different from your current password' 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    const userIndex = users.findIndex(u => u.id === user.id);
    users[userIndex].password = hashedPassword;
    users[userIndex].passwordChangedAt = new Date().toISOString();

    // Mark token as used
    passwordResetTokens[token].used = true;

    res.json({ 
      message: 'Password has been reset successfully. You can now log in with your new password.' 
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Validate Password Strength (for frontend)
app.post('/api/auth/validate-password', (req, res) => {
  try {
    const { password, userInfo } = req.body;
    
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const validation = validatePasswordStrength(password, userInfo || {});
    res.json(validation);
  } catch (error) {
    console.error('Validate password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Password Requirements
app.get('/api/auth/password-requirements', (req, res) => {
  try {
    res.json({
      requirements: getPasswordRequirements(),
      message: 'Password security requirements'
    });
  } catch (error) {
    console.error('Get password requirements error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Hackathon Routes
 */

// Get all hackathons with optional filtering
app.get('/api/hackathons', (req, res) => {
  try {
    const { category, difficulty, location } = req.query;
    let filteredHackathons = [...hackathons];

    if (category) {
      filteredHackathons = filteredHackathons.filter(h => 
        h.category?.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (difficulty) {
      filteredHackathons = filteredHackathons.filter(h => 
        h.difficulty?.toLowerCase() === difficulty.toLowerCase()
      );
    }

    if (location) {
      filteredHackathons = filteredHackathons.filter(h => 
        h.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.json({
      hackathons: filteredHackathons,
      total: filteredHackathons.length
    });
  } catch (error) {
    console.error('Get hackathons error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get hackathon by ID
app.get('/api/hackathons/:id', (req, res) => {
  try {
    const hackathon = hackathons.find(h => h.id === req.params.id);
    if (!hackathon) {
      return res.status(404).json({ message: 'Hackathon not found' });
    }
    res.json(hackathon);
  } catch (error) {
    console.error('Get hackathon error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * User Profile Routes
 */

// Get user profile
app.get('/api/profile', authenticateToken, (req, res) => {
  try {
    const profile = userProfiles[req.user.userId];
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user profile
app.put('/api/profile', authenticateToken, (req, res) => {
  try {
    const { firstName, lastName, bio, skills } = req.body;
    const profile = userProfiles[req.user.userId];

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update profile
    userProfiles[req.user.userId] = {
      ...profile,
      firstName: firstName || profile.firstName,
      lastName: lastName || profile.lastName,
      bio: bio || profile.bio,
      skills: skills || profile.skills,
      updatedAt: new Date().toISOString()
    };

    res.json({
      message: 'Profile updated successfully',
      profile: userProfiles[req.user.userId]
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user preferences
app.put('/api/profile/preferences', authenticateToken, (req, res) => {
  try {
    const { theme, notifications } = req.body;
    const profile = userProfiles[req.user.userId];

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    userProfiles[req.user.userId].preferences = {
      ...profile.preferences,
      theme: theme || profile.preferences.theme,
      notifications: notifications !== undefined ? notifications : profile.preferences.notifications
    };

    res.json({
      message: 'Preferences updated successfully',
      preferences: userProfiles[req.user.userId].preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Dashboard Routes
 */

// Get dashboard data
app.get('/api/dashboard', authenticateToken, (req, res) => {
  try {
    const profile = userProfiles[req.user.userId];
    const upcomingHackathons = hackathons.slice(0, 5);
    
    res.json({
      user: {
        firstName: profile?.firstName || 'User',
        lastName: profile?.lastName || ''
      },
      stats: {
        totalHackathons: hackathons.length,
        upcomingEvents: upcomingHackathons.length,
        userRegistrations: 0 // This would come from a registrations table
      },
      upcomingHackathons,
      recentActivity: []
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * Health Check Route
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Cleanup expired password reset tokens
const cleanupExpiredTokens = () => {
  const now = new Date();
  Object.keys(passwordResetTokens).forEach(token => {
    if (passwordResetTokens[token].expiry < now || passwordResetTokens[token].used) {
      delete passwordResetTokens[token];
    }
  });
};

// Run cleanup every hour
setInterval(cleanupExpiredTokens, 3600000);

// Initialize data and start server
initializeData().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 PathPilot server running on port ${PORT}`);
    console.log(`📱 Frontend URL: http://localhost:5173`);
    console.log(`🔧 API URL: http://localhost:${PORT}/api`);
    console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📧 Email service: ${process.env.SMTP_USER ? 'Configured' : 'Development mode (console logging)'}`);
  });
});

export default app;