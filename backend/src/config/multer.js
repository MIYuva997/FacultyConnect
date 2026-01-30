const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = {
    photos: './uploads/photos',
    resumes: './uploads/resumes',
    documents: './uploads/documents',
    institutions: './uploads/institutions',
};

Object.values(uploadDirs).forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadPath = './uploads/documents';

        if (file.fieldname === 'photo' || file.fieldname === 'profile_photo') {
            uploadPath = uploadDirs.photos;
        } else if (file.fieldname === 'resume') {
            uploadPath = uploadDirs.resumes;
        } else if (file.fieldname === 'institution_photos' || file.fieldname === 'logo') {
            uploadPath = uploadDirs.institutions;
        }

        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    // Allowed file types
    const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
    const allowedDocTypes = /pdf|doc|docx/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (file.fieldname === 'photo' || file.fieldname === 'profile_photo' ||
        file.fieldname === 'institution_photos' || file.fieldname === 'logo') {
        // Image validation
        if (allowedImageTypes.test(extname.substring(1)) && mimetype.startsWith('image/')) {
            return cb(null, true);
        } else {
            return cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
        }
    } else if (file.fieldname === 'resume') {
        // Resume validation
        if (allowedDocTypes.test(extname.substring(1)) &&
            (mimetype === 'application/pdf' || mimetype.includes('document'))) {
            return cb(null, true);
        } else {
            return cb(new Error('Only PDF and DOC files are allowed for resumes'));
        }
    }

    cb(null, true);
};

// Multer configuration
const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    },
    fileFilter: fileFilter,
});

module.exports = upload;
