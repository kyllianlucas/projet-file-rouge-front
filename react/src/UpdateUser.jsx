import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UpdateUserForm = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    telephone: '',
    adresses: [{
      pays: '',
      codePostal: '',
      complementAdresse: '',
      rue: '',
      ville: ''
    }]
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/api/users/me', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        }
      };

      fetchUserData();
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('adresses')) {
      const addressField = name.split('.')[1];
      setUser(prevState => ({
        ...prevState,
        adresses: [{ ...prevState.adresses[0], [addressField]: value }]
      }));
    } else {
      setUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('/api/users/me', user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Utilisateur mis à jour:', response.data);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données utilisateur:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={user.nom}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={user.prenom}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        name="dateNaissance"
        placeholder="Date de Naissance"
        value={user.dateNaissance}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="tel"
        name="telephone"
        placeholder="Téléphone"
        value={user.telephone}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="adresses.pays"
        placeholder="Pays"
        value={user.adresses[0].pays}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="adresses.codePostal"
        placeholder="Code Postal"
        value={user.adresses[0].codePostal}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="adresses.complementAdresse"
        placeholder="Complément d'Adresse"
        value={user.adresses[0].complementAdresse}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="adresses.rue"
        placeholder="Rue"
        value={user.adresses[0].rue}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="adresses.ville"
        placeholder="Ville"
        value={user.adresses[0].ville}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Mettre à jour
      </button>
    </form>
  );
};

export default UpdateUserForm;
