import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import HomePage from './HomePage';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UpdateUserForm from './UpdateUser';
import CreateArticle from './CreateArticle'; // Importer le composant de création d'article
import UpdateArticle from './UpdateArticle'; // Importer le composant de mise à jour d'article
import ArticleDetail from './ArticleDetail'; // Importer le composant de détail d'article
import { AuthProvider, useAuth } from './AuthContext';

const App = () => {
  const { isAdmin } = useAuth(); // Utilisation de useAuth pour récupérer isAdmin

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/update/:id" element={<UpdateUserForm />} />
        <Route path="/articles/:id" element={<ArticleDetail />} /> {/* Route pour voir le détail d'un article */}
        {isAdmin && (
          <>
            {/* Routes réservées aux admins */}
            <Route path="/create-article" element={<CreateArticle />} />
            <Route path="/update-article/:id" element={<UpdateArticle />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

// Assurez-vous que App est enveloppé par AuthProvider
const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
