// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Calculate OTP expiry time
const getOTPExpiry = () => {
    const minutes = parseInt(process.env.OTP_EXPIRE_MINUTES) || 10;
    return new Date(Date.now() + minutes * 60 * 1000);
};

// Verify if OTP is still valid
const isOTPValid = (otpExpiresAt) => {
    return new Date() < new Date(otpExpiresAt);
};

module.exports = {
    generateOTP,
    getOTPExpiry,
    isOTPValid,
};
