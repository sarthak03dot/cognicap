import React, { useState } from 'react'
import CreateUserForm from '../components/CreateUserForm';
import Navbar from '../components/Navbar';
import AdminSidebar from './AdminSidebar';

function CreateUserFromAdmin() {
  const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(false);
  const toggleAdminSidebar = () => {
    setIsAdminSidebarOpen(!isAdminSidebarOpen);
};
  return (
    <div>
    <Navbar/>
        <AdminSidebar isAdminSidebarOpen={isAdminSidebarOpen} toggleAdminSidebar={toggleAdminSidebar} />
            {/* Sidebar */}
            <div className={`main-content ${isAdminSidebarOpen ? 'shifted' : ''}`}>
                <button className="toggle-btn" onClick={toggleAdminSidebar}>
                    ☰
                </button>
                </div>
    <div>CreateUserFromAdmin</div>
    <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h2>Create a New User</h2>
                <CreateUserForm />
            </div>
            </div>
  )
}

export default CreateUserFromAdmin;