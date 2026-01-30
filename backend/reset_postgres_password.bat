@echo off
echo ========================================
echo PostgreSQL Password Reset for Windows
echo ========================================
echo.
echo This will reset the postgres user password to: postgres123
echo.
pause

REM Stop PostgreSQL service
echo Stopping PostgreSQL service...
net stop postgresql-x64-17

REM Backup pg_hba.conf
echo Backing up pg_hba.conf...
copy "C:\Program Files\PostgreSQL\17\data\pg_hba.conf" "C:\Program Files\PostgreSQL\17\data\pg_hba.conf.backup"

REM Temporarily allow trust authentication
echo Modifying pg_hba.conf to allow trust authentication...
powershell -Command "(Get-Content 'C:\Program Files\PostgreSQL\17\data\pg_hba.conf') -replace 'scram-sha-256', 'trust' | Set-Content 'C:\Program Files\PostgreSQL\17\data\pg_hba.conf'"

REM Start PostgreSQL service
echo Starting PostgreSQL service...
net start postgresql-x64-17

REM Wait a moment
timeout /t 3

REM Change password
echo Changing password...
"C:\Program Files\PostgreSQL\17\bin\psql.exe" -U postgres -c "ALTER USER postgres PASSWORD 'postgres123';"

REM Restore pg_hba.conf
echo Restoring pg_hba.conf...
copy "C:\Program Files\PostgreSQL\17\data\pg_hba.conf.backup" "C:\Program Files\PostgreSQL\17\data\pg_hba.conf"

REM Restart PostgreSQL service
echo Restarting PostgreSQL service...
net stop postgresql-x64-17
net start postgresql-x64-17

echo.
echo ========================================
echo Password reset complete!
echo New password: postgres123
echo ========================================
echo.
echo Update your .env file with:
echo DB_PASSWORD=postgres123
echo.
pause
