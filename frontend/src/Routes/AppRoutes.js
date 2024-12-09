import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CodingProfile from '../pages/CodingProfile';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateUserFromAdmin from '../pages/CreateUserFromAdmin';
import UserManagement from '../components/UserManagement';

const AppRoutes = () => {
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
        <Routes>
        <Route
                    path="/profile"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            requiredRole="user"
                            userRole={role}
                        >
                            <CodingProfile />
                        </ProtectedRoute>
                    }
                />
        <Route
                    path="/adminDashboard/createUser"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            requiredRole="admin"
                            userRole={role}
                        >
                            <CreateUserFromAdmin />
                        </ProtectedRoute>
                    }
                />
            <Route
                    path="/adminDashboard/userManagement"
                    element={
                        <ProtectedRoute
                            isAuthenticated={isAuthenticated}
                            requiredRole="admin"
                            userRole={role}
                        >
                            <UserManagement />
                        </ProtectedRoute>
                    }
                />
        </Routes>
    );
};

export default AppRoutes;
