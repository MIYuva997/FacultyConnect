import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import authService from '../services/auth.service';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const FacultyRegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setApiError('');

    try {
      const response = await authService.registerFaculty(data);

      if (response.success) {
        // Navigate to OTP verification page
        navigate('/verify-otp', {
          state: {
            email: data.email,
            userType: 'faculty',
          },
        });
      }
    } catch (error) {
      setApiError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f8fafc] flex items-center justify-center px-4 pt-32 pb-12">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/50 to-white"></div>
      </div>

      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-white rounded-[24px] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] p-7 md:p-8 border border-slate-100">
          {/* Header */}
          <div className="text-center mb-6">
            <a href="/" className="inline-flex items-center space-x-2 mb-4 group text-left">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black text-lg tracking-tighter uppercase">FC</span>
              </div>
              <span className="text-xl font-black text-dark tracking-tight">Faculty<span className="text-secondary">Connect</span></span>
            </a>
            <h2 className="text-2xl font-black text-dark mb-1 tracking-tight">
              Faculty Join
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Build your professional profile</p>
          </div>

          {/* Error Message */}
          {apiError && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-shake">
              <span className="text-red-500 text-sm">⚠️</span>
              <p className="text-red-800 text-[11px] font-bold leading-tight">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black text-dark/70 uppercase tracking-widest mb-1.5 ml-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-slate-900 ${errors.name ? 'border-red-300' : ''}`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-black text-dark/70 uppercase tracking-widest mb-1.5 ml-1">
                Academic Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-slate-900 ${errors.email ? 'border-red-300' : ''}`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-[10px] font-bold text-red-500 mt-1 ml-1 uppercase">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-black text-dark/70 uppercase tracking-widest mb-1.5 ml-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-slate-900 ${errors.password ? 'border-red-300' : ''}`}
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-dark/70 uppercase tracking-widest mb-1.5 ml-1">
                  Confirm
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm font-bold text-slate-900 ${errors.confirmPassword ? 'border-red-300' : ''}`}
                  disabled={isLoading}
                />
              </div>
            </div>
            {(errors.password || errors.confirmPassword) && (
              <p className="text-[10px] font-bold text-red-500 ml-1 uppercase">
                {errors.password?.message || errors.confirmPassword?.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl font-black text-sm text-white transition-all duration-300 flex items-center justify-center gap-2 group ${isLoading
                ? 'bg-slate-200 cursor-not-allowed'
                : 'bg-primary hover:bg-accent hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95'
                } mt-4`}
            >
              {isLoading ? 'PROCESSING...' : (
                <>
                  <span>CREATE ACCOUNT</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">
              Already a member?{' '}
              <a
                href="/login"
                className="text-primary hover:text-accent font-black decoration-2 hover:underline transition-all underline-offset-4"
              >
                Sign In Instead
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyRegisterForm;
