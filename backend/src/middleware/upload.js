const upload = require('../config/multer');

// Error handling wrapper for multer
const handleUpload = (uploadConfig) => {
    return (req, res, next) => {
        uploadConfig(req, res, (err) => {
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({
                        success: false,
                        message: 'File size too large. Maximum size is 5MB'
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: err.message || 'File upload failed'
                });
            }
            next();
        });
    };
};

module.exports = {
    uploadPhoto: handleUpload(upload.single('photo')),
    uploadResume: handleUpload(upload.single('resume')),
    uploadMultiplePhotos: handleUpload(upload.array('photos', 10)),
    uploadInstitutionLogo: handleUpload(upload.single('logo')),
};
