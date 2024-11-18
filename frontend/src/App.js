import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Login page
import Dashboard from './pages/Dashboard'; // Dashboard page
import SuperAdminDashboard from './pages/SuperAdminDashboard'; // Super Admin dashboard

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Login Route */}
                <Route path="/" element={<LoginPage />} />
                
                {/* General Dashboard Route (For Admins or Users) */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Super Admin Dashboard Route */}
                <Route path="/superadmin" element={<SuperAdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
