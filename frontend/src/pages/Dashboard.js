import React from 'react';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('userInfo')); // Adjust according to your auth setup

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>User Role: {user?.role || 'Unknown'}</p>
            {/* Display role-specific options */}
            {/* {user?.role === 'superAdmin' && <p>You can manage admins & users both.</p>} */}
            {user?.role === 'admin' && <p>You can manage users.</p>}
            {user?.role === 'user' && <p>Welcome, normal user.</p>}
        </div>
    );
};

export default Dashboard;
