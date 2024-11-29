import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../stylesheets/Navbar.css'; // Import the CSS for enhanced styles

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth).toFixed(2); // Normalize to 0-1
            const y = (e.clientY / window.innerHeight).toFixed(2);

            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.setProperty('--mouse-x', x);
                navbar.style.setProperty('--mouse-y', y);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Clear everything from localStorage
        navigate('/'); // Redirect to login page
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo-container">
                <img src="/images/logo.png" alt="Logo" className="logo" />
            </div>

            {/* Current Path */}
            <p className="current-path">Current Path: {location.pathname}</p>

            {/* Logout Button */}
            {location.pathname !== '/' && (
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Navbar;
