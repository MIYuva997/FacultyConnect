import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../components/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import FacultyRegister from '../pages/auth/FacultyRegister';
import InstitutionRegister from '../pages/auth/InstitutionRegister';
import FacultyDashboard from '../pages/dashboard/FacultyDashboard';
import InstitutionDashboard from '../pages/dashboard/InstitutionDashboard';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
    // TODO: Replace with actual auth check from AuthContext
    const isAuthenticated = false; // Placeholder
    const userRole = null; // Placeholder: 'faculty' or 'institution'

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
                <Route path="/login" element={<><Navbar /><LoginPage /><Footer /></>} />
                <Route path="/register/faculty" element={<><Navbar /><FacultyRegister /><Footer /></>} />
                <Route path="/register/institution" element={<><Navbar /><InstitutionRegister /><Footer /></>} />

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
