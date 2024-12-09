import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../stylesheets/UserManagement.css';
import Navbar from './Navbar';
import AdminSidebar from '../pages/AdminSidebar';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editEmail, setEditEmail] = useState('');
    const [editPassword, setEditPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('/api/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
                },
            });
            setUsers(response.data);
        } catch (err) {
            setError('Failed to fetch users.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userEmail) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        setLoading(true);
        setError('');
        try {
            await axios.delete(`/api/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token for authentication
                },
            });
            setUsers(users.filter(user => user.email !== userEmail)); // Update the local state
            setSuccess('User deleted successfully.');
        } catch (err) {
            setError('Failed to delete user.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.put(`/api/${selectedUser.id}`, {
                email: editEmail,
                password: editPassword,
            }); // Adjust endpoint accordingly
            fetchUsers(); // Refresh the user list
            setSelectedUser(null); // Close the edit modal
            setSuccess('User updated successfully.');
        } catch (err) {
            setError('Failed to update user.');
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setEditEmail(user.email);
        setEditPassword('');
    };

    const closeEditModal = () => {
        setSelectedUser(null);
        setEditEmail('');
        setEditPassword('');
    };

    const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
    const toggleAdminSidebar = () => {
        setIsAdminSidebarOpen(!isAdminSidebarOpen);
    };

    return (
        <>
            <Navbar />
            <AdminSidebar
                isAdminSidebarOpen={isAdminSidebarOpen}
                toggleAdminSidebar={toggleAdminSidebar}
            />
            <div className={`main-content ${isAdminSidebarOpen ? 'shifted' : ''}`}>
                <button className="toggle-btn" onClick={toggleAdminSidebar}>
                    ☰
                </button>
            </div>
            <div className="user-management-container">
                <h1>User Management</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {/* Restrict actions based on role */}
                                    {user.role === 'user' ? (
                                        <>
                                            <button onClick={() => openEditModal(user)}>Edit</button>
                                            <button onClick={() => handleDeleteUser(user.email)}>Delete</button>
                                        </>
                                    ) : (
                                        <span>Read Only</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Edit User Modal */}
                {selectedUser && (
                    <div className="edit-user-modal">
                        <div className="modal-content">
                            <h2>Edit User</h2>
                            <form onSubmit={handleEditUser}>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    required
                                />
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={editPassword}
                                    onChange={(e) => setEditPassword(e.target.value)}
                                    required
                                />
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={closeEditModal}>
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default UserManagement;
