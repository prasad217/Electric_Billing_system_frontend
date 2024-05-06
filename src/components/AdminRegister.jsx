import React, { useState } from 'react';

function AdminRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch('http://localhost:3001/admin/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password })
          });
          if (response.ok) {
              const data = await response.json();
              console.log('Admin registration successful:', data);
              // Handle registration success (e.g., redirect)
          } else {
              console.error('Admin registration failed');
              // Handle errors or registration failure
          }
      } catch (error) {
          console.error('Network error:', error);
          // Handle network errors
      }
  };
  

    return (
        <div className="register-container">
            <h2>Admin Registration</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default AdminRegister;
