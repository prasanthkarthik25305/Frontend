/**
 * Email Service
 * 
 * This module handles email sending functionality for password reset,
 * account verification, and other notifications.
 */

import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// Create transporter
let transporter = null;

const initializeEmailService = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransporter(EMAIL_CONFIG);
    console.log('✓ Email service initialized');
  } else {
    console.log('⚠ Email service not configured - using console logging');
  }
};

/**
 * Generate password reset token
 * @returns {Object} Token and expiry
 */
export const generatePasswordResetToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 3600000); // 1 hour from now
  return { token, expiry };
};

/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} token - Reset token
 * @param {string} firstName - User's first name
 * @returns {Promise<boolean>} Success status
 */
export const sendPasswordResetEmail = async (email, token, firstName = '') => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
  
  const emailTemplate = {
    from: process.env.SMTP_FROM || '"PathPilot Support" <noreply@pathpilot.com>',
    to: email,
    subject: 'Password Reset Request - PathPilot',
    html: generatePasswordResetEmailHTML(resetUrl, firstName),
    text: generatePasswordResetEmailText(resetUrl, firstName)
  };

  try {
    if (transporter) {
      const info = await transporter.sendMail(emailTemplate);
      console.log('Password reset email sent:', info.messageId);
      return true;
    } else {
      // Fallback for development - log to console
      console.log('=== PASSWORD RESET EMAIL (Development Mode) ===');
      console.log(`To: ${email}`);
      console.log(`Subject: ${emailTemplate.subject}`);
      console.log(`Reset URL: ${resetUrl}`);
      console.log('===============================================');
      return true;
    }
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

/**
 * Generate HTML email template for password reset
 * @param {string} resetUrl - Password reset URL
 * @param {string} firstName - User's first name
 * @returns {string} HTML email content
 */
const generatePasswordResetEmailHTML = (resetUrl, firstName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset - PathPilot</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 PathPilot</h1>
          <p>Password Reset Request</p>
        </div>
        <div class="content">
          <h2>Hello ${firstName || 'there'}!</h2>
          <p>We received a request to reset your password for your PathPilot account. If you made this request, click the button below to reset your password:</p>
          
          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Reset My Password</a>
          </div>
          
          <div class="warning">
            <strong>⚠️ Important Security Information:</strong>
            <ul>
              <li>This link will expire in 1 hour for security reasons</li>
              <li>If you didn't request this reset, please ignore this email</li>
              <li>Never share this link with anyone</li>
            </ul>
          </div>
          
          <p>If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 3px;">
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          
          <p>For security reasons, this link will expire in 1 hour. If you need to reset your password after that, please request a new reset link.</p>
        </div>
        <div class="footer">
          <p>This email was sent by PathPilot. If you have any questions, please contact our support team.</p>
          <p>&copy; 2024 PathPilot. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate plain text email for password reset
 * @param {string} resetUrl - Password reset URL
 * @param {string} firstName - User's first name
 * @returns {string} Plain text email content
 */
const generatePasswordResetEmailText = (resetUrl, firstName) => {
  return `
Hello ${firstName || 'there'}!

We received a request to reset your password for your PathPilot account.

To reset your password, click or copy this link into your browser:
${resetUrl}

IMPORTANT SECURITY INFORMATION:
- This link will expire in 1 hour for security reasons
- If you didn't request this reset, please ignore this email
- Never share this link with anyone

For security reasons, this link will expire in 1 hour. If you need to reset your password after that, please request a new reset link.

If you have any questions, please contact our support team.

PathPilot Team
© 2024 PathPilot. All rights reserved.
  `;
};

/**
 * Verify email configuration
 * @returns {Promise<boolean>} Configuration status
 */
export const verifyEmailConfig = async () => {
  if (!transporter) {
    return false;
  }

  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Email configuration verification failed:', error);
    return false;
  }
};

// Initialize email service on module load
initializeEmailService();

export default {
  sendPasswordResetEmail,
  generatePasswordResetToken,
  verifyEmailConfig
};