// src/pages/AdminDashboard.js
import React, { useState } from 'react';
import CreateUserForm from '../components/CreateUserForm';
import Navbar from '../components/Navbar';
import AdminSidebar from './AdminSidebar';

const AdminDashboard = () => {
    const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);

    const toggleAdminSidebar = () => {
        setIsAdminSidebarOpen(!isAdminSidebarOpen);
    };
    return (
        
        <div style={{ padding: '20px' }}>
        <Navbar />
        <AdminSidebar isAdminSidebarOpen={isAdminSidebarOpen} toggleAdminSidebar={toggleAdminSidebar} />
            {/* Sidebar */}
            <div className={`main-content ${isAdminSidebarOpen ? 'shifted' : ''}`}>
                <button className="toggle-btn" onClick={toggleAdminSidebar}>
                    ☰
                </button>
                </div>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here, you can manage users and perform admin tasks.</p>

        </div>
    );
};

export default AdminDashboard;
