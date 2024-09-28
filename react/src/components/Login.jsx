import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour contrôler la visibilité du mot de passe
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/connexion', {
        email,
        motDePasse: password,
      });

      const token = response.data['jwt-token'];

      // Décoder le token pour obtenir le rôle
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log('Token reçu après la connexion :', token);
      console.log('Rôle extrait du token :', role);

      // Stocker le token et le rôle dans le localStorage
      localStorage.setItem('jwt-token', token);

      // Redirection vers la page d'accueil sans recharger la page
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      // Optionnel : Afficher un message d'erreur utilisateur
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword); // Fonction pour basculer la visibilité du mot de passe

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Connexion</h2>
        
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" // Utilisation de placeholder au lieu de label
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'} // Afficher le mot de passe si showPassword est vrai
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe" // Utilisation de placeholder au lieu de label
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="button" 
              onClick={handleTogglePassword}
              className="absolute right-2 top-2 text-gray-600"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} /> {/* Changer l'icône selon l'état */}
            </button>
          </div>
          
          {/* Lien pour le mot de passe oublié */}
          <p className="mt-2 text-right text-blue-600 hover:underline cursor-pointer">
            Mot de passe oublié ?
          </p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Se connecter
        </button>
        
        {/* Lien vers la page d'inscription */}
        <p className="mt-4 text-center text-gray-600">
          Pas de compte ? <a href="/register" className="text-blue-600 hover:underline">S&#39;inscrire</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
