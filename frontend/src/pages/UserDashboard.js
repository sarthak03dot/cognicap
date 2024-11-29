import React, { useState } from 'react';
import '../stylesheets/UserDashboard.css';

const UserDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>
                    &times;
                </button>
                <ul className="sidebar-menu">
                    <li><button>User Profiles</button></li>
                    <li><button>Purchased Courses</button></li>
                    <li><button>Community Docs</button></li>
                    <li><button>Open Discussion</button></li>
                    <li><button>All Courses</button></li>
                    <li><button>Blogs</button></li>
                </ul>
                {/* Logo */}
            <div className="logo-container">
                <img src="/images/logo.png" alt="Logo" className="logo" />
            </div>
            </div>

            {/* Main Content */}
            <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    ☰
                </button>
                <h1>User Dashboard</h1>
                <p>Welcome, normal user! Here are your features.</p>
            </div>
        </div>
    );
};

export default UserDashboard;
