import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const LoginForm = ({ onForgotPasswordClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { email, password });
      console.log('Utilisateur connecté:', response.data);
      // Rediriger ou mettre à jour l'état après la connexion réussie
    } catch (error) {
      if (error.response) {
        console.error('Réponse serveur:', error.response.data);
      } else if (error.request) {
        console.error('Pas de réponse du serveur:', error.request);
      } else {
        console.error('Erreur:', error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Se connecter</button>
      <p onClick={onForgotPasswordClick} style={{ cursor: 'pointer', color: 'blue' }}>
        Mot de passe oublié ?
      </p>
    </form>
  );
};

LoginForm.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
