// src/pages/AdminDashboard.js
import React from 'react';
import CreateUserForm from '../components/CreateUserForm';

const AdminDashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here, you can manage users and perform admin tasks.</p>

            <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h2>Create a New User</h2>
                <CreateUserForm />
            </div>
        </div>
    );
};

export default AdminDashboard;
