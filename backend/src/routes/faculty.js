const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');
const { auth, isFaculty, isVerified } = require('../middleware/auth');
const { uploadPhoto, uploadResume } = require('../middleware/upload');
const validate = require('../middleware/validation');
const {
    facultyProfileValidators,
    educationValidators,
    experienceValidators,
} = require('../utils/validators');

// All routes require authentication and faculty role
router.use(auth, isFaculty);

// Profile routes
router.get('/profile', facultyController.getProfile);
router.put('/profile', facultyProfileValidators, validate, facultyController.updateProfile);
router.post('/profile/photo', uploadPhoto, facultyController.uploadPhoto);
router.post('/profile/resume', uploadResume, facultyController.uploadResume);

// Education routes
router.post('/education', educationValidators, validate, facultyController.addEducation);

// Experience routes
router.post('/experience', experienceValidators, validate, facultyController.addExperience);

// Dashboard
router.get('/dashboard', facultyController.getDashboard);

module.exports = router;
