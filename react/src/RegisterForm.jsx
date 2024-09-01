import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './css/register.css'; 

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

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Veuillez vérifier que vous n'êtes pas un robot.");
      return;
    }

    try {
      const response = await axios.post('/api/users/register', user);
      console.log('Utilisateur enregistré:', response.data);

      onRegisterSuccess();
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

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
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
      <div className="relative">
        <input
          type={passwordVisible ? 'text' : 'password'}
          name="password"
          placeholder="Mot de passe"
          value={user.password}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded pr-12"
        />
        <span
          className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
        </span>
      </div>
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
      <ReCAPTCHA
        sitekey="6Le34CUqAAAAAKhzxQkC-s2gmTKhuvPg6exqoywG"
        onChange={handleCaptchaChange}
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        S&#39;inscrire
      </button>
    </form>
  );
};

RegisterForm.propTypes = {
  onRegisterSuccess: PropTypes.func.isRequired,
};

export default RegisterForm;
