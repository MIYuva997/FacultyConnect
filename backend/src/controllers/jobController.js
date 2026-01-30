const { query } = require('../config/database');

// Create Job Posting
exports.createJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobData = req.body;

        // Get institution ID
        const institutionResult = await query(
            'SELECT id FROM institutions WHERE user_id = $1',
            [userId]
        );

        if (institutionResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Institution profile not found',
            });
        }

        const institutionId = institutionResult.rows[0].id;

        const result = await query(
            `INSERT INTO jobs 
       (institution_id, job_title, department, subject, designation, job_type,
        min_experience, max_experience, min_qualification, required_qualifications,
        preferred_qualifications, required_skills, min_salary, max_salary,
        salary_negotiable, other_benefits, description, responsibilities,
        requirements, total_positions, application_deadline, joining_date,
        job_location, is_remote, status, is_premium, published_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
               $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, CURRENT_TIMESTAMP)
       RETURNING *`,
            [
                institutionId,
                jobData.job_title,
                jobData.department,
                jobData.subject,
                jobData.designation,
                jobData.job_type,
                jobData.min_experience,
                jobData.max_experience,
                jobData.min_qualification,
                JSON.stringify(jobData.required_qualifications || []),
                JSON.stringify(jobData.preferred_qualifications || []),
                JSON.stringify(jobData.required_skills || []),
                jobData.min_salary,
                jobData.max_salary,
                jobData.salary_negotiable !== false,
                jobData.other_benefits,
                jobData.description,
                jobData.responsibilities,
                jobData.requirements,
                jobData.total_positions || 1,
                jobData.application_deadline,
                jobData.joining_date,
                jobData.job_location,
                jobData.is_remote || false,
                jobData.status || 'active',
                jobData.is_premium || false,
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Job posted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Create job error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Get All Jobs with Filters
exports.getJobs = async (req, res) => {
    try {
        const {
            search,
            location,
            institution_type,
            department,
            designation,
            job_type,
            min_salary,
            max_salary,
            min_experience,
            max_experience,
            page = 1,
            limit = 20,
        } = req.query;

        let queryText = `
      SELECT j.*, i.institution_name, i.institution_type, i.city, i.state
      FROM jobs j
      JOIN institutions i ON j.institution_id = i.id
      WHERE j.status = 'active'
    `;

        const queryParams = [];
        let paramCount = 1;

        // Add filters
        if (search) {
            queryText += ` AND (j.job_title ILIKE $${paramCount} OR j.description ILIKE $${paramCount})`;
            queryParams.push(`%${search}%`);
            paramCount++;
        }

        if (location) {
            queryText += ` AND (j.job_location ILIKE $${paramCount} OR i.city ILIKE $${paramCount} OR i.state ILIKE $${paramCount})`;
            queryParams.push(`%${location}%`);
            paramCount++;
        }

        if (institution_type) {
            queryText += ` AND i.institution_type = $${paramCount}`;
            queryParams.push(institution_type);
            paramCount++;
        }

        if (department) {
            queryText += ` AND j.department ILIKE $${paramCount}`;
            queryParams.push(`%${department}%`);
            paramCount++;
        }

        if (designation) {
            queryText += ` AND j.designation ILIKE $${paramCount}`;
            queryParams.push(`%${designation}%`);
            paramCount++;
        }

        if (job_type) {
            queryText += ` AND j.job_type = $${paramCount}`;
            queryParams.push(job_type);
            paramCount++;
        }

        if (min_salary) {
            queryText += ` AND j.max_salary >= $${paramCount}`;
            queryParams.push(parseInt(min_salary));
            paramCount++;
        }

        if (max_salary) {
            queryText += ` AND j.min_salary <= $${paramCount}`;
            queryParams.push(parseInt(max_salary));
            paramCount++;
        }

        if (min_experience) {
            queryText += ` AND j.max_experience >= $${paramCount}`;
            queryParams.push(parseInt(min_experience));
            paramCount++;
        }

        if (max_experience) {
            queryText += ` AND j.min_experience <= $${paramCount}`;
            queryParams.push(parseInt(max_experience));
            paramCount++;
        }

        // Get total count
        const countQuery = queryText.replace('SELECT j.*, i.institution_name, i.institution_type, i.city, i.state', 'SELECT COUNT(*)');
        const countResult = await query(countQuery, queryParams);
        const total = parseInt(countResult.rows[0].count);

        // Add pagination
        const offset = (page - 1) * limit;
        queryText += ` ORDER BY j.published_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
        queryParams.push(parseInt(limit), offset);

        const result = await query(queryText, queryParams);

        res.json({
            success: true,
            data: {
                jobs: result.rows,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(total / limit),
                },
            },
        });
    } catch (error) {
        console.error('Get jobs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Get Job by ID
exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await query(
            `SELECT j.*, i.institution_name, i.institution_type, i.city, i.state,
              i.website, i.about, i.logo_url
       FROM jobs j
       JOIN institutions i ON j.institution_id = i.id
       WHERE j.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }

        // Increment views count
        await query('UPDATE jobs SET views_count = views_count + 1 WHERE id = $1', [id]);

        res.json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Get job error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Apply for Job
exports.applyForJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id: jobId } = req.params;
        const { cover_letter, expected_salary, notice_period, available_from, resume_id } = req.body;

        // Get faculty ID
        const facultyResult = await query(
            'SELECT id FROM faculty_profiles WHERE user_id = $1',
            [userId]
        );

        const facultyId = facultyResult.rows[0].id;

        // Check if already applied
        const existingApplication = await query(
            'SELECT id FROM job_applications WHERE job_id = $1 AND faculty_id = $2',
            [jobId, facultyId]
        );

        if (existingApplication.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'You have already applied for this job',
            });
        }

        // Create application
        const result = await query(
            `INSERT INTO job_applications 
       (job_id, faculty_id, resume_id, cover_letter, expected_salary, 
        notice_period, available_from, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'submitted')
       RETURNING *`,
            [jobId, facultyId, resume_id, cover_letter, expected_salary, notice_period, available_from]
        );

        // Increment applications count
        await query('UPDATE jobs SET applications_count = applications_count + 1 WHERE id = $1', [jobId]);

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Apply for job error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Save Job
exports.saveJob = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id: jobId } = req.params;

        // Get faculty ID
        const facultyResult = await query(
            'SELECT id FROM faculty_profiles WHERE user_id = $1',
            [userId]
        );

        const facultyId = facultyResult.rows[0].id;

        // Check if already saved
        const existing = await query(
            'SELECT id FROM saved_jobs WHERE job_id = $1 AND faculty_id = $2',
            [jobId, facultyId]
        );

        if (existing.rows.length > 0) {
            // Unsave
            await query('DELETE FROM saved_jobs WHERE job_id = $1 AND faculty_id = $2', [jobId, facultyId]);
            return res.json({
                success: true,
                message: 'Job removed from saved jobs',
                saved: false,
            });
        }

        // Save job
        await query(
            'INSERT INTO saved_jobs (job_id, faculty_id) VALUES ($1, $2)',
            [jobId, facultyId]
        );

        res.json({
            success: true,
            message: 'Job saved successfully',
            saved: true,
        });
    } catch (error) {
        console.error('Save job error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

// Get Applied Jobs
exports.getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get faculty ID
        const facultyResult = await query(
            'SELECT id FROM faculty_profiles WHERE user_id = $1',
            [userId]
        );

        const facultyId = facultyResult.rows[0].id;

        const result = await query(
            `SELECT ja.*, j.job_title, j.department, j.designation, j.job_location,
              i.institution_name, i.city, i.state
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       JOIN institutions i ON j.institution_id = i.id
       WHERE ja.faculty_id = $1
       ORDER BY ja.applied_at DESC`,
            [facultyId]
        );

        res.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error('Get applied jobs error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

module.exports = exports;
