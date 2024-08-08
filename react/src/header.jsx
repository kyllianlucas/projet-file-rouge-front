import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';
import VerificationCodeForm from './VerificationCodeForm';

const App = () => {
  const [registeredEmail, setRegisteredEmail] = useState('');
  const navigate = useNavigate();

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    navigate('/verificationCode');
  };

  return (
    <div>
      <header>
        <h1>Notre Application</h1>
        <div>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<h1>Bienvenue sur notre site!</h1>} />
          <Route path="/login" element={<LoginForm onForgotPasswordClick={() => navigate('/resetPassword')} />} />
          <Route path="/register" element={<RegisterForm onRegisterSuccess={handleRegisterSuccess} />} />
          <Route path="/resetPassword" element={<ResetPasswordForm />} />
          <Route path="/verificationCode" element={<VerificationCodeForm email={registeredEmail} />} />
        </Routes>
      </main>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
