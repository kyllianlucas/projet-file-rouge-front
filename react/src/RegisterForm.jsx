import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './css/register.css';  // Si vous avez des styles personnalisés supplémentaires

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

  const [passwordVisible, setPasswordVisible] = useState(false);  // État pour gérer la visibilité du mot de passe

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

    if (!passwordValidations.length || !passwordValidations.uppercase || !passwordValidations.specialChar || !passwordValidations.number) {
      console.error('Erreur de validation: Le mot de passe ne respecte pas toutes les règles.');
      return;
    }

    try {
      console.log(user);
      const response = await axios.post('/api/users/register', user);
      console.log('Utilisateur enregistré:', response.data);
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
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="nom" placeholder="Nom" value={user.nom} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="prenom" placeholder="Prénom" value={user.prenom} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="date" name="dateNaissance" placeholder="Date de naissance" value={user.dateNaissance} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />

        <div className="relative">
          <input 
            type={passwordVisible ? "text" : "password"}  
            name="password" 
            placeholder="Mot de passe" 
            value={user.password} 
            onChange={handleChange} 
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

        <div className="mt-4">
          <p>Votre mot de passe doit contenir :</p>
          <ul className="list-disc list-inside">
            <li className={passwordValidations.length ? 'text-green-500' : 'text-red-500'}>
              {passwordValidations.length ? '✔️' : '❌'} Au moins 12 caractères
            </li>
            <li className={passwordValidations.uppercase ? 'text-green-500' : 'text-red-500'}>
              {passwordValidations.uppercase ? '✔️' : '❌'} Une lettre majuscule
            </li>
            <li className={passwordValidations.specialChar ? 'text-green-500' : 'text-red-500'}>
              {passwordValidations.specialChar ? '✔️' : '❌'} Un caractère spécial
            </li>
            <li className={passwordValidations.number ? 'text-green-500' : 'text-red-500'}>
              {passwordValidations.number ? '✔️' : '❌'} Un chiffre
            </li>
          </ul>
        </div>
        
        <input type="text" name="telephone" placeholder="Téléphone" value={user.telephone} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="adresses.pays" placeholder="Pays" value={user.adresses.pays} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="adresses.codePostal" placeholder="Code Postal" value={user.adresses.codePostal} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="adresses.complementAdresse" placeholder="Complément d'adresse" value={user.adresses.complementAdresse} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="adresses.rue" placeholder="Rue" value={user.adresses.rue} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" name="adresses.ville" placeholder="Ville" value={user.adresses.ville} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">S&#39;inscrire</button>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default RegisterForm;
