import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import de PropTypes

const VerificationCodeForm = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/verify-code', { email, verificationCode });
      console.log('Code vérifié:', response.data);
      // Traitez ici la réponse après vérification réussie
    } catch (error) {
      if (error.response) {
        console.error('Réponse serveur:', error.response.data);
        setVerificationError(error.response.data);
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
        type="text"
        name="verificationCode"
        placeholder="Code de vérification"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        required
        pattern="\d{5}"  // Assure que seul un code à 5 chiffres est accepté
        title="Le code doit être composé de 5 chiffres"
      />
      {verificationError && <p style={{ color: 'red' }}>{verificationError}</p>}
      <button type="submit">Vérifier</button>
    </form>
  );
};

// Validation des props avec PropTypes
VerificationCodeForm.propTypes = {
  email: PropTypes.string.isRequired, // email est requis et doit être une chaîne de caractères
};

export default VerificationCodeForm;
