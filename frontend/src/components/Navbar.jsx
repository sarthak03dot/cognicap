import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem('role'); // Fetch the user's role from localStorage

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/'); // Redirect to login page
    };

    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                {/* <li style={styles.navItem}>
                    <Link to="/" style={styles.navLink}>Home</Link>
                </li> */}
                {/* Conditionally render adminDashboard and superadmin links */}
                {role === 'admin' || role === 'superadmin' ? (
                    <li style={styles.navItem}>
                        <Link to="/adminDashboard" style={styles.navLink}>Admin Dashboard</Link>
                    </li>
                ) : null}
                {role === 'superadmin' ? (
                    <li style={styles.navItem}>
                        <Link to="/superadmin" style={styles.navLink}>Super Admin</Link>
                    </li>
                ) : null}
                <li style={styles.navItem} onClick={handleLogout}>
                    <button style={styles.logoutButton}>Logout</button>
                </li>
            </ul>
            <p style={styles.currentPath}>Current Path: {location.pathname}</p>
        </nav>
    );
};

const styles = {
    navbar: { padding: '10px', backgroundColor: '#333', color: '#fff' },
    navList: { listStyle: 'none', display: 'flex', margin: 0, padding: 0 },
    navItem: { marginRight: '15px' },
    navLink: { textDecoration: 'none', color: '#fff' },
    logoutButton: { backgroundColor: '#f44336', color: '#fff', border: 'none', cursor: 'pointer', padding: '5px 10px' },
    currentPath: { marginTop: '10px', fontSize: '14px' },
};

export default Navbar;
