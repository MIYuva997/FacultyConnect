import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import FacultyRegister from '../pages/auth/FacultyRegister';
import InstitutionRegister from '../pages/auth/InstitutionRegister';
import VerifyOTP from '../pages/auth/VerifyOTP';
import FacultyDashboard from '../pages/dashboard/FacultyDashboard';
import InstitutionDashboard from '../pages/dashboard/InstitutionDashboard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProtectedRoute from '../components/ProtectedRoute';



function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
                <Route path="/login" element={<><Navbar /><LoginPage /><Footer /></>} />
                <Route path="/register/faculty" element={<><Navbar /><FacultyRegister /><Footer /></>} />
                <Route path="/register/institution" element={<><Navbar /><InstitutionRegister /><Footer /></>} />
                <Route path="/verify-otp" element={<><Navbar /><VerifyOTP /><Footer /></>} />

                {/* Protected Faculty Routes */}
                <Route
                    path="/dashboard/faculty"
                    element={
                        <ProtectedRoute requiredRole="faculty">
                            <><Navbar /><FacultyDashboard /><Footer /></>
                        </ProtectedRoute>
                    }
                />

                {/* Protected Institution Routes */}
                <Route
                    path="/dashboard/institution"
                    element={
                        <ProtectedRoute requiredRole="institution">
                            <><Navbar /><InstitutionDashboard /><Footer /></>
                        </ProtectedRoute>
                    }
                />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
