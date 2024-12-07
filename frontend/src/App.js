import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UnauthorizedPage from './pages/Unauthorized.js';
import './App.css'
import Navbar from './components/Navbar.jsx';
import AppRoutes from './Routes/AppRoutes.js';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const updateMousePosition = (event) => {
            // Normalize mouse position to a 0-1 range
            const normalizedX = (event.clientX / window.innerWidth).toFixed(2);
            const normalizedY = (event.clientY / window.innerHeight).toFixed(2);

            // Update CSS custom properties for gradient effect
            document.body.style.setProperty('--mouse-x', normalizedX);
            document.body.style.setProperty('--mouse-y', normalizedY);
        };

        // Attach mousemove listener
        window.addEventListener('mousemove', updateMousePosition);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    // Fetch role and token on app load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        if (token) {
            setIsAuthenticated(true);
        }
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    return (
        <Router>
        <Navbar />
        <AppRoutes />
            <Routes>
                {/* Public Route */}
                <Route path="/" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            userRole={role}
                        >
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/adminDashboard"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            requiredRole="admin"
                            userRole={role}
                        >
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/userDashboard"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            requiredRole="user"
                            userRole={role}
                        >
                            <UserDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/superadmin"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            requiredRole="superadmin"
                            userRole={role}
                        >
                            <SuperAdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Unauthorized Route */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
        </Router>
    );
};

export default App;
