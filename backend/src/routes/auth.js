const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validation');
const { auth } = require('../middleware/auth');
const {
    registerValidators,
    loginValidators,
    otpValidators,
} = require('../utils/validators');

// Registration routes
router.post('/register/faculty', registerValidators, validate, authController.registerFaculty);
router.post('/register/institution', registerValidators, validate, authController.registerInstitution);

// OTP routes
router.post('/verify-otp', otpValidators, validate, authController.verifyOTP);
router.post('/resend-otp', otpValidators, validate, authController.resendOTP);

// Login route
router.post('/login', loginValidators, validate, authController.login);

// Get current user (protected)
router.get('/me', auth, authController.getMe);

module.exports = router;
