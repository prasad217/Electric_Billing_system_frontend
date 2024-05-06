import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch('http://localhost:3001/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          console.log('Login successful');
          // Perform any necessary actions after successful login
        } else {
          console.error('Login failed:', response.statusText);
          // Handle failed login
        }
      } catch (error) {
        console.error('Error logging in:', error);
        // Handle error
      }
    } else {
      alert('Please enter both email and password.');
    }
  };

  return (
    <div>
      <h2>Administrator Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
