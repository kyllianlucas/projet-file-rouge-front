import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
