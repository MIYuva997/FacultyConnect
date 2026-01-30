# FacultyConnect Backend API

Backend API for FacultyConnect - A comprehensive faculty job portal platform.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up PostgreSQL database**
```bash
# Create database
createdb facultyconnect

# Run schema
psql -d facultyconnect -f database/schema.sql
```

3. **Configure environment variables**
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your configuration
# Update DB_PASSWORD, EMAIL credentials, JWT_SECRET
```

4. **Start the server**
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── database/
│   └── schema.sql          # PostgreSQL database schema
├── src/
│   ├── config/             # Configuration files
│   │   ├── database.js     # PostgreSQL connection
│   │   └── multer.js       # File upload config
│   ├── middleware/         # Express middleware
│   │   ├── auth.js         # JWT authentication
│   │   ├── validation.js   # Request validation
│   │   └── upload.js       # File upload middleware
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── facultyController.js
│   │   └── jobController.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── faculty.js
│   │   └── jobs.js
│   ├── utils/              # Utility functions
│   │   ├── email.js        # Email service
│   │   ├── otp.js          # OTP generation
│   │   └── validators.js   # Validation schemas
│   └── app.js              # Express app setup
├── uploads/                # File uploads directory
├── .env                    # Environment variables
├── .env.example            # Environment template
├── package.json
└── server.js               # Entry point
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /register/faculty` - Faculty registration
- `POST /register/institution` - Institution registration
- `POST /login` - User login
- `POST /verify-otp` - Verify OTP
- `POST /resend-otp` - Resend OTP
- `GET /me` - Get current user (protected)

### Faculty (`/api/faculty`)
All routes require authentication and faculty role.

- `GET /profile` - Get faculty profile
- `PUT /profile` - Update profile
- `POST /profile/photo` - Upload profile photo
- `POST /profile/resume` - Upload resume
- `POST /education` - Add education
- `POST /experience` - Add experience
- `GET /dashboard` - Get dashboard data

### Jobs (`/api/jobs`)
- `GET /` - List all jobs (with filters)
- `GET /:id` - Get job details
- `POST /` - Create job (institution only)
- `POST /:id/apply` - Apply for job (faculty only)
- `POST /:id/save` - Save/unsave job (faculty only)
- `GET /applied/list` - Get applied jobs (faculty only)

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**Include the token in requests:**
```
Authorization: Bearer <your_token>
```

## 📧 Email Configuration

For email functionality (OTP, notifications), configure your SMTP settings in `.env`:

**Gmail Example:**
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the app password in `EMAIL_PASSWORD`

## 🗄️ Database Schema

The database includes the following main tables:
- `users` - Base authentication
- `faculty_profiles` - Faculty details
- `institutions` - Institution profiles
- `jobs` - Job postings
- `job_applications` - Applications
- `educational_qualifications` - Education history
- `professional_experience` - Work experience
- `research_publications` - Research work
- `certifications` - Certifications
- `skills` - Skills & expertise
- `saved_jobs` - Bookmarked jobs
- `profile_views` - Profile analytics

## 🛠️ Development

```bash
# Run in development mode with auto-reload
npm run dev

# Check health
curl http://localhost:5000/health
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | development |
| `PORT` | Server port | 5000 |
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_NAME` | Database name | facultyconnect |
| `DB_USER` | Database user | postgres |
| `DB_PASSWORD` | Database password | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | Token expiry | 7d |
| `EMAIL_HOST` | SMTP host | smtp.gmail.com |
| `EMAIL_PORT` | SMTP port | 587 |
| `EMAIL_USER` | Email address | - |
| `EMAIL_PASSWORD` | Email password | - |
| `FRONTEND_URL` | Frontend URL | http://localhost:5173 |

## 🚨 Error Handling

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## 📄 License

ISC
