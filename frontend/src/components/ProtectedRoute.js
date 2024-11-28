import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated, requiredRole, userRole }) => {
    console.log('ProtectedRoute Debug:', {
        isAuthenticated,
        requiredRole,
        userRole,
    });

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
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
