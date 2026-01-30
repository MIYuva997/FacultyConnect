-- FacultyConnect Database Schema
-- PostgreSQL 14+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- USERS TABLE (Base Authentication)
-- =============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('faculty', 'institution')),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    otp VARCHAR(6),
    otp_expires_at TIMESTAMP,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_type ON users(user_type);

-- =============================================
-- FACULTY PROFILES
-- =============================================
CREATE TABLE faculty_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    date_of_birth DATE,
    gender VARCHAR(20),
    profile_photo VARCHAR(500),
    bio TEXT,
    teaching_philosophy TEXT,
    video_introduction VARCHAR(500),
    
    -- Contact Information
    alternate_email VARCHAR(255),
    alternate_phone VARCHAR(20),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    pincode VARCHAR(10),
    
    -- Preferences
    preferred_locations JSONB, -- Array of preferred cities/states
    preferred_institution_types JSONB, -- Array of institution types
    preferred_subjects JSONB, -- Array of subjects
    preferred_designations JSONB, -- Array of designations
    min_salary INTEGER,
    max_salary INTEGER,
    job_type_preferences JSONB, -- full-time, part-time, etc.
    
    -- Profile Metadata
    profile_completeness INTEGER DEFAULT 0,
    profile_strength_score INTEGER DEFAULT 0,
    profile_visibility VARCHAR(20) DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private')),
    total_experience_years INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_faculty_user ON faculty_profiles(user_id);
CREATE INDEX idx_faculty_city ON faculty_profiles(city);
CREATE INDEX idx_faculty_state ON faculty_profiles(state);

-- =============================================
-- EDUCATIONAL QUALIFICATIONS
-- =============================================
CREATE TABLE educational_qualifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    degree VARCHAR(100) NOT NULL,
    specialization VARCHAR(200),
    institution_name VARCHAR(255) NOT NULL,
    university VARCHAR(255),
    start_year INTEGER,
    end_year INTEGER,
    percentage DECIMAL(5,2),
    cgpa DECIMAL(4,2),
    cgpa_scale DECIMAL(4,2),
    is_pursuing BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_education_faculty ON educational_qualifications(faculty_id);

-- =============================================
-- PROFESSIONAL EXPERIENCE
-- =============================================
CREATE TABLE professional_experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    subjects_taught JSONB, -- Array of subjects
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    responsibilities TEXT,
    achievements TEXT,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_experience_faculty ON professional_experience(faculty_id);

-- =============================================
-- RESEARCH & PUBLICATIONS
-- =============================================
CREATE TABLE research_publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    publication_type VARCHAR(50) NOT NULL CHECK (publication_type IN ('journal', 'conference', 'patent', 'book', 'chapter')),
    title VARCHAR(500) NOT NULL,
    authors TEXT,
    journal_name VARCHAR(255),
    conference_name VARCHAR(255),
    publisher VARCHAR(255),
    publication_date DATE,
    volume VARCHAR(50),
    issue VARCHAR(50),
    pages VARCHAR(50),
    doi VARCHAR(255),
    isbn VARCHAR(50),
    patent_number VARCHAR(100),
    url VARCHAR(500),
    abstract TEXT,
    citations_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_publications_faculty ON research_publications(faculty_id);
CREATE INDEX idx_publications_type ON research_publications(publication_type);

-- =============================================
-- CERTIFICATIONS & TRAINING
-- =============================================
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    certification_type VARCHAR(50) NOT NULL CHECK (certification_type IN ('fdp', 'workshop', 'online_course', 'certification', 'training')),
    title VARCHAR(255) NOT NULL,
    issuing_organization VARCHAR(255) NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    credential_id VARCHAR(100),
    credential_url VARCHAR(500),
    description TEXT,
    skills_gained JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_certifications_faculty ON certifications(faculty_id);

-- =============================================
-- SKILLS & EXPERTISE
-- =============================================
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    skill_category VARCHAR(50) NOT NULL CHECK (skill_category IN ('teaching_method', 'software', 'language', 'research', 'other')),
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(20) CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    years_of_experience INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_skills_faculty ON skills(faculty_id);
CREATE INDEX idx_skills_category ON skills(skill_category);

-- =============================================
-- AWARDS & ACHIEVEMENTS
-- =============================================
CREATE TABLE awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    award_title VARCHAR(255) NOT NULL,
    awarded_by VARCHAR(255) NOT NULL,
    award_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_awards_faculty ON awards(faculty_id);

-- =============================================
-- REFERENCES
-- =============================================
CREATE TABLE faculty_references (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    reference_name VARCHAR(255) NOT NULL,
    designation VARCHAR(100),
    organization VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    relationship VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_references_faculty ON faculty_references(faculty_id);

-- =============================================
-- RESUMES
-- =============================================
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    is_default BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resumes_faculty ON resumes(faculty_id);

-- =============================================
-- INSTITUTION PROFILES
-- =============================================
CREATE TABLE institutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    institution_name VARCHAR(255) NOT NULL,
    institution_type VARCHAR(50) NOT NULL CHECK (institution_type IN ('school', 'engineering_college', 'arts_science_college', 'pharmacy_college', 'law_college', 'medical_college', 'management_institute', 'training_center', 'university')),
    board_affiliation VARCHAR(100), -- For schools: CBSE, ICSE, State Board, etc.
    university_affiliation VARCHAR(255),
    establishment_year INTEGER,
    
    -- Verification Details
    udise_code VARCHAR(50),
    aicte_code VARCHAR(50),
    university_code VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    
    -- Contact Information
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    pincode VARCHAR(10),
    phone VARCHAR(20),
    alternate_phone VARCHAR(20),
    website VARCHAR(255),
    
    -- Social Media
    linkedin_url VARCHAR(255),
    facebook_url VARCHAR(255),
    twitter_url VARCHAR(255),
    instagram_url VARCHAR(255),
    
    -- Accreditation & Rankings
    naac_grade VARCHAR(10),
    nba_accredited BOOLEAN DEFAULT FALSE,
    nirf_ranking INTEGER,
    
    -- Infrastructure
    total_area_acres DECIMAL(10,2),
    library_books_count INTEGER,
    computer_labs_count INTEGER,
    has_hostel BOOLEAN DEFAULT FALSE,
    has_sports_facilities BOOLEAN DEFAULT FALSE,
    
    -- Academic Details
    departments JSONB, -- Array of departments
    programs_offered JSONB, -- Array of programs
    total_students INTEGER,
    total_faculty INTEGER,
    
    -- Media
    logo_url VARCHAR(500),
    cover_photo_url VARCHAR(500),
    photos JSONB, -- Array of photo URLs
    virtual_tour_url VARCHAR(500),
    
    -- Description
    about TEXT,
    vision TEXT,
    mission TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_institutions_user ON institutions(user_id);
CREATE INDEX idx_institutions_type ON institutions(institution_type);
CREATE INDEX idx_institutions_city ON institutions(city);
CREATE INDEX idx_institutions_state ON institutions(state);

-- =============================================
-- JOB POSTINGS
-- =============================================
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    
    -- Job Details
    job_title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    subject VARCHAR(100),
    designation VARCHAR(100) NOT NULL,
    job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('full_time', 'part_time', 'visiting', 'contractual', 'temporary')),
    
    -- Requirements
    min_experience INTEGER,
    max_experience INTEGER,
    min_qualification VARCHAR(100),
    required_qualifications JSONB,
    preferred_qualifications JSONB,
    required_skills JSONB,
    
    -- Compensation
    min_salary INTEGER,
    max_salary INTEGER,
    salary_negotiable BOOLEAN DEFAULT TRUE,
    other_benefits TEXT,
    
    -- Job Description
    description TEXT NOT NULL,
    responsibilities TEXT,
    requirements TEXT,
    
    -- Vacancy Details
    total_positions INTEGER DEFAULT 1,
    application_deadline DATE,
    joining_date DATE,
    
    -- Location
    job_location VARCHAR(255),
    is_remote BOOLEAN DEFAULT FALSE,
    
    -- Status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'paused', 'closed', 'filled')),
    is_premium BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

CREATE INDEX idx_jobs_institution ON jobs(institution_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_department ON jobs(department);
CREATE INDEX idx_jobs_designation ON jobs(designation);
CREATE INDEX idx_jobs_location ON jobs(job_location);
CREATE INDEX idx_jobs_published ON jobs(published_at);

-- =============================================
-- JOB APPLICATIONS
-- =============================================
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes(id),
    
    -- Application Details
    cover_letter TEXT,
    expected_salary INTEGER,
    notice_period INTEGER, -- in days
    available_from DATE,
    
    -- Status Tracking
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'shortlisted', 'interview_scheduled', 'rejected', 'accepted', 'withdrawn')),
    status_updated_at TIMESTAMP,
    
    -- Interview Details
    interview_date TIMESTAMP,
    interview_mode VARCHAR(20) CHECK (interview_mode IN ('online', 'offline', 'phone')),
    interview_location VARCHAR(255),
    interview_notes TEXT,
    
    -- Feedback
    recruiter_notes TEXT,
    rejection_reason TEXT,
    
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(job_id, faculty_id)
);

CREATE INDEX idx_applications_job ON job_applications(job_id);
CREATE INDEX idx_applications_faculty ON job_applications(faculty_id);
CREATE INDEX idx_applications_status ON job_applications(status);

-- =============================================
-- SAVED JOBS
-- =============================================
CREATE TABLE saved_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(job_id, faculty_id)
);

CREATE INDEX idx_saved_jobs_faculty ON saved_jobs(faculty_id);
CREATE INDEX idx_saved_jobs_job ON saved_jobs(job_id);

-- =============================================
-- PROFILE VIEWS
-- =============================================
CREATE TABLE profile_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    viewer_institution_id UUID REFERENCES institutions(id) ON DELETE SET NULL,
    viewer_ip VARCHAR(45),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_profile_views_faculty ON profile_views(faculty_id);
CREATE INDEX idx_profile_views_institution ON profile_views(viewer_institution_id);

-- =============================================
-- SAVED SEARCHES
-- =============================================
CREATE TABLE saved_searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty_profiles(id) ON DELETE CASCADE,
    search_name VARCHAR(100) NOT NULL,
    search_criteria JSONB NOT NULL,
    email_alerts BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_saved_searches_faculty ON saved_searches(faculty_id);

-- =============================================
-- NOTIFICATIONS
-- =============================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faculty_profiles_updated_at BEFORE UPDATE ON faculty_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_educational_qualifications_updated_at BEFORE UPDATE ON educational_qualifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_professional_experience_updated_at BEFORE UPDATE ON professional_experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_research_publications_updated_at BEFORE UPDATE ON research_publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_awards_updated_at BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faculty_references_updated_at BEFORE UPDATE ON faculty_references FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_institutions_updated_at BEFORE UPDATE ON institutions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_applications_updated_at BEFORE UPDATE ON job_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_saved_searches_updated_at BEFORE UPDATE ON saved_searches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA VIEWS (Optional - for analytics)
-- =============================================
CREATE VIEW faculty_summary AS
SELECT 
    fp.id,
    fp.first_name || ' ' || fp.last_name AS full_name,
    fp.city,
    fp.state,
    fp.total_experience_years,
    fp.profile_completeness,
    COUNT(DISTINCT eq.id) AS education_count,
    COUNT(DISTINCT pe.id) AS experience_count,
    COUNT(DISTINCT rp.id) AS publications_count,
    COUNT(DISTINCT c.id) AS certifications_count
FROM faculty_profiles fp
LEFT JOIN educational_qualifications eq ON fp.id = eq.faculty_id
LEFT JOIN professional_experience pe ON fp.id = pe.faculty_id
LEFT JOIN research_publications rp ON fp.id = rp.faculty_id
LEFT JOIN certifications c ON fp.id = c.faculty_id
GROUP BY fp.id, fp.first_name, fp.last_name, fp.city, fp.state, fp.total_experience_years, fp.profile_completeness;

-- =============================================
-- COMPLETED
-- =============================================
-- Run this script in your PostgreSQL database
-- Make sure to update the connection credentials in your backend .env file
