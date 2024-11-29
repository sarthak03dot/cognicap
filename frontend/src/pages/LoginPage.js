import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // For error handling
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear any previous error messages

        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });

            // Debugging: Log the response data
            console.log('Login response:', data);

            // Save token and role in localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            // Redirect based on role
            if (data.role === 'superadmin') {
                navigate('/superadmin');
            } else if (data.role === 'admin') {
                navigate('/adminDashboard');
            } else if (data.role === 'user') {
                navigate('/userDashboard');
            } else {
                // Fallback for unexpected roles
                console.warn('Unexpected role:', data.role);
                setErrorMessage('Invalid role. Please contact support.');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data.message : error.message);

            // Set error message for user feedback
            setErrorMessage(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : 'Something went wrong. Please try again.'
            );
        }
    };

    return (
        
        <div className="login-container">
        <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {/* Show error message if login fails */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        </div>
        
    );
};

export default LoginPage;
