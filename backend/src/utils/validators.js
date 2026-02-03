const { body, param, query } = require('express-validator');

// Registration validators
const registerValidators = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// Login validators
const loginValidators = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

// OTP Verification validators
const verifyOtpValidators = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('otp')
        .isLength({ min: 6, max: 6 })
        .isNumeric()
        .withMessage('OTP must be a 6-digit number'),
];

// OTP Resend validators
const resendOtpValidators = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
];

// Faculty profile validators
const facultyProfileValidators = [
    body('first_name')
        .trim()
        .notEmpty()
        .withMessage('First name is required'),
    body('last_name')
        .trim()
        .notEmpty()
        .withMessage('Last name is required'),
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Please provide a valid phone number'),
];

// Education validators
const educationValidators = [
    body('degree')
        .trim()
        .notEmpty()
        .withMessage('Degree is required'),
    body('institution_name')
        .trim()
        .notEmpty()
        .withMessage('Institution name is required'),
    body('end_year')
        .optional()
        .isInt({ min: 1950, max: new Date().getFullYear() + 10 })
        .withMessage('Please provide a valid year'),
];

// Experience validators
const experienceValidators = [
    body('institution_name')
        .trim()
        .notEmpty()
        .withMessage('Institution name is required'),
    body('designation')
        .trim()
        .notEmpty()
        .withMessage('Designation is required'),
    body('start_date')
        .isISO8601()
        .withMessage('Please provide a valid start date'),
];

// Job posting validators
const jobValidators = [
    body('job_title')
        .trim()
        .notEmpty()
        .withMessage('Job title is required'),
    body('department')
        .trim()
        .notEmpty()
        .withMessage('Department is required'),
    body('designation')
        .trim()
        .notEmpty()
        .withMessage('Designation is required'),
    body('job_type')
        .isIn(['full_time', 'part_time', 'visiting', 'contractual', 'temporary'])
        .withMessage('Invalid job type'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Job description is required'),
];

// UUID validator
const uuidValidator = [
    param('id')
        .isUUID()
        .withMessage('Invalid ID format'),
];

module.exports = {
    registerValidators,
    loginValidators,
    verifyOtpValidators,
    resendOtpValidators,
    facultyProfileValidators,
    educationValidators,
    experienceValidators,
    jobValidators,
    uuidValidator,
};
