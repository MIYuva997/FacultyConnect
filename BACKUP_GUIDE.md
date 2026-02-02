# FacultyConnect - Backup & Storage Guide

**Last Updated:** January 30, 2026  
**Project:** FacultyConnect Backend

---

## ✅ Current Backup Status

### **GitHub Repository (Cloud Backup)**
- **Repository:** https://github.com/MIYuva997/FacultyConnect.git
- **Status:** ✅ Active and Up-to-date
- **Last Push:** January 30, 2026
- **Branch:** main

**What's Backed Up:**
- ✅ All backend source code
- ✅ Database schema files
- ✅ Configuration files (.env.example)
- ✅ Documentation
- ✅ Learning guides
- ✅ Setup scripts

**What's NOT in GitHub (Excluded by .gitignore):**
- ❌ `.env` file (contains passwords - NEVER commit!)
- ❌ `node_modules/` (can be reinstalled)
- ❌ `uploads/` folder (user-uploaded files)
- ❌ Database data (only schema is backed up)

---

## 📦 Backup Options Explained

### **Option 1: GitHub (Cloud - FREE)** ⭐ RECOMMENDED
**What:** Your code is already on GitHub!

**Advantages:**
- ✅ Free and unlimited
- ✅ Version control (track all changes)
- ✅ Accessible from anywhere
- ✅ Collaboration ready
- ✅ Automatic backup on every push

**How to Access:**
1. Visit: https://github.com/MIYuva997/FacultyConnect
2. View all your code online
3. Clone to any computer: `git clone https://github.com/MIYuva997/FacultyConnect.git`

**Current Status:** ✅ ACTIVE

---

### **Option 2: Google Drive (Cloud Storage)**
**What:** Upload project folder to Google Drive

**Advantages:**
- ✅ 15GB free storage
- ✅ Easy to use
- ✅ Accessible from anywhere
- ✅ Can backup uploads folder
- ✅ Can backup database exports

**How to Setup:**
1. Install Google Drive Desktop app
2. Create folder: `Google Drive/FacultyConnect`
3. Copy your project: `d:\Facultyconnect` → `Google Drive/FacultyConnect`
4. Auto-syncs to cloud

**What to Backup:**
- Backend code (already in GitHub, but extra safety)
- `uploads/` folder (user files)
- Database export files
- `.env` file (encrypted or password-protected zip)

**Cost:** FREE (15GB)

---

### **Option 3: OneDrive (Cloud Storage)**
**What:** Microsoft's cloud storage (comes with Windows)

**Advantages:**
- ✅ 5GB free (or more with Microsoft 365)
- ✅ Built into Windows
- ✅ Auto-sync
- ✅ Easy access

**How to Setup:**
1. Open OneDrive (already installed on Windows)
2. Create folder: `OneDrive/FacultyConnect`
3. Copy project files
4. Auto-syncs

**Cost:** FREE (5GB) or $1.99/month (100GB)

---

### **Option 4: External Hard Drive (Local Backup)**
**What:** Physical backup on USB drive or external HDD

**Advantages:**
- ✅ Full control
- ✅ No internet needed
- ✅ Fast backup/restore
- ✅ Can backup everything (including database)

**How to Setup:**
1. Connect external drive (e.g., E:)
2. Create folder: `E:/Backups/FacultyConnect`
3. Copy entire project
4. Update weekly/monthly

**Recommended:**
- Use 1TB external HDD (~$50)
- Or 64GB USB drive (~$10)

---

### **Option 5: Dropbox (Cloud Storage)**
**What:** Popular cloud storage service

**Advantages:**
- ✅ 2GB free
- ✅ Easy sharing
- ✅ Version history

**Cost:** FREE (2GB) or $11.99/month (2TB)

---

## 🎯 Recommended Backup Strategy

### **3-2-1 Backup Rule:**
- **3** copies of your data
- **2** different storage types
- **1** offsite backup

### **For FacultyConnect:**

**Primary (Working Copy):**
- 📁 `d:\Facultyconnect` (Your local machine)

**Backup 1 (Cloud - Code):**
- ☁️ GitHub (https://github.com/MIYuva997/FacultyConnect)
- Updates: Every time you push code

**Backup 2 (Cloud - Full Project):**
- ☁️ Google Drive or OneDrive
- Updates: Weekly or after major changes
- Includes: Code + uploads + database exports

**Backup 3 (Local - Emergency):**
- 💾 External Hard Drive
- Updates: Monthly
- Full system backup

---

## 📋 What to Backup

### **1. Source Code** ✅
**Location:** `d:\Facultyconnect\backend\`  
**Backup to:** GitHub (already done!)  
**Frequency:** Every time you make changes

**How:**
```bash
git add .
git commit -m "Your message"
git push origin main
```

---

### **2. Database** 🗄️
**What:** Your PostgreSQL data (users, jobs, applications)

**How to Backup:**

**Option A: Using pgAdmin (Easy)**
1. Open pgAdmin
2. Right-click `facultyconnect` database
3. Click "Backup..."
4. Choose location: `d:\Facultyconnect\backups\`
5. Filename: `facultyconnect_2026-01-30.backup`
6. Click "Backup"

**Option B: Using Command Line**
```bash
# Create backup
pg_dump -U postgres -d facultyconnect > backup_2026-01-30.sql

# Or with password
$env:PGPASSWORD="postgres123"
& "C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" -U postgres -d facultyconnect > backup.sql
```

**Restore Database:**
```bash
psql -U postgres -d facultyconnect < backup_2026-01-30.sql
```

**Frequency:** 
- Development: Weekly
- Production: Daily (automated)

---

### **3. Uploaded Files** 📁
**Location:** `d:\Facultyconnect\backend\uploads\`  
**Contains:** Photos, resumes, documents

**Backup to:**
- Google Drive: `Google Drive/FacultyConnect/uploads/`
- External Drive: `E:/Backups/FacultyConnect/uploads/`

**Frequency:** Weekly or when files are added

---

### **4. Environment Variables** 🔐
**File:** `d:\Facultyconnect\backend\.env`  
**Contains:** Passwords, secrets, API keys

**⚠️ IMPORTANT:** Never upload to GitHub!

**How to Backup Safely:**
1. **Option A:** Encrypted zip file
   - Right-click `.env` → Send to → Compressed folder
   - Set password
   - Upload to Google Drive

2. **Option B:** Password manager
   - Store in LastPass, 1Password, etc.

3. **Option C:** Secure note
   - Write down passwords in notebook
   - Keep in safe place

---

### **5. Documentation** 📚
**Files:**
- README.md
- INTERACTIVE_LEARNING.md
- PROJECT_COMPLETION_REPORT.md
- USE_CASE_DOCUMENT.md

**Backup to:** GitHub (already done!)

---

## 🔄 Automated Backup Script

### **Windows Batch Script**

Create: `d:\Facultyconnect\backup.bat`

```batch
@echo off
echo ========================================
echo FacultyConnect Backup Script
echo ========================================
echo.

REM Set variables
set PROJECT_DIR=d:\Facultyconnect
set BACKUP_DIR=E:\Backups\FacultyConnect
set DATE=%date:~-4,4%%date:~-10,2%%date:~-7,2%

REM Create backup directory
if not exist "%BACKUP_DIR%\%DATE%" mkdir "%BACKUP_DIR%\%DATE%"

echo Backing up code...
xcopy "%PROJECT_DIR%\backend" "%BACKUP_DIR%\%DATE%\backend" /E /I /Y

echo Backing up uploads...
xcopy "%PROJECT_DIR%\backend\uploads" "%BACKUP_DIR%\%DATE%\uploads" /E /I /Y

echo Backing up database...
set PGPASSWORD=postgres123
"C:\Program Files\PostgreSQL\17\bin\pg_dump.exe" -U postgres -d facultyconnect > "%BACKUP_DIR%\%DATE%\database_backup.sql"

echo.
echo ========================================
echo Backup Complete!
echo Location: %BACKUP_DIR%\%DATE%
echo ========================================
pause
```

**How to Use:**
1. Save the script
2. Update `BACKUP_DIR` to your external drive
3. Double-click to run
4. Backup created with today's date

---

## 📊 Backup Checklist

### **Daily (If in Production):**
- [ ] Database backup
- [ ] Push code to GitHub

### **Weekly:**
- [ ] Full project backup to Google Drive
- [ ] Backup uploaded files
- [ ] Test restore process

### **Monthly:**
- [ ] External hard drive backup
- [ ] Verify all backups are accessible
- [ ] Clean old backups (keep last 3 months)

---

## 🆘 Disaster Recovery

### **Scenario 1: Laptop Crashed**
**Solution:**
1. Get new computer
2. Clone from GitHub: `git clone https://github.com/MIYuva997/FacultyConnect.git`
3. Install Node.js and PostgreSQL
4. Restore database from Google Drive backup
5. Copy uploads folder from Google Drive
6. Create new `.env` file with saved passwords
7. Run `npm install`
8. Run `npm run dev`

**Time to Recover:** 1-2 hours

---

### **Scenario 2: Accidentally Deleted Files**
**Solution:**
1. Check GitHub for code
2. Check Google Drive for recent backup
3. Check external drive for monthly backup
4. Use Git to restore: `git checkout -- filename`

---

### **Scenario 3: Database Corrupted**
**Solution:**
1. Find latest database backup
2. Drop current database
3. Create new database
4. Restore from backup:
   ```bash
   psql -U postgres -d facultyconnect < backup.sql
   ```

---

## 💡 Best Practices

### **DO:**
- ✅ Push to GitHub after every coding session
- ✅ Backup database before major changes
- ✅ Keep multiple backup locations
- ✅ Test restore process regularly
- ✅ Document your backup passwords safely

### **DON'T:**
- ❌ Commit `.env` file to GitHub
- ❌ Rely on single backup location
- ❌ Forget to backup uploaded files
- ❌ Store passwords in plain text online
- ❌ Ignore backup warnings

---

## 📱 Quick Reference

### **Push Code to GitHub:**
```bash
cd d:\Facultyconnect
git add .
git commit -m "Your changes"
git push origin main
```

### **Backup Database:**
```bash
pg_dump -U postgres -d facultyconnect > backup.sql
```

### **Clone Project (New Computer):**
```bash
git clone https://github.com/MIYuva997/FacultyConnect.git
cd FacultyConnect
npm install
```

---

## 🎯 Your Current Setup

### **✅ What You Have:**
1. **GitHub Repository** - Code backed up ✅
2. **Local Project** - `d:\Facultyconnect` ✅
3. **Running Server** - Port 5000 ✅
4. **Database** - PostgreSQL with data ✅

### **📋 Recommended Next Steps:**
1. **Setup Google Drive sync** (15 minutes)
2. **Create first database backup** (5 minutes)
3. **Get external hard drive** (optional, $10-50)
4. **Setup weekly backup reminder** (calendar)

---

## 🔗 Useful Links

- **Your GitHub:** https://github.com/MIYuva997/FacultyConnect
- **Google Drive:** https://drive.google.com
- **OneDrive:** https://onedrive.live.com
- **Git Documentation:** https://git-scm.com/doc

---

**Remember:** The best backup is the one you actually do! Start with GitHub (already done ✅) and add one more backup location for safety.

---

**Document Version:** 1.0  
**Last Updated:** January 30, 2026
