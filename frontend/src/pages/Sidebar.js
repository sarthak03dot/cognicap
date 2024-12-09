import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/UserDashboard.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={toggleSidebar}>
                &times;
            </button>
            <ul className="sidebar-menu">
                <li><button><Link to="/userDashboard">Home</Link></button></li>
                <li><button><Link to="/profile">Your Coding Profile</Link></button></li>
                <li><button>Active Courses</button></li>
                <li><button>Community Docs</button></li>
                <li><button><Link to="/openDiscussion">Open Discussion</Link></button></li>
                <li><button>All Courses</button></li>
                <li><button>Blogs</button></li>
                <li><button>Settings</button></li>
            </ul>
        </div>
    );
};

export default Sidebar;
