# PostgreSQL Setup & Password Reset Guide

## 🔍 Find Your PostgreSQL Installation

PostgreSQL is likely installed at one of these locations:
- `C:\Program Files\PostgreSQL\16\` (or 15, 14, 13)
- `C:\Program Files (x86)\PostgreSQL\`

## 🔐 Reset PostgreSQL Password

### Method 1: Using pgAdmin (Recommended)

1. **Open pgAdmin 4**
2. **Try default credentials:**
   - Username: `postgres`
   - Password: `postgres` or `admin` or leave blank

3. **If you can login to pgAdmin:**
   - Right-click on "PostgreSQL 16" (or your version)
   - Click "Properties"
   - Go to "Connection" tab
   - You'll see the username (usually `postgres`)

4. **Change password in pgAdmin:**
   - Right-click on "Login/Group Roles" → "postgres"
   - Click "Properties"
   - Go to "Definition" tab
   - Enter new password: `postgres123` (or your choice)
   - Click "Save"

### Method 2: Using Command Line

1. **Open Command Prompt as Administrator**

2. **Navigate to PostgreSQL bin folder:**
```cmd
cd "C:\Program Files\PostgreSQL\16\bin"
```
(Replace `16` with your PostgreSQL version)

3. **Connect to PostgreSQL:**
```cmd
psql -U postgres
```

4. **If it asks for password and you don't know it, edit pg_hba.conf:**
   - Find file: `C:\Program Files\PostgreSQL\16\data\pg_hba.conf`
   - Open with Notepad as Administrator
   - Find lines that say `md5` or `scram-sha-256`
   - Change them to `trust` temporarily:
   ```
   # IPv4 local connections:
   host    all             all             127.0.0.1/32            trust
   # IPv6 local connections:
   host    all             all             ::1/128                 trust
   ```
   - Save the file

5. **Restart PostgreSQL Service:**
   - Press `Win + R`
   - Type: `services.msc`
   - Find "postgresql-x64-16" (or your version)
   - Right-click → Restart

6. **Now connect without password:**
```cmd
psql -U postgres
```

7. **Change password:**
```sql
ALTER USER postgres PASSWORD 'postgres123';
```

8. **Exit psql:**
```sql
\q
```

9. **Revert pg_hba.conf back to `scram-sha-256` or `md5`**

10. **Restart PostgreSQL service again**

## ✅ Test Your Connection

After resetting password, update your `.env` file:

```env
DB_USER=postgres
DB_PASSWORD=postgres123
```

## 🚀 Create Database Using pgAdmin

1. Open pgAdmin
2. Login with username: `postgres`, password: `postgres123`
3. Right-click "Databases" → Create → Database
4. Name: `facultyconnect`
5. Click "Save"

## 📝 Run Database Schema

1. Right-click on `facultyconnect` database
2. Click "Query Tool"
3. Click "Open File" icon
4. Navigate to: `d:\Facultyconnect\backend\database\reset_database.sql`
5. Click "Execute" (F5)
6. Then open and execute: `d:\Facultyconnect\backend\database\schema.sql`

## 🎯 Alternative: Use SQLite (Simpler Option)

If PostgreSQL is too complicated, I can help you switch to SQLite which requires no password or setup!

## 📞 Need Help?

If you're still stuck, let me know:
1. Can you open pgAdmin?
2. What error message do you see?
3. Do you want to try SQLite instead?
