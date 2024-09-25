import React from 'react';

const PasswordCriteriaModal = ({ isOpen, onClose, criteria }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <h2>Critères du mot de passe</h2>
        <ul>
          {!criteria.minLength && (
            <li>Le mot de passe doit contenir au moins 12 caractères</li>
          )}
          {!criteria.uppercase && (
            <li>Le mot de passe doit contenir une lettre majuscule</li>
          )}
          {!criteria.digit && (
            <li>Le mot de passe doit contenir un chiffre</li>
          )}
          {!criteria.specialChar && (
            <li>Le mot de passe doit contenir un caractère spécial</li>
          )}
        </ul>
        <button onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  );
};

export default PasswordCriteriaModal;
