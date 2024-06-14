import React, { useState } from 'react';
import { fetchUserByEmail, loginUser } from './api';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
    } catch (error) {
      console.error('Erreur de connexion:', error.message);
    }
  };

  const handleSearchUser = async () => {
    try {
      const userData = await fetchUserByEmail(email);
      setUser(userData);
    } catch (error) {
      console.error('Utilisateur non trouvé:', error.message);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Se connecter</button>
      <button onClick={handleSearchUser}>Rechercher utilisateur</button>

      {user && (
        <div>
          <p>Nom: {user.nom}</p>
          <p>Prénom: {user.prenom}</p>
          <p>Email: {user.email}</p>
          {/* Afficher d'autres informations de l'utilisateur si nécessaire */}
        </div>
      )}
    </div>
  );
}

export default App;
