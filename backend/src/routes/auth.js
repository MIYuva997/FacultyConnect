const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const {
    registerValidators,
    loginValidators,
    verifyOtpValidators,
    resendOtpValidators,
} = require('../utils/validators');

// Registration routes
router.post('/register/faculty', registerValidators, validate, authController.registerFaculty);
router.post('/register/institution', registerValidators, validate, authController.registerInstitution);

// OTP routes
router.post('/verify-otp', verifyOtpValidators, validate, authController.verifyOTP);
router.post('/resend-otp', resendOtpValidators, validate, authController.resendOTP);

// Login route
router.post('/login', loginValidators, validate, authController.login);

// Get current user (protected)
router.get('/me', auth, authController.getMe);

module.exports = router;
