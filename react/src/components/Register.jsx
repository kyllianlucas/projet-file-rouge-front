import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PasswordCriteriaModal from './PasswordCriteriaModal'; 

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
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
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
      setModalOpen(!Object.values(criteria).every(Boolean));
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form 
        onSubmit={handleRegister} 
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full space-y-4 sm:space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">S&#39;inscrire</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={user.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            id="nom"
            name="nom"
            value={user.nom}
            onChange={handleChange}
            placeholder="Nom"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          id="numeroMobile"
          name="numeroMobile"
          value={user.numeroMobile}
          onChange={handleChange}
          placeholder="Numéro de téléphone"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="motDePasse"
            name="motDePasse"
            value={user.motDePasse}
            onChange={handleChange}
            placeholder="Mot de passe"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="button" 
            onClick={handleTogglePassword}
            className="absolute right-3 top-3 text-gray-600"
          >
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            id="rue"
            name="rue"
            value={user.adresse.rue}
            onChange={handleChange}
            placeholder="Rue"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            id="nomBatiment"
            name="nomBatiment"
            value={user.adresse.nomBatiment}
            onChange={handleChange}
            placeholder="Nom du bâtiment"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="text"
          id="ville"
          name="ville"
          value={user.adresse.ville}
          onChange={handleChange}
          placeholder="Ville"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            id="pays"
            name="pays"
            value={user.adresse.pays}
            onChange={handleChange}
            placeholder="Pays"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            id="codePostal"
            name="codePostal"
            value={user.adresse.codePostal}
            onChange={handleChange}
            placeholder="Code postal"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          S&#39;inscrire
        </button>
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
