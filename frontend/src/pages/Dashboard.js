// src/pages/Dashboard.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo')); // Adjust based on your auth setup

    useEffect(() => {
        if (user?.role === 'admin') {
            navigate('/adminDashboard'); // Redirect to admin dashboard
        } else if (user?.role === 'user') {
            navigate('/userDashboard'); // Redirect to user dashboard
        } else {
            navigate('/login'); // Redirect to login if no valid role found
        }
    }, [user, navigate]);

    return (
        <div>
            <h1>Loading Dashboard...</h1>
        </div>
    );
};

export default Dashboard;
