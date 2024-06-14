import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import VerificationCodeForm from './VerificationCodeForm';

const RegisterForm = ({ onRegisterSuccess }) => {
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    email: '',
    password: '',
    telephone: '',
    adresse: {
      pays: '',
      codePostal: '',
      complementAdresse: '',
      rue: '',
      ville: ''
    }
  });
  const [showVerification, setShowVerification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('adresse.')) {
      const fieldName = name.split('.')[1];
      setUser(prevUser => ({
        ...prevUser,
        adresse: {
          ...prevUser.adresse,
          [fieldName]: value
        }
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/register', user);
      console.log('Utilisateur enregistré:', response.data);
      setShowVerification(true);
      onRegisterSuccess(user.email);
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
    <div>
      {!showVerification ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="nom" placeholder="Nom" value={user.nom} onChange={handleChange} required />
          <input type="text" name="prenom" placeholder="Prénom" value={user.prenom} onChange={handleChange} required />
          <input type="date" name="dateNaissance" placeholder="Date de naissance" value={user.dateNaissance} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Mot de passe" value={user.password} onChange={handleChange} required />
          <input type="text" name="telephone" placeholder="Téléphone" value={user.telephone} onChange={handleChange} required />
          <input type="text" name="adresse.pays" placeholder="Pays" value={user.adresse.pays} onChange={handleChange} required />
          <input type="text" name="adresse.codePostal" placeholder="Code Postal" value={user.adresse.codePostal} onChange={handleChange} required />
          <input type="text" name="adresse.complementAdresse" placeholder="Complément d'adresse" value={user.adresse.complementAdresse} onChange={handleChange} />
          <input type="text" name="adresse.rue" placeholder="Rue" value={user.adresse.rue} onChange={handleChange} required />
          <input type="text" name="adresse.ville" placeholder="Ville" value={user.adresse.ville} onChange={handleChange} required />
          <button type="submit">S'inscrire</button>
        </form>
      ) : (
        <VerificationCodeForm email={user.email} />
      )}
    </div>
  );
};

RegisterForm.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default RegisterForm;
