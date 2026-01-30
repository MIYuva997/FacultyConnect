# PostgreSQL Database Setup Script for FacultyConnect
# Run this in PowerShell

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PostgreSQL Setup for FacultyConnect" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# PostgreSQL configuration
$PGPATH = "C:\Program Files\PostgreSQL\17\bin"
$env:PGPASSWORD = "postgres"
$PSQL = "$PGPATH\psql.exe"

# Test connection
Write-Host "Step 1: Testing PostgreSQL connection..." -ForegroundColor Yellow
& $PSQL -U postgres -c "SELECT version();" 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Could not connect to PostgreSQL!" -ForegroundColor Red
    Write-Host "Please try these passwords in order:" -ForegroundColor Yellow
    Write-Host "  1. postgres" -ForegroundColor White
    Write-Host "  2. admin" -ForegroundColor White
    Write-Host "  3. root" -ForegroundColor White
    Write-Host ""
    Write-Host "Or reset password using pgAdmin 4" -ForegroundColor Yellow
    Write-Host "See SETUP_POSTGRESQL.md for detailed instructions" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "✓ Connected successfully!" -ForegroundColor Green
Write-Host ""

# Drop existing database
Write-Host "Step 2: Dropping existing database (if exists)..." -ForegroundColor Yellow
& $PSQL -U postgres -c "DROP DATABASE IF EXISTS facultyconnect;" 2>&1 | Out-Null
Write-Host "✓ Done!" -ForegroundColor Green
Write-Host ""

# Create database
Write-Host "Step 3: Creating facultyconnect database..." -ForegroundColor Yellow
& $PSQL -U postgres -c "CREATE DATABASE facultyconnect;"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Database created!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to create database" -ForegroundColor Red
    pause
    exit 1
}
Write-Host ""

# Run schema
Write-Host "Step 4: Running database schema..." -ForegroundColor Yellow
& $PSQL -U postgres -d facultyconnect -f "database\schema.sql"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Schema created successfully!" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to run schema" -ForegroundColor Red
    pause
    exit 1
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Database setup complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "You can now start your backend server:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
pause
