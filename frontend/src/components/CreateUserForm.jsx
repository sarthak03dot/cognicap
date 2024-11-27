import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, TOKEN_GENERATION_CREDENTIALS } from './config';

axios.defaults.baseURL = API_BASE_URL;

const CreateUserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            setLoading(true);
            try {
                const response = await axios.post('/api/auth/generate-token', TOKEN_GENERATION_CREDENTIALS);
                const token = response.data.token;

                if (!token) {
                    throw new Error('Token generation failed');
                }

                localStorage.setItem('token', token);
                console.log('Token fetched and stored:', token);
            } catch (error) {
                console.error('Error fetching token:', error.response?.data || error.message);
                setMessage('Error fetching token. Please try again.');
            } finally {
                setLoading(false);
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
        } catch (error) {
            console.error('Error creating user:', error.response?.data || error.message);
            setMessage(error.response?.data.message || 'Error creating user');
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
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>Create User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateUserForm;
