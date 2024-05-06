import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminHomePage from './components/AdminHomePage';
import HomePage from './components/HomePage';
import UserHomePage from './components/UserHomePage';
import PaymentSuccessPage from './components/PaymentSuccessPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Routes */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user/register" element={<UserRegister />} />

          {/* Administrator Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Default Route */}
          <Route path="/" element={<HomePage />} /> 
          <Route path="/admin/home" element={<AdminHomePage />} />
          <Route path="/user/home" element={<UserHomePage />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
