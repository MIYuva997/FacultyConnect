# 🎓 FacultyConnect Backend - Interactive Learning Session

## 🎯 Welcome!

This is your **hands-on guide** to understanding the FacultyConnect backend. We'll learn by doing!

---

## � Module Descriptions - Complete Reference

### 🏗️ Core Files

#### 1. **server.js** - Entry Point
**Purpose:** Starts the entire application

**What it does:**
- Loads environment variables from `.env`
- Tests database connection
- Starts Express server on port 5000
- Handles graceful shutdown
- Catches unhandled errors

**Key Functions:**
```javascript
startServer()  // Main function that starts everything
```

**When it runs:** When you execute `npm run dev` or `npm start`

---

#### 2. **src/app.js** - Express Application Setup
**Purpose:** Configures the Express application with middleware and routes

**What it does:**
- Sets up CORS (allows frontend to connect)
- Adds security headers (Helmet)
- Parses JSON requests
- Logs requests (Morgan)
- Mounts API routes
- Handles 404 errors
- Global error handling

**Key Middleware:**
- `express.json()` - Parses JSON request bodies
- `cors()` - Enables cross-origin requests
- `helmet()` - Adds security headers
- `morgan()` - Logs HTTP requests

**Routes Mounted:**
- `/api/auth` → Authentication routes
- `/api/faculty` → Faculty routes
- `/api/jobs` → Job routes
- `/api/institution` → Institution routes

---

### 🔧 Configuration Modules

#### 3. **src/config/database.js** - Database Connection
**Purpose:** Manages PostgreSQL connection pool

**What it does:**
- Creates connection pool (reuses connections)
- Provides query helper function
- Provides transaction helper
- Tests database connectivity

**Key Functions:**
```javascript
query(text, params)        // Execute SQL queries
getTransaction()           // Start database transaction
testConnection()           // Test if database is accessible
```

**Example Usage:**
```javascript
const { query } = require('./config/database');
const users = await query('SELECT * FROM users WHERE id = $1', [userId]);
```

**Connection Pool Benefits:**
- Reuses connections (faster)
- Handles multiple requests simultaneously
- Auto-reconnects if connection drops

---

#### 4. **src/config/multer.js** - File Upload Configuration
**Purpose:** Handles file uploads (photos, resumes, documents)

**What it does:**
- Configures storage location (`uploads/` folder)
- Generates unique filenames
- Validates file types (images, PDFs)
- Sets file size limits (5MB)
- Handles upload errors

**Supported File Types:**
- **Images:** .jpg, .jpeg, .png, .gif
- **Documents:** .pdf, .doc, .docx

**Storage Structure:**
```
uploads/
├── photos/
│   └── photo-1234567890.jpg
├── resumes/
│   └── resume-1234567890.pdf
└── documents/
    └── doc-1234567890.pdf
```

---

### 🛡️ Middleware Modules

#### 5. **src/middleware/auth.js** - Authentication Middleware
**Purpose:** Protects routes, ensures user is logged in

**What it does:**
- Extracts JWT token from request headers
- Verifies token is valid
- Fetches user data from database
- Attaches user to request object
- Checks user roles (faculty/institution)
- Verifies email verification status

**Key Functions:**
```javascript
auth                // Check if user is logged in
isFaculty          // Check if user is faculty
isInstitution      // Check if user is institution
isVerified         // Check if email is verified
```

**How it works:**
```javascript
// Request header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Middleware extracts and verifies token
// Adds user data to req.user
// Next middleware/controller can access req.user
```

**Usage Example:**
```javascript
// Protected route - only logged-in users
router.get('/profile', auth, getProfile);

// Faculty-only route
router.post('/education', auth, isFaculty, addEducation);

// Institution-only route
router.post('/jobs', auth, isInstitution, createJob);
```

---

#### 6. **src/middleware/validation.js** - Request Validation
**Purpose:** Validates incoming request data

**What it does:**
- Checks for validation errors
- Returns formatted error messages
- Prevents invalid data from reaching controllers

**Key Function:**
```javascript
validate  // Checks validation results, returns errors if any
```

**Works with:** `express-validator` library

**Example Flow:**
```javascript
// 1. Define validators
const validators = [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
];

// 2. Apply to route
router.post('/register', validators, validate, register);

// 3. If validation fails, returns:
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Invalid email" }
  ]
}
```

---

#### 7. **src/middleware/upload.js** - File Upload Middleware
**Purpose:** Handles file upload requests

**What it does:**
- Wraps Multer upload functions
- Provides specific handlers for different file types
- Handles upload errors gracefully

**Key Functions:**
```javascript
uploadPhoto        // Single photo upload
uploadResume       // Single resume upload
uploadMultiplePhotos  // Multiple photos upload
```

**Usage:**
```javascript
router.post('/photo', auth, uploadPhoto, uploadPhotoController);
```

---

### 🎮 Controller Modules

#### 8. **src/controllers/authController.js** - Authentication Logic
**Purpose:** Handles user registration, login, OTP verification

**What it does:**
- User registration (faculty & institution)
- Password hashing with bcrypt
- OTP generation and verification
- JWT token creation
- Email sending for verification
- Login authentication

**Key Functions:**
```javascript
registerFaculty(req, res)     // Register new faculty
registerInstitution(req, res) // Register new institution
login(req, res)               // User login
verifyOTP(req, res)           // Verify email OTP
resendOTP(req, res)           // Resend OTP
getMe(req, res)               // Get current user info
```

**Registration Flow:**
1. Validate input data
2. Check if user exists
3. Hash password
4. Generate OTP
5. Save user to database
6. Send OTP email
7. Return success response

**Login Flow:**
1. Find user by email
2. Compare password hash
3. Check if verified
4. Create JWT token
5. Return token

---

#### 9. **src/controllers/facultyController.js** - Faculty Management
**Purpose:** Manages faculty profiles, education, experience

**What it does:**
- Get/update faculty profile
- Upload profile photo
- Upload resume
- Add education history
- Add work experience
- Get dashboard statistics

**Key Functions:**
```javascript
getProfile(req, res)          // Get faculty profile
updateProfile(req, res)       // Update profile info
uploadPhoto(req, res)         // Upload profile photo
uploadResume(req, res)        // Upload resume
addEducation(req, res)        // Add education entry
addExperience(req, res)       // Add work experience
getDashboard(req, res)        // Get dashboard data
```

**Profile Data Includes:**
- Personal info (name, phone, bio)
- Current position & institution
- Specialization & research interests
- Education history
- Work experience
- Publications
- Skills
- Awards

---

#### 10. **src/controllers/jobController.js** - Job Management
**Purpose:** Handles job postings and applications

**What it does:**
- Create job postings (institutions)
- Search/filter jobs (public)
- Apply for jobs (faculty)
- Save/bookmark jobs
- Track applications
- Get job details

**Key Functions:**
```javascript
createJob(req, res)           // Create job posting
getJobs(req, res)             // Search jobs with filters
getJobById(req, res)          // Get single job details
applyForJob(req, res)         // Submit job application
saveJob(req, res)             // Save/unsave job
getAppliedJobs(req, res)      // Get user's applications
```

**Job Search Filters:**
- Position type (Assistant/Associate/Full Professor)
- Department
- Location
- Salary range
- Employment type (Full-time/Part-time)
- Keywords

---

### 🛣️ Route Modules

#### 11. **src/routes/auth.js** - Authentication Routes
**Purpose:** Defines authentication API endpoints

**Endpoints:**
```javascript
POST   /api/auth/register/faculty      // Faculty registration
POST   /api/auth/register/institution  // Institution registration
POST   /api/auth/login                 // User login
POST   /api/auth/verify-otp            // Verify email OTP
POST   /api/auth/resend-otp            // Resend OTP
GET    /api/auth/me                    // Get current user (protected)
```

---

#### 12. **src/routes/faculty.js** - Faculty Routes
**Purpose:** Defines faculty-specific API endpoints

**All routes require authentication (`auth` middleware)**

**Endpoints:**
```javascript
GET    /api/faculty/profile            // Get profile
PUT    /api/faculty/profile            // Update profile
POST   /api/faculty/profile/photo      // Upload photo
POST   /api/faculty/profile/resume     // Upload resume
POST   /api/faculty/education          // Add education
POST   /api/faculty/experience         // Add experience
GET    /api/faculty/dashboard          // Dashboard stats
```

---

#### 13. **src/routes/jobs.js** - Job Routes
**Purpose:** Defines job-related API endpoints

**Public Routes:**
```javascript
GET    /api/jobs                       // Search jobs
GET    /api/jobs/:id                   // Get job details
```

**Protected Routes (Faculty):**
```javascript
POST   /api/jobs/:id/apply             // Apply for job
POST   /api/jobs/:id/save              // Save/unsave job
GET    /api/jobs/applied/list          // Get applied jobs
```

**Protected Routes (Institution):**
```javascript
POST   /api/jobs                       // Create job posting
PUT    /api/jobs/:id                   // Update job
DELETE /api/jobs/:id                   // Delete job
```

---

#### 14. **src/routes/institution.js** - Institution Routes
**Purpose:** Defines institution-specific API endpoints

**All routes require authentication + institution role**

**Endpoints:**
```javascript
GET    /api/institution/profile        // Get profile
PUT    /api/institution/profile        // Update profile
POST   /api/institution/profile/photo  // Upload logo
GET    /api/institution/dashboard      // Dashboard stats
```

---

### 🛠️ Utility Modules

#### 15. **src/utils/email.js** - Email Service
**Purpose:** Sends emails using Nodemailer

**What it does:**
- Configures SMTP connection (Gmail)
- Sends OTP verification emails
- Sends welcome emails
- Sends password reset emails
- Uses HTML email templates

**Key Functions:**
```javascript
sendOTPEmail(email, otp)              // Send OTP for verification
sendWelcomeEmail(email, name)         // Send welcome email
sendPasswordResetEmail(email, token)  // Send password reset link
```

**Email Templates:**
- Professional HTML design
- Branded with FacultyConnect
- Responsive for mobile

**Configuration Required:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

---

#### 16. **src/utils/otp.js** - OTP Utilities
**Purpose:** Generate and validate OTP codes

**What it does:**
- Generates 6-digit random OTP
- Calculates expiry time (10 minutes)
- Validates OTP against stored value
- Checks if OTP is expired

**Key Functions:**
```javascript
generateOTP()                         // Returns random 6-digit code
getOTPExpiry()                        // Returns expiry timestamp
validateOTP(provided, stored, expiry) // Checks if OTP is valid
```

**Example:**
```javascript
const otp = generateOTP();           // "123456"
const expiry = getOTPExpiry();       // 10 minutes from now
// Save to database: otp, expiry
// Later, validate:
const isValid = validateOTP(userInput, storedOTP, storedExpiry);
```

---

#### 17. **src/utils/validators.js** - Validation Schemas
**Purpose:** Defines input validation rules using express-validator

**What it does:**
- Validates email format
- Validates password strength
- Validates phone numbers
- Validates UUIDs
- Validates dates
- Custom validation rules

**Key Validators:**
```javascript
registerValidators     // For registration
loginValidators        // For login
otpValidators         // For OTP verification
profileValidators     // For profile updates
educationValidators   // For education entries
experienceValidators  // For experience entries
jobValidators         // For job postings
```

**Example Validation:**
```javascript
registerValidators = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('phone').isMobilePhone('en-IN'),
  body('first_name').trim().notEmpty(),
  body('last_name').trim().notEmpty()
];
```

---

### 🗄️ Database Files

#### 18. **database/schema.sql** - Database Schema
**Purpose:** Creates all database tables, indexes, and triggers

**What it creates:**
- 17 tables with proper relationships
- Foreign key constraints
- Indexes for performance
- Triggers for auto-updating timestamps
- UUID extension for unique IDs

**Tables Created:**
1. `users` - User accounts
2. `faculty_profiles` - Faculty information
3. `educational_qualifications` - Education history
4. `professional_experience` - Work experience
5. `research_publications` - Publications
6. `certifications` - Certifications
7. `skills` - Skills & expertise
8. `awards` - Awards & honors
9. `faculty_references` - References
10. `resumes` - Resume files
11. `institutions` - Institution profiles
12. `jobs` - Job postings
13. `job_applications` - Applications
14. `saved_jobs` - Bookmarked jobs
15. `profile_views` - View tracking
16. `saved_searches` - Saved searches
17. `notifications` - User notifications

---

#### 19. **database/reset_database.sql** - Database Reset
**Purpose:** Drops all tables for clean restart

**What it does:**
- Drops all tables in correct order (respects foreign keys)
- Drops triggers and functions
- Useful for development/testing

**When to use:**
- Starting fresh
- Testing schema changes
- Fixing database corruption

---

### 📄 Configuration Files

#### 20. **.env** - Environment Variables
**Purpose:** Stores sensitive configuration (passwords, secrets)

**Contains:**
```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=facultyconnect
DB_USER=postgres
DB_PASSWORD=postgres123

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads

# CORS
FRONTEND_URL=http://localhost:5173

# OTP
OTP_EXPIRE_MINUTES=10
```

**Security:** Never commit `.env` to Git!

---

#### 21. **package.json** - Project Configuration
**Purpose:** Defines project metadata and dependencies

**Contains:**
- Project name and version
- NPM scripts (`npm run dev`, `npm start`)
- Dependencies list
- Dev dependencies

**Key Scripts:**
```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

**Main Dependencies:**
- `express` - Web framework
- `pg` - PostgreSQL client
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT tokens
- `multer` - File uploads
- `nodemailer` - Email sending
- `express-validator` - Input validation
- `cors` - Cross-origin requests
- `helmet` - Security headers
- `morgan` - Request logging
- `dotenv` - Environment variables

---

## �📚 Session 1: Understanding the Flow

### 🔄 How a Request Works (Visual)

```
User's Browser/App
       ↓
   [HTTP Request]
       ↓
http://localhost:5000/api/auth/login
       ↓
┌──────────────────────────────────┐
│     server.js (Entry Point)      │
│  - Starts Express server         │
│  - Connects to database          │
└──────────────────────────────────┘
       ↓
┌──────────────────────────────────┐
│       src/app.js                 │
│  - Routes the request            │
│  - Applies middleware            │
└──────────────────────────────────┘
       ↓
┌──────────────────────────────────┐
│    src/routes/auth.js            │
│  - Finds matching route          │
│  - POST /login → authController  │
└──────────────────────────────────┘
       ↓
┌──────────────────────────────────┐
│  src/middleware/validation.js    │
│  - Checks email format           │
│  - Checks password length        │
└──────────────────────────────────┘
       ↓
┌──────────────────────────────────┐
│  src/controllers/authController  │
│  - Queries database              │
│  - Compares password             │
│  - Creates JWT token             │
└──────────────────────────────────┘
       ↓
┌──────────────────────────────────┐
│   src/config/database.js         │
│  - Executes SQL query            │
│  - Returns user data             │
└──────────────────────────────────┘
       ↓
   [HTTP Response]
       ↓
{ "success": true, "token": "..." }
```

---

## 🧪 Exercise 1: Trace a Login Request

### Step-by-Step Walkthrough

**Scenario:** User tries to login with email and password

**1. Request Arrives** (`server.js` line 15)
```javascript
app.listen(5000)  // Server receives request on port 5000
```

**2. Route Matching** (`src/routes/auth.js` line 20)
```javascript
router.post('/login', loginValidators, validate, authController.login);
//           ↑ URL    ↑ Validation    ↑ Check  ↑ Handler function
```

**3. Validation** (`src/utils/validators.js`)
```javascript
exports.loginValidators = [
  body('email').isEmail(),           // ✓ Check email format
  body('password').notEmpty()        // ✓ Check password exists
];
```

**4. Controller Logic** (`src/controllers/authController.js`)
```javascript
exports.login = async (req, res) => {
  // Step 1: Get email & password from request
  const { email, password } = req.body;
  
  // Step 2: Find user in database
  const user = await query('SELECT * FROM users WHERE email = $1', [email]);
  
  // Step 3: Compare passwords
  const isValid = await bcrypt.compare(password, user.password_hash);
  
  // Step 4: Create JWT token
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
  // Step 5: Send response
  res.json({ success: true, token });
};
```

---

## 💻 Exercise 2: Your First Code Change

### Task: Add a "Last Login" timestamp

**Files to modify:**
1. Database (already has `last_login` column!)
2. `src/controllers/authController.js`

**Step 1:** Open `src/controllers/authController.js`

**Step 2:** Find the `login` function (around line 100)

**Step 3:** Add this code BEFORE sending the response:

```javascript
// Update last login timestamp
await query(
  'UPDATE users SET last_login = NOW() WHERE id = $1',
  [user.rows[0].id]
);
```

**Step 4:** Save the file

**Step 5:** Test it!
- The server auto-restarts (thanks to nodemon)
- Try logging in
- Check database: `SELECT last_login FROM users;`

**Expected Result:** You should see the current timestamp!

---

## 🔍 Exercise 3: Understanding Middleware

### What is Middleware?

Think of middleware as **security checkpoints** at an airport:

```
Request → [Check Passport] → [Security Scan] → [Gate] → Destination
          ↑ Middleware 1    ↑ Middleware 2    ↑ Final Handler
```

### Example: Authentication Middleware

**File:** `src/middleware/auth.js`

```javascript
exports.auth = async (req, res, next) => {
  // 1. Get token from header
  const token = req.headers.authorization?.split(' ')[1];
  
  // 2. No token? Stop here!
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  // 3. Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  // 4. Get user from database
  const user = await query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
  
  // 5. Attach user to request
  req.user = user.rows[0];
  
  // 6. Continue to next middleware/controller
  next();
};
```

### How to Use It

**Protected Route:**
```javascript
// Only logged-in users can access
router.get('/profile', auth, facultyController.getProfile);
//                     ↑ Middleware checks token first
```

**Public Route:**
```javascript
// Anyone can access
router.get('/jobs', jobController.getJobs);
//                  ↑ No middleware, direct to controller
```

---

## 🎯 Exercise 4: Create Your Own Endpoint

### Task: Create an endpoint to count total users

**Step 1:** Open `src/routes/auth.js`

**Step 2:** Add this route at the bottom:
```javascript
router.get('/stats', authController.getStats);
```

**Step 3:** Open `src/controllers/authController.js`

**Step 4:** Add this function at the bottom:
```javascript
exports.getStats = async (req, res) => {
  try {
    // Count total users
    const totalUsers = await query('SELECT COUNT(*) FROM users');
    
    // Count faculty
    const totalFaculty = await query(
      "SELECT COUNT(*) FROM users WHERE user_type = 'faculty'"
    );
    
    // Count institutions
    const totalInstitutions = await query(
      "SELECT COUNT(*) FROM users WHERE user_type = 'institution'"
    );
    
    res.json({
      success: true,
      stats: {
        totalUsers: totalUsers.rows[0].count,
        totalFaculty: totalFaculty.rows[0].count,
        totalInstitutions: totalInstitutions.rows[0].count
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

**Step 5:** Test it!
```bash
# In browser or Postman
http://localhost:5000/api/auth/stats
```

**Expected Response:**
```json
{
  "success": true,
  "stats": {
    "totalUsers": 0,
    "totalFaculty": 0,
    "totalInstitutions": 0
  }
}
```

---

## 📊 Exercise 5: Understanding Database Queries

### SQL Parameterized Queries (Safe from SQL Injection!)

**❌ NEVER do this:**
```javascript
const email = req.body.email;
query(`SELECT * FROM users WHERE email = '${email}'`);
// Dangerous! User could inject: ' OR '1'='1
```

**✅ ALWAYS do this:**
```javascript
const email = req.body.email;
query('SELECT * FROM users WHERE email = $1', [email]);
// Safe! PostgreSQL handles escaping
```

### Common Query Patterns

**1. SELECT (Get data)**
```javascript
// Get one user
const user = await query('SELECT * FROM users WHERE id = $1', [userId]);
const userData = user.rows[0];  // First result

// Get multiple users
const users = await query('SELECT * FROM users LIMIT 10');
const allUsers = users.rows;  // Array of results
```

**2. INSERT (Create data)**
```javascript
const result = await query(
  'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
  [email, hashedPassword]
);
const newUserId = result.rows[0].id;
```

**3. UPDATE (Modify data)**
```javascript
await query(
  'UPDATE users SET is_verified = true WHERE id = $1',
  [userId]
);
```

**4. DELETE (Remove data)**
```javascript
await query('DELETE FROM users WHERE id = $1', [userId]);
```

---

## 🔐 Exercise 6: Understanding JWT Authentication

### What is JWT?

JWT (JSON Web Token) is like a **digital passport**:

```
Login → Server creates JWT → User stores JWT → User sends JWT with requests
```

### How It Works

**1. Creating a Token (Login)**
```javascript
const token = jwt.sign(
  { userId: user.id, userType: 'faculty' },  // Payload (data)
  'secret_key',                               // Secret (only server knows)
  { expiresIn: '7d' }                        // Expires in 7 days
);

// Token looks like: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**2. Verifying a Token (Protected Routes)**
```javascript
const decoded = jwt.verify(token, 'secret_key');
// decoded = { userId: '123', userType: 'faculty' }
```

**3. Using in Requests**
```
GET /api/faculty/profile
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎨 Exercise 7: Understanding Async/Await

### The Problem: Callbacks (Old Way)

```javascript
// Callback hell 😱
query('SELECT * FROM users', (err, users) => {
  if (err) console.error(err);
  query('SELECT * FROM jobs', (err, jobs) => {
    if (err) console.error(err);
    query('SELECT * FROM applications', (err, apps) => {
      if (err) console.error(err);
      // Finally do something...
    });
  });
});
```

### The Solution: Async/Await (Modern Way)

```javascript
// Clean and readable! 😊
const users = await query('SELECT * FROM users');
const jobs = await query('SELECT * FROM jobs');
const apps = await query('SELECT * FROM applications');
// Do something...
```

### Rules:
1. Use `async` before function
2. Use `await` before promises
3. Wrap in `try/catch` for errors

```javascript
exports.myFunction = async (req, res) => {
  try {
    const result = await query('SELECT * FROM users');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

---

## 🧩 Exercise 8: File Structure Deep Dive

### Understanding Each Folder

```
backend/
│
├── 📂 database/
│   ├── schema.sql          → Creates tables (run once)
│   └── reset_database.sql  → Deletes tables (for testing)
│
├── 📂 src/
│   ├── 📂 config/          → Configuration files
│   │   ├── database.js     → PostgreSQL connection pool
│   │   └── multer.js       → File upload settings
│   │
│   ├── 📂 middleware/      → Request interceptors
│   │   ├── auth.js         → Check if user is logged in
│   │   ├── validation.js   → Validate request data
│   │   └── upload.js       → Handle file uploads
│   │
│   ├── 📂 controllers/     → Business logic (what to do)
│   │   ├── authController.js    → Login, register, OTP
│   │   ├── facultyController.js → Profile, education, experience
│   │   └── jobController.js     → Jobs, applications
│   │
│   ├── 📂 routes/          → URL definitions
│   │   ├── auth.js         → /api/auth/*
│   │   ├── faculty.js      → /api/faculty/*
│   │   ├── jobs.js         → /api/jobs/*
│   │   └── institution.js  → /api/institution/*
│   │
│   ├── 📂 utils/           → Helper functions
│   │   ├── email.js        → Send emails
│   │   ├── otp.js          → Generate/validate OTP
│   │   └── validators.js   → Validation rules
│   │
│   └── app.js              → Express app configuration
│
├── 📂 uploads/             → Uploaded files (photos, resumes)
├── server.js               → Entry point (starts everything)
├── .env                    → Secrets (passwords, keys)
└── package.json            → Dependencies list
```

---

## 🎯 Practice Challenges

### Challenge 1: Add Email to Stats
Modify the `/stats` endpoint to also return:
- Total verified users
- Total unverified users

### Challenge 2: Create a Search Endpoint
Create `/api/faculty/search?name=John` that searches faculty by name

### Challenge 3: Add Logging
Add `console.log()` statements to track:
- When a user logs in
- When a profile is updated
- When a job is created

### Challenge 4: Error Handling
Improve error messages to be more user-friendly

---

## 📚 Next Steps

After completing these exercises:

1. ✅ **Test with Postman** - Try all endpoints
2. ✅ **Read the code** - Open each file and understand it
3. ✅ **Modify code** - Make small changes, see what happens
4. ✅ **Add features** - Create new endpoints
5. ✅ **Build frontend** - Connect a UI to your API

---

## 🆘 Need Help?

### Common Issues

**Server won't start:**
- Check if PostgreSQL is running
- Check `.env` file has correct password

**Database error:**
- Run `reset_database.sql` then `schema.sql`

**Port already in use:**
- Change `PORT=5001` in `.env`

### Debugging Tips

**1. Use console.log everywhere!**
```javascript
console.log('User data:', user);
console.log('Query result:', result.rows);
```

**2. Check terminal output**
- Errors show up in the terminal where `npm run dev` is running

**3. Test with simple queries first**
```javascript
const test = await query('SELECT NOW()');
console.log('Database time:', test.rows[0]);
```

---

## 🎉 Congratulations!

You now understand:
- ✅ How requests flow through the backend
- ✅ How middleware works
- ✅ How to query the database
- ✅ How JWT authentication works
- ✅ How to create new endpoints
- ✅ The entire file structure

**You're ready to build amazing features!** 🚀

---

## 📖 Additional Resources

- **Node.js Docs:** https://nodejs.org/docs
- **Express Guide:** https://expressjs.com/
- **PostgreSQL Tutorial:** https://www.postgresqltutorial.com/
- **JWT.io:** https://jwt.io/
- **MDN Async/Await:** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

Happy coding! 💻✨
