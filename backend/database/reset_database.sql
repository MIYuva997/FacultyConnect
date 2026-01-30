-- =============================================
-- RESET DATABASE SCRIPT
-- =============================================
-- This script drops all existing tables and recreates them
-- WARNING: This will delete ALL data in the database!

-- Drop all views first
DROP VIEW IF EXISTS faculty_summary CASCADE;

-- Drop all tables in reverse order of dependencies
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS saved_searches CASCADE;
DROP TABLE IF EXISTS profile_views CASCADE;
DROP TABLE IF EXISTS saved_jobs CASCADE;
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS jobs CASCADE;
DROP TABLE IF EXISTS institutions CASCADE;
DROP TABLE IF EXISTS resumes CASCADE;
DROP TABLE IF EXISTS faculty_references CASCADE;
DROP TABLE IF EXISTS awards CASCADE;
DROP TABLE IF EXISTS skills CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS research_publications CASCADE;
DROP TABLE IF EXISTS professional_experience CASCADE;
DROP TABLE IF EXISTS educational_qualifications CASCADE;
DROP TABLE IF EXISTS faculty_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop the trigger function
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Now you can run schema.sql to recreate everything
