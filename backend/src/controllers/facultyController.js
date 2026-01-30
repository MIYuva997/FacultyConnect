const { query, transaction } = require('../config/database');
const path = require('path');

// Get Faculty Profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get faculty profile with all related data
        const profile = await query(
            `SELECT fp.*, u.email, u.phone
       FROM faculty_profiles fp
       JOIN users u ON fp.user_id = u.id
       WHERE fp.user_id = $1`,
            [userId]
        );

        if (profile.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found',
            });
        }

        // Get education
        const education = await query(
            'SELECT * FROM educational_qualifications WHERE faculty_id = $1 ORDER BY end_year DESC',
            [profile.rows[0].id]
        );

        // Get experience
        const experience = await query(
            'SELECT * FROM professional_experience WHERE faculty_id = $1 ORDER BY start_date DESC',
            [profile.rows[0].id]
        );

        // Get publications
        const publications = await query(
            'SELECT * FROM research_publications WHERE faculty_id = $1 ORDER BY publication_date DESC',
            [profile.rows[0].id]
        );

        // Get certifications
        const certifications = await query(
            'SELECT * FROM certifications WHERE faculty_id = $1 ORDER BY issue_date DESC',
            [profile.rows[0].id]
        );

        // Get skills
        const skills = await query(
            'SELECT * FROM skills WHERE faculty_id = $1',
            [profile.rows[0].id]
        );

        // Get resumes
        const resumes = await query(
            'SELECT * FROM resumes WHERE faculty_id = $1 ORDER BY uploaded_at DESC',
            [profile.rows[0].id]
        );

        res.json({
            success: true,
            data: {
                profile: profile.rows[0],
                education: education.rows,
                experience: experience.rows,
                publications: publications.rows,
                certifications: certifications.rows,
                skills: skills.rows,
                resumes: resumes.rows,
            },
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Update Faculty Profile
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        // Get faculty profile ID
        const facultyResult = await query(
            'SELECT id FROM faculty_profiles WHERE user_id = $1',
            [userId]
        );

        if (facultyResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found',
            });
        }

        const facultyId = facultyResult.rows[0].id;

        // Build update query dynamically
        const allowedFields = [
            'first_name', 'last_name', 'middle_name', 'date_of_birth', 'gender',
            'bio', 'teaching_philosophy', 'alternate_email', 'alternate_phone',
            'address_line1', 'address_line2', 'city', 'state', 'country', 'pincode',
            'preferred_locations', 'preferred_institution_types', 'preferred_subjects',
            'preferred_designations', 'min_salary', 'max_salary', 'job_type_preferences',
            'profile_visibility'
        ];

        const updateFields = [];
        const values = [];
        let paramCount = 1;

        Object.keys(updates).forEach(key => {
            if (allowedFields.includes(key)) {
                updateFields.push(`${key} = $${paramCount}`);
                values.push(updates[key]);
                paramCount++;
            }
        });

        if (updateFields.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid fields to update',
            });
        }

        values.push(facultyId);
        const updateQuery = `
      UPDATE faculty_profiles 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING *
    `;

        const result = await query(updateQuery, values);

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Upload Profile Photo
exports.uploadPhoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const userId = req.user.id;
        const photoPath = `/uploads/photos/${req.file.filename}`;

        // Update profile photo
        const result = await query(
            `UPDATE faculty_profiles 
       SET profile_photo = $1 
       WHERE user_id = $2
       RETURNING profile_photo`,
            [photoPath, userId]
        );

        res.json({
            success: true,
            message: 'Photo uploaded successfully',
            data: {
                photoUrl: result.rows[0].profile_photo,
            },
        });
    } catch (error) {
        console.error('Upload photo error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Upload Resume
exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }

        const userId = req.user.id;
        const { is_default } = req.body;

        // Get faculty ID
        const facultyResult = await query(
            'SELECT id FROM faculty_profiles WHERE user_id = $1',
            [userId]
        );

        const facultyId = facultyResult.rows[0].id;
        const filePath = `/uploads/resumes/${req.file.filename}`;

        // If setting as default, unset other defaults
        if (is_default === 'true' || is_default === true) {
            await query(
                'UPDATE resumes SET is_default = false WHERE faculty_id = $1',
                [facultyId]
            );
        }

        // Insert resume
        const result = await query(
            `INSERT INTO resumes (faculty_id, file_name, file_path, file_size, is_default)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [facultyId, req.file.originalname, filePath, req.file.size, is_default || false]
        );

        res.json({
            success: true,
            message: 'Resume uploaded successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Upload resume error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Add Education
exports.addEducation = async (req, res) => {
    try {
        const userId = req.user.id;
        const educationData = req.body;

        // Get faculty ID
        const facultyResult = await query(
            'SELECT id FROM faculty_profiles WHERE user_id = $1',
            [userId]
        );

        const facultyId = facultyResult.rows[0].id;

        const result = await query(
            `INSERT INTO educational_qualifications 
       (faculty_id, degree, specialization, institution_name, university, 
        start_year, end_year, percentage, cgpa, cgpa_scale, is_pursuing)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
            [
                facultyId,
                educationData.degree,
                educationData.specialization,
                educationData.institution_name,
                educationData.university,
                educationData.start_year,
                educationData.end_year,
                educationData.percentage,
                educationData.cgpa,
                educationData.cgpa_scale,
                educationData.is_pursuing || false,
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Education added successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Add education error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Add Experience
exports.addExperience = async (req, res) => {
    try {
        const userId = req.user.id;
        const experienceData = req.body;

        // Get faculty ID
        const facultyResult = await query(
            'SELECT id FROM faculty_profiles WHERE user_id = $1',
            [userId]
        );

        const facultyId = facultyResult.rows[0].id;

        const result = await query(
            `INSERT INTO professional_experience 
       (faculty_id, institution_name, designation, department, subjects_taught,
        start_date, end_date, is_current, responsibilities, achievements, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
            [
                facultyId,
                experienceData.institution_name,
                experienceData.designation,
                experienceData.department,
                JSON.stringify(experienceData.subjects_taught || []),
                experienceData.start_date,
                experienceData.end_date,
                experienceData.is_current || false,
                experienceData.responsibilities,
                experienceData.achievements,
                experienceData.location,
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Experience added successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Add experience error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Get Dashboard Data
exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get faculty ID
        const facultyResult = await query(
            'SELECT id, profile_completeness FROM faculty_profiles WHERE user_id = $1',
            [userId]
        );

        const facultyId = facultyResult.rows[0].id;

        // Get application statistics
        const applications = await query(
            `SELECT status, COUNT(*) as count
       FROM job_applications
       WHERE faculty_id = $1
       GROUP BY status`,
            [facultyId]
        );

        // Get recent applications
        const recentApplications = await query(
            `SELECT ja.*, j.job_title, j.department, i.institution_name
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       JOIN institutions i ON j.institution_id = i.id
       WHERE ja.faculty_id = $1
       ORDER BY ja.applied_at DESC
       LIMIT 10`,
            [facultyId]
        );

        // Get profile views count
        const profileViews = await query(
            'SELECT COUNT(*) as total FROM profile_views WHERE faculty_id = $1',
            [facultyId]
        );

        // Get saved jobs count
        const savedJobs = await query(
            'SELECT COUNT(*) as total FROM saved_jobs WHERE faculty_id = $1',
            [facultyId]
        );

        res.json({
            success: true,
            data: {
                profileCompleteness: facultyResult.rows[0].profile_completeness,
                applicationStats: applications.rows,
                recentApplications: recentApplications.rows,
                profileViews: parseInt(profileViews.rows[0].total),
                savedJobsCount: parseInt(savedJobs.rows[0].total),
            },
        });
    } catch (error) {
        console.error('Get dashboard error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};
