import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PasswordCriteriaModal from './PasswordCriteriaModal'; // Assure-toi que le chemin est correct

const Register = () => {
  const [user, setUser] = useState({
    prenom: '',
    nom: '',
    email: '',
    numeroMobile: '',
    motDePasse: '',
    adresse: {
      rue: '',
      nomBatiment: '',
      ville: '',
      pays: '',
      codePostal: ''
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const validatePassword = (password) => {
    const minLength = password.length >= 12;
    const uppercase = /[A-Z]/.test(password);
    const digit = /\d/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return { minLength, uppercase, digit, specialChar };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/inscription', user);
      console.log('Token:', response.data['jwt-token']);
      // Gérer le token (par exemple, le stocker dans le localStorage)
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      // Optionnel : Afficher un message d'erreur utilisateur
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in user.adresse) {
      setUser({
        ...user,
        adresse: { ...user.adresse, [name]: value }
      });
    } else {
      setUser({ ...user, [name]: value });
    }

    if (name === 'motDePasse') {
      const criteria = validatePassword(value);
      setModalOpen(!Object.values(criteria).every(Boolean)); // Ouvre le modal si des critères sont manquants
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-80" onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="prenom">Prénom</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="prenom"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="nom">Nom</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="nom"
            name="nom"
            value={user.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="numeroMobile">Numéro de téléphone</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="tel"
            id="numeroMobile"
            name="numeroMobile"
            value={user.numeroMobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-sm font-medium mb-1" htmlFor="motDePasse">Mot de passe</label>
          <input
            className="w-full px-3 py-2 border rounded pr-10"
            type={showPassword ? 'text' : 'password'}
            id="motDePasse"
            name="motDePasse"
            value={user.motDePasse}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="rue">Rue</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="rue"
            name="rue"
            value={user.adresse.rue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="nomBatiment">Nom du bâtiment</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="nomBatiment"
            name="nomBatiment"
            value={user.adresse.nomBatiment}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="ville">Ville</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="ville"
            name="ville"
            value={user.adresse.ville}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="pays">Pays</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="pays"
            name="pays"
            value={user.adresse.pays}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="codePostal">Code postal</label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            id="codePostal"
            name="codePostal"
            value={user.adresse.codePostal}
            onChange={handleChange}
            required
          />
        </div>
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">S&#39;inscrire</button>
      </form>
      <PasswordCriteriaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        criteria={validatePassword(user.motDePasse)}
      />
    </div>
  );
};

export default Register;
