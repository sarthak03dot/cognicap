import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token'); // Get token for authentication
    const userRole = localStorage.getItem('role'); // Get user's role

    // console.log('ProtectedRoute Debug:', {
    //     token,
    //     userRole,
    //     requiredRole,
    // });s

    // Redirect to login if not authenticated
    if (!token) {
        console.warn('User is not authenticated. Redirecting to login...');
        return <Navigate to="/" />;
    }

    // Handle multiple roles in requiredRole
    if (requiredRole) {
        const rolesArray = requiredRole.split(',').map((role) => role.trim()); // Split and trim roles
        if (!rolesArray.includes(userRole)) {
            console.warn(`Role mismatch. Required: ${rolesArray}, Found: ${userRole}`);
            return <Navigate to="/unauthorized" />;
        }
    }

    return children; // Render the child component if all checks pass
};

export default ProtectedRoute;