const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

// Verify JWT token middleware
const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const result = await query(
            'SELECT id, email, user_type, is_verified, is_active FROM users WHERE id = $1',
            [decoded.userId]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(401).json({
                success: false,
                message: 'Account is deactivated'
            });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Check if user is faculty
const isFaculty = (req, res, next) => {
    if (req.user.user_type !== 'faculty') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Faculty only.'
        });
    }
    next();
};

// Check if user is institution
const isInstitution = (req, res, next) => {
    if (req.user.user_type !== 'institution') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Institution only.'
        });
    }
    next();
};

// Check if user is verified
const isVerified = (req, res, next) => {
    if (!req.user.is_verified) {
        return res.status(403).json({
            success: false,
            message: 'Please verify your account first'
        });
    }
    next();
};

module.exports = {
    auth,
    isFaculty,
    isInstitution,
    isVerified,
};
