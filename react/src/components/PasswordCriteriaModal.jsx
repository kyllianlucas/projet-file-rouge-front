import React from 'react';

const PasswordCriteriaModal = ({ isOpen, onClose, criteria }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Critères du mot de passe</h2>
        <ul className="list-disc pl-5 space-y-2">
          {!criteria.minLength && (
            <li className="text-red-500">Le mot de passe doit contenir au moins 12 caractères</li>
          )}
          {!criteria.uppercase && (
            <li className="text-red-500">Le mot de passe doit contenir une lettre majuscule</li>
          )}
          {!criteria.digit && (
            <li className="text-red-500">Le mot de passe doit contenir un chiffre</li>
          )}
          {!criteria.specialChar && (
            <li className="text-red-500">Le mot de passe doit contenir un caractère spécial</li>
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default PasswordCriteriaModal;
