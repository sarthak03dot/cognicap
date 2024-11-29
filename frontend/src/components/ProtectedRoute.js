import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    console.log('ProtectedRoute Debug:', {
        token,
        userRole,
        requiredRole,
    });

    // Redirect to login if not authenticated
    if (!token) {
        console.warn('User is not authenticated. Redirecting to login...');
        return <Navigate to="/" />;
    }

    // Redirect to unauthorized if role doesn't match
    if (requiredRole && userRole !== requiredRole) {
        console.warn(`Role mismatch. Required: ${requiredRole}, Found: ${userRole}`);
        return <Navigate to="/unauthorized" />;
    }

    return children; // Render the component if all checks pass
};

export default ProtectedRoute;
