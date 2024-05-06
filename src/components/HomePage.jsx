import React from 'react';
import './HomePage.css';  // Import the CSS for styling

const HomePage = () => {
  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-container">
          <button onClick={() => window.location.href = '/user/login'}>User Login/Register</button>
          <button onClick={() => window.location.href = '/admin/login'}>Admin Login</button>
        </div>
      </nav>
      <div className="content">
        <h1>Welcome to the Electricity Board</h1>
        <ul>
          <li>Turn off lights and electronics when you are not in the room.</li>
          <li>Replace old appliances with energy-efficient models.</li>
          <li>Use natural light whenever possible.</li>
          <li>Consider solar panels as an alternative energy source.</li>
          <li>Practice regular maintenance on your electrical appliances.</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
