const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query, transaction } = require('../config/database');
const { generateOTP, getOTPExpiry, isOTPValid } = require('../utils/otp');
const { sendOTPEmail, sendWelcomeEmail } = require('../utils/email');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

// Register Faculty
exports.registerFaculty = async (req, res) => {
    try {
        const { email, password, phone, first_name, last_name } = req.body;

        // Check if user already exists
        const existingUser = await query(
            'SELECT id FROM users WHERE email = $1 OR phone = $2',
            [email, phone]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'User with this email or phone already exists',
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = generateOTP();
        const otp_expires_at = getOTPExpiry();

        // Create user and faculty profile in transaction
        const result = await transaction(async (client) => {
            // Insert user
            const userResult = await client.query(
                `INSERT INTO users (email, phone, password_hash, user_type, otp, otp_expires_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, email, user_type, is_verified`,
                [email, phone, password_hash, 'faculty', otp, otp_expires_at]
            );

            const user = userResult.rows[0];

            // Insert faculty profile
            await client.query(
                `INSERT INTO faculty_profiles (user_id, first_name, last_name)
         VALUES ($1, $2, $3)`,
                [user.id, first_name, last_name]
            );

            return user;
        });

        // Send OTP email
        console.log('\n========================================');
        console.log('📬 OTP for', email + ':', otp);
        console.log('========================================\n');
        await sendOTPEmail(email, otp, first_name);

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email with the OTP sent.',
            data: {
                userId: result.id,
                email: result.email,
                userType: result.user_type,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message,
        });
    }
};

// Register Institution
exports.registerInstitution = async (req, res) => {
    try {
        const { email, password, phone, institution_name, institution_type } = req.body;

        // Check if user already exists
        const existingUser = await query(
            'SELECT id FROM users WHERE email = $1 OR phone = $2',
            [email, phone]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'User with this email or phone already exists',
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = generateOTP();
        const otp_expires_at = getOTPExpiry();

        // Create user and institution profile in transaction
        const result = await transaction(async (client) => {
            // Insert user
            const userResult = await client.query(
                `INSERT INTO users (email, phone, password_hash, user_type, otp, otp_expires_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, email, user_type, is_verified`,
                [email, phone, password_hash, 'institution', otp, otp_expires_at]
            );

            const user = userResult.rows[0];

            // Insert institution profile
            await client.query(
                `INSERT INTO institutions (user_id, institution_name, institution_type, phone)
         VALUES ($1, $2, $3, $4)`,
                [user.id, institution_name, institution_type, phone]
            );

            return user;
        });

        // Send OTP email
        console.log('\n========================================');
        console.log('📬 OTP for', email + ':', otp);
        console.log('========================================\n');
        await sendOTPEmail(email, otp, institution_name);

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email with the OTP sent.',
            data: {
                userId: result.id,
                email: result.email,
                userType: result.user_type,
            },
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message,
        });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Get user
        const result = await query(
            'SELECT id, email, user_type, otp, otp_expires_at, is_verified FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const user = result.rows[0];

        if (user.is_verified) {
            return res.status(400).json({
                success: false,
                message: 'Email already verified',
            });
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP',
            });
        }

        if (!isOTPValid(user.otp_expires_at)) {
            return res.status(400).json({
                success: false,
                message: 'OTP has expired. Please request a new one.',
            });
        }

        // Update user as verified
        await query(
            'UPDATE users SET is_verified = true, otp = NULL, otp_expires_at = NULL WHERE id = $1',
            [user.id]
        );

        // Get user name for welcome email
        let userName = 'User';
        if (user.user_type === 'faculty') {
            const profile = await query(
                'SELECT first_name FROM faculty_profiles WHERE user_id = $1',
                [user.id]
            );
            userName = profile.rows[0]?.first_name || 'User';
        } else {
            const profile = await query(
                'SELECT institution_name FROM institutions WHERE user_id = $1',
                [user.id]
            );
            userName = profile.rows[0]?.institution_name || 'Institution';
        }

        // Send welcome email
        await sendWelcomeEmail(email, userName, user.user_type);

        // Generate token
        const token = generateToken(user.id);

        res.json({
            success: true,
            message: 'Email verified successfully',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    userType: user.user_type,
                    isVerified: true,
                },
            },
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during verification',
            error: error.message,
        });
    }
};

// Resend OTP
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Get user
        const result = await query(
            'SELECT id, email, user_type, is_verified FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const user = result.rows[0];

        if (user.is_verified) {
            return res.status(400).json({
                success: false,
                message: 'Email already verified',
            });
        }

        // Generate new OTP
        const otp = generateOTP();
        const otp_expires_at = getOTPExpiry();

        // Update OTP
        await query(
            'UPDATE users SET otp = $1, otp_expires_at = $2 WHERE id = $3',
            [otp, otp_expires_at, user.id]
        );

        // Get user name
        let userName = 'User';
        if (user.user_type === 'faculty') {
            const profile = await query(
                'SELECT first_name FROM faculty_profiles WHERE user_id = $1',
                [user.id]
            );
            userName = profile.rows[0]?.first_name || 'User';
        } else {
            const profile = await query(
                'SELECT institution_name FROM institutions WHERE user_id = $1',
                [user.id]
            );
            userName = profile.rows[0]?.institution_name || 'Institution';
        }

        // Send OTP email
        console.log('\n========================================');
        console.log('📬 NEW OTP for', email + ':', otp);
        console.log('========================================\n');
        await sendOTPEmail(email, otp, userName);

        res.json({
            success: true,
            message: 'OTP sent successfully',
        });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get user
        const result = await query(
            'SELECT id, email, password_hash, user_type, is_verified, is_active FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const user = result.rows[0];

        // Check if account is active
        if (!user.is_active) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated',
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Update last login
        await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);

        // Generate token
        const token = generateToken(user.id);

        res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    userType: user.user_type,
                    isVerified: user.is_verified,
                },
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: error.message,
        });
    }
};

// Get current user
exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const userType = req.user.user_type;

        let profileData = {};

        if (userType === 'faculty') {
            const result = await query(
                `SELECT fp.*, u.email, u.phone
         FROM faculty_profiles fp
         JOIN users u ON fp.user_id = u.id
         WHERE fp.user_id = $1`,
                [userId]
            );
            profileData = result.rows[0];
        } else {
            const result = await query(
                `SELECT i.*, u.email
         FROM institutions i
         JOIN users u ON i.user_id = u.id
         WHERE i.user_id = $1`,
                [userId]
            );
            profileData = result.rows[0];
        }

        res.json({
            success: true,
            data: {
                user: req.user,
                profile: profileData,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
