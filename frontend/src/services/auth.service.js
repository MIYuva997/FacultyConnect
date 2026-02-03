import api from './api';

const authService = {
    /**
     * Register a new faculty member
     * @param {Object} data - Registration data
     * @returns {Promise} Response with userId, email, userType
     */
    registerFaculty: async (data) => {
        // Split name into first_name and last_name
        const nameParts = data.name.trim().split(' ');
        const first_name = nameParts[0];
        const last_name = nameParts.slice(1).join(' ') || nameParts[0];

        const payload = {
            email: data.email,
            password: data.password,
            phone: data.phone || '0000000000', // Temporary - need to add phone field to form
            first_name,
            last_name,
        };

        return await api.post('/auth/register/faculty', payload);
    },

    /**
     * Register a new institution
     * @param {Object} data - Registration data
     * @returns {Promise} Response with userId, email, userType
     */
    registerInstitution: async (data) => {
        const payload = {
            email: data.email,
            password: data.password,
            phone: data.phone,
            institution_name: data.institutionName,
            institution_type: data.institutionType,
        };

        return await api.post('/auth/register/institution', payload);
    },

    /**
     * Login user (faculty or institution)
     * @param {string} email
     * @param {string} password
     * @returns {Promise} Response with token and user data
     */
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });

        // Store token and user data
        if (response.success && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response;
    },

    /**
     * Verify OTP after registration
     * @param {string} email
     * @param {string} otp
     * @returns {Promise} Response with token and user data
     */
    verifyOTP: async (email, otp) => {
        const response = await api.post('/auth/verify-otp', { email, otp });

        // Store token and user data
        if (response.success && response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response;
    },

    /**
     * Resend OTP
     * @param {string} email
     * @returns {Promise} Success response
     */
    resendOTP: async (email) => {
        return await api.post('/auth/resend-otp', { email });
    },

    /**
     * Get current authenticated user
     * @returns {Promise} User profile data
     */
    getCurrentUser: async () => {
        return await api.get('/auth/me');
    },

    /**
     * Logout user
     */
    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    /**
     * Check if user is authenticated
     * @returns {boolean}
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('authToken');
    },

    /**
     * Get stored user data
     * @returns {Object|null}
     */
    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
};

export default authService;
