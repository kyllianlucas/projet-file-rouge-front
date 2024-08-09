import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ onForgotPasswordClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);  // État pour gérer la visibilité du mot de passe

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <div className="relative">
        <input
          type={passwordVisible ? 'text' : 'password'}
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded pr-12"
        />
        <span
          className={`absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500`}
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
        </span>
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Se connecter
      </button>
      <p onClick={onForgotPasswordClick} className="cursor-pointer text-blue-500">
        Mot de passe oublié ?
      </p>
    </form>
  );
};

LoginForm.propTypes = {
  onForgotPasswordClick: PropTypes.func.isRequired,
};

export default LoginForm;
