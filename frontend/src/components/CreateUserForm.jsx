// src/components/CreateUserForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, TOKEN_GENERATION_CREDENTIALS } from './config';

axios.defaults.baseURL = API_BASE_URL;

const CreateUserForm = ({ roleOptions = ['user', 'admin'] }) => { // Accept role options as a prop
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(''); 
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                let token = localStorage.getItem('token');
                if (!token) {
                    const response = await axios.post('/api/auth/generate-token', TOKEN_GENERATION_CREDENTIALS);
                    token = response.data.token;
                    localStorage.setItem('token', token);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
                setMessage('Failed to fetch token. Please try again.');
            }
        };

        fetchToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('Token is missing. Please refresh the page.');
                return;
            }

            const response = await axios.post(
                '/api/users/superadmin/create',
                { name, email, password, role },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(response.data.message || 'User created successfully');
            setName('');
            setEmail('');
            setPassword('');
            setRole(roleOptions[0]); // Reset to default role
        } catch (error) {
            console.error('Error creating user:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'Error creating user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        {roleOptions.map((option) => (
                            <option key={option} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={loading}>Create User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateUserForm;
