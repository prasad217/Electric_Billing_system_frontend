import React, { useState } from 'react';

const UserRegister = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [electricityBoardNumber, setElectricityBoardNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (name && address && phoneNumber && electricityBoardNumber && email && password) {
      try {
        const response = await fetch('http://localhost:3001/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            address,
            phone_number: phoneNumber,
            electricity_board_number: electricityBoardNumber,
            email,
            password,
          }),
        });

        if (response.ok) {
          alert('User registered successfully!');
          const result = await response.json();
          console.log(result);
        } else {
          const errorResult = await response.json();
          alert(`User registration failed: ${errorResult.error}`);
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred during registration.');
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <input type="text" placeholder="Electricity Board Number" value={electricityBoardNumber} onChange={(e) => setElectricityBoardNumber(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default UserRegister;
