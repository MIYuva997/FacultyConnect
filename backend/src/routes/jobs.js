const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { auth, isFaculty, isInstitution, isVerified } = require('../middleware/auth');
const validate = require('../middleware/validation');
const { jobValidators, uuidValidator } = require('../utils/validators');

// Public routes (no auth required)
router.get('/', jobController.getJobs);
router.get('/:id', uuidValidator, validate, jobController.getJobById);

// Faculty routes (require faculty authentication)
router.post('/:id/apply', auth, isFaculty, isVerified, jobController.applyForJob);
router.post('/:id/save', auth, isFaculty, jobController.saveJob);
router.get('/applied/list', auth, isFaculty, jobController.getAppliedJobs);

// Institution routes (require institution authentication)
router.post('/', auth, isInstitution, isVerified, jobValidators, validate, jobController.createJob);

module.exports = router;
