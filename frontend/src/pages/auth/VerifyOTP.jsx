import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

export default function VerifyOTP() {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState('');

    const email = location.state?.email;
    const userType = location.state?.userType;

    useEffect(() => {
        // Redirect if no email in state
        if (!email) {
            navigate('/login');
        }
    }, [email, navigate]);

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await authService.verifyOTP(email, otp);

            if (response.success) {
                // Navigate to appropriate dashboard
                if (userType === 'faculty') {
                    navigate('/dashboard/faculty');
                } else {
                    navigate('/dashboard/institution');
                }
            }
        } catch (err) {
            setError(err.message || 'Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setResendLoading(true);
        setResendMessage('');
        setError('');

        try {
            const response = await authService.resendOTP(email);
            if (response.success) {
                setResendMessage('OTP sent successfully! Please check your email.');
            }
        } catch (err) {
            setError(err.message || 'Failed to resend OTP. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-amber-50 flex items-center justify-center px-4">
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"></div>
            </div>

            {/* OTP Card */}
            <div className="relative w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-dark mb-2">Verify Your Email</h1>
                        <p className="text-sm text-gray-600">
                            We've sent a 6-digit OTP to<br />
                            <span className="font-semibold text-primary">{email}</span>
                        </p>
                    </div>

                    {/* OTP Form */}
                    <form onSubmit={handleVerify} className="space-y-6">
                        {/* Dev Mode Hint */}
                        {import.meta.env.MODE === 'development' && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl mb-4">
                                <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider mb-1">🛠️ Developer Mode</p>
                                <p className="text-xs text-amber-700">Real emails are disabled. Find your 6-digit OTP in the <b>Backend Terminal v3</b> logs.</p>
                            </div>
                        )}
                        <div>
                            <label className="block text-[11px] font-black text-dark/70 uppercase tracking-widest mb-1.5 ml-1">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                maxLength={6}
                                className="w-full px-4 py-3.5 text-center text-2xl font-bold tracking-[0.5em] bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                placeholder="000000"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                                <p className="text-sm text-red-600 font-medium">{error}</p>
                            </div>
                        )}

                        {/* Resend Message */}
                        {resendMessage && (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                                <p className="text-sm text-green-600 font-medium">{resendMessage}</p>
                            </div>
                        )}

                        {/* Verify Button */}
                        <button
                            type="submit"
                            disabled={isLoading || otp.length !== 6}
                            className="w-full py-3.5 bg-gradient-to-r from-primary via-accent to-secondary text-white rounded-xl font-black text-sm tracking-widest uppercase hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>

                        {/* Resend OTP */}
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendLoading}
                                className="text-sm font-semibold text-primary hover:text-accent transition-colors disabled:opacity-50"
                            >
                                {resendLoading ? 'Sending...' : "Didn't receive OTP? Resend"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
