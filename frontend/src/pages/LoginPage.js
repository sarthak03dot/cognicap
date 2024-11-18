import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });

            // Save user info in local storage
            localStorage.setItem('userInfo', JSON.stringify(data));

            // Redirect based on role
            if (data.role === 'superAdmin') {
                navigate('/superadmin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(
                'Login failed',
                error.response ? error.response.data.message : error.message
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
