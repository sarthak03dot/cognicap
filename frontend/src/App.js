import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UnauthorizedPage from './pages/Unauthorized.js';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);

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
