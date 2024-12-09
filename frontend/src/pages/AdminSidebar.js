import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/UserDashboard.css';

const AdminSidebar = ({ isAdminSidebarOpen, toggleAdminSidebar }) => {
    return (
        <div className={`sidebar ${isAdminSidebarOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleAdminSidebar}>
                &times;
            </button>
            <ul className="sidebar-menu">
                <li><button><Link to="/adminDashboard">Dashboard</Link></button></li>
                <li><button><Link to="/manageCourses">Manage Courses</Link></button></li>
                <li><button><Link to="/adminDashboard/createUser">Create New User</Link></button></li>
                <li><button><Link to="/communityDocs">Community Docs</Link></button></li>
                <li><button><Link to="/openDiscussion">Open Discussion</Link></button></li>
                <li><button><Link to="/adminDashboard/userManagement">User Management</Link></button></li>
                <li><button><Link to="/settings">Settings</Link></button></li>
            </ul>
        </div>
    );
};

export default AdminSidebar;
