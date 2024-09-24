import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const role = decodedToken.role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Si le rôle est stocké dans un autre champ
      console.log('Token reçu après la connexion :', token);  // Log du token
      console.log('Rôle extrait du token :', role);  // Log du rôle

      // Stocker le token et le rôle dans le localStorage
      localStorage.setItem('jwt-token', token);

      // Redirection vers la page d'accueil sans recharger la page
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="password">Mot de passe</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
