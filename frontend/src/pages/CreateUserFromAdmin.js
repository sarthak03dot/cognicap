import React from 'react'
import CreateUserForm from '../components/CreateUserForm';

function CreateUserFromAdmin() {
  return (
    <div>
    <div>CreateUserFromAdmin</div>
    <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
                <h2>Create a New User</h2>
                <CreateUserForm />
            </div>
            </div>
  )
}

export default CreateUserFromAdmin;