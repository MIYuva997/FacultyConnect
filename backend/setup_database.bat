@echo off
REM Quick PostgreSQL Setup Script for FacultyConnect

echo ========================================
echo PostgreSQL Setup for FacultyConnect
echo ========================================
echo.

REM Set PostgreSQL path (using version 17)
set PGPATH=C:\Program Files\PostgreSQL\17\bin
set PGPASSWORD=postgres

echo Step 1: Testing PostgreSQL connection...
"%PGPATH%\psql.exe" -U postgres -c "SELECT version();"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: Could not connect to PostgreSQL!
    echo Please check:
    echo 1. PostgreSQL service is running
    echo 2. Password is correct (currently trying: postgres)
    echo.
    echo To reset password, see SETUP_POSTGRESQL.md
    pause
    exit /b 1
)

echo.
echo Step 2: Dropping existing database (if exists)...
"%PGPATH%\psql.exe" -U postgres -c "DROP DATABASE IF EXISTS facultyconnect;"

echo.
echo Step 3: Creating facultyconnect database...
"%PGPATH%\psql.exe" -U postgres -c "CREATE DATABASE facultyconnect;"

echo.
echo Step 4: Running reset script...
"%PGPATH%\psql.exe" -U postgres -d facultyconnect -f "database\reset_database.sql"

echo.
echo Step 5: Running schema script...
"%PGPATH%\psql.exe" -U postgres -d facultyconnect -f "database\schema.sql"

echo.
echo ========================================
echo Database setup complete!
echo ========================================
echo.
echo You can now start your backend server:
echo   npm run dev
echo.
pause
