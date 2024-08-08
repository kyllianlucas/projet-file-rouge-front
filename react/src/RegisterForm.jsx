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
    adresses: [{
      pays: '',
      codePostal: '',
      complementAdresse: '',
      rue: '',
      ville: ''
    }]
  });
  const [showVerification, setShowVerification] = useState(false);

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      validatePassword(value);
    }

    if (name.startsWith('adresses.')) {
      const fieldName = name.split('.')[1];
      setUser(prevUser => ({
        ...prevUser,
        adresses: [{
          ...prevUser.adresses[0],
          [fieldName]: value
        }]
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        [name]: value
      }));
    }
  };  

  const validatePassword = (password) => {
    const lengthValid = password.length >= 12;
    const uppercaseValid = /[A-Z]/.test(password);
    const specialCharValid = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~?]/.test(password);
    const numberValid = /\d/.test(password);

    setPasswordValidations({
      length: lengthValid,
      uppercase: uppercaseValid,
      specialChar: specialCharValid,
      number: numberValid
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!length || !uppercase || !specialChar || !number) {
      console.error('Erreur de validation: Le mot de passe ne respecte pas toutes les règles.');
      return;
    }

    try {
      console.log(user);
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
          {/* Affichage des règles de validation du mot de passe */}
          <div style={{marginTop: '10px'}}>
            <p>Votre mot de passe doit contenir :</p>
            <ul>
              <li style={{ color: passwordValidations.length ? 'green' : 'red' }}>
                {passwordValidations.length ? '✔️' : '❌'} Au moins 12 caractères
              </li>
              <li style={{ color: passwordValidations.uppercase ? 'green' : 'red' }}>
                {passwordValidations.uppercase ? '✔️' : '❌'} Une lettre majuscule
              </li>
              <li style={{ color: passwordValidations.specialChar ? 'green' : 'red' }}>
                {passwordValidations.specialChar ? '✔️' : '❌'} Un caractère spécial
              </li>
              <li style={{ color: passwordValidations.number ? 'green' : 'red' }}>
                {passwordValidations.number ? '✔️' : '❌'} Un chiffre
              </li>
            </ul>
          </div>
          <input type="text" name="telephone" placeholder="Téléphone" value={user.telephone} onChange={handleChange} required />
          <input type="text" name="adresses.pays" placeholder="Pays" value={user.adresses.pays} onChange={handleChange} required />
          <input type="text" name="adresses.codePostal" placeholder="Code Postal" value={user.adresses.codePostal} onChange={handleChange} required />
          <input type="text" name="adresses.complementAdresse" placeholder="Complément d'adresse" value={user.adresses.complementAdresse} onChange={handleChange} />
          <input type="text" name="adresses.rue" placeholder="Rue" value={user.adresses.rue} onChange={handleChange} required />
          <input type="text" name="adresses.ville" placeholder="Ville" value={user.adresses.ville} onChange={handleChange} required />
          <button type="submit">S&#39;inscrire</button>
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
