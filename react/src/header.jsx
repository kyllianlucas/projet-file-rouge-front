import React, { useState } from 'react';
import './App.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import ResetPasswordForm from './ResetPasswordForm';
import VerificationCodeForm from './VerificationCodeForm';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleRegisterSuccess = (email) => {
    setRegisteredEmail(email);
    setCurrentPage('verificationCode');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <RegisterForm onRegisterSuccess={handleRegisterSuccess} />;
      case 'login':
        return <LoginForm onForgotPasswordClick={() => setCurrentPage('resetPassword')} />;
      case 'resetPassword':
        return <ResetPasswordForm />;
      case 'verificationCode':
        return <VerificationCodeForm email={registeredEmail} />;
      default:
        return <h1>Bienvenue sur notre site!</h1>;
    }
  };

  return (
    <div>
      <header>
        <h1>Notre Application</h1>
        <div>
          <button onClick={() => setCurrentPage('login')}>Login</button>
          <button onClick={() => setCurrentPage('register')}>Register</button>
        </div>
      </header>

      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
