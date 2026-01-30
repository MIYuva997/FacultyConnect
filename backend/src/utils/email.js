const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Send email function
const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: `"FacultyConnect" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email send error:', error);
        return { success: false, error: error.message };
    }
};

// Send OTP email
const sendOTPEmail = async (email, otp, name = 'User') => {
    const subject = 'Verify Your Email - FacultyConnect';
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
        .otp { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Verification</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>Thank you for registering with FacultyConnect! Please use the following OTP to verify your email address:</p>
          <div class="otp-box">
            <div class="otp">${otp}</div>
          </div>
          <p>This OTP will expire in ${process.env.OTP_EXPIRE_MINUTES || 10} minutes.</p>
          <p>If you didn't request this verification, please ignore this email.</p>
          <p>Best regards,<br>The FacultyConnect Team</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 FacultyConnect. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return await sendEmail(email, subject, html);
};

// Send welcome email
const sendWelcomeEmail = async (email, name, userType) => {
    const subject = 'Welcome to FacultyConnect!';
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to FacultyConnect!</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>Welcome to FacultyConnect - India's premier platform connecting talented faculty members with leading educational institutions!</p>
          ${userType === 'faculty' ? `
            <p>As a faculty member, you can now:</p>
            <ul>
              <li>Create a comprehensive professional profile</li>
              <li>Search and apply for job opportunities</li>
              <li>Track your applications</li>
              <li>Get discovered by top institutions</li>
            </ul>
          ` : `
            <p>As an institution, you can now:</p>
            <ul>
              <li>Post job openings</li>
              <li>Search qualified candidates</li>
              <li>Manage applications efficiently</li>
              <li>Build your dream faculty team</li>
            </ul>
          `}
          <p>Get started by completing your profile to unlock all features!</p>
          <a href="${process.env.FRONTEND_URL}" class="button">Go to Dashboard</a>
          <p>Best regards,<br>The FacultyConnect Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return await sendEmail(email, subject, html);
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken, name) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = 'Password Reset Request - FacultyConnect';
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>Best regards,<br>The FacultyConnect Team</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return await sendEmail(email, subject, html);
};

module.exports = {
    sendEmail,
    sendOTPEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
};
