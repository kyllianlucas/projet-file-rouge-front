import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UpdateUserForm from './UpdateUser';
import { AuthProvider } from './AuthContext'; // Importer AuthProvider
import { useAuth } from './AuthContext'; // Importer useAuth

const App = () => {
  const { isAdmin } = useAuth(); // Vérifier si l'utilisateur est un admin

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/update" element={<UpdateUserForm />} />
          {isAdmin && (
            <>
              
            </>
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
