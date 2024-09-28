import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState({
    prenom: '',
    nom: '',
    numeroMobile: '',
    motDePasse: '',
    adresse: {
      rue: '',
      nomBatiment: '',
      ville: '',
      pays: '',
      codePostal: '',
    },
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('adresse.')) {
      const adresseKey = name.split('.')[1];
      setUser((prevUser) => ({
        ...prevUser,
        adresse: {
          ...prevUser.adresse,
          [adresseKey]: value,
        },
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('jwt-token');
    if (!token) {
      alert('Vous devez être connecté pour mettre à jour l\'utilisateur.');
      return;
    }

    try {
      const response = await axios.put('http://localhost:8080/api/public/users/update', { email, ...user }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSuccess('Utilisateur mis à jour avec succès !');
        
        // Redirection vers la page d'accueil ou une autre page
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erreur lors de la mise à jour de l\'utilisateur.');
      } else {
        setError('Erreur de réseau. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Modifier Utilisateur</h2>
        
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (obligatoire)</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={user.prenom}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={user.nom}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="numeroMobile" className="block text-sm font-medium text-gray-700">Numéro Mobile</label>
            <input
              type="text"
              id="numeroMobile"
              name="numeroMobile"
              value={user.numeroMobile}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="motDePasse" className="block text-sm font-medium text-gray-700">Mot de Passe</label>
            <input
              type="password"
              id="motDePasse"
              name="motDePasse"
              value={user.motDePasse}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">Adresse</h3>
          <div className="mb-4">
            <label htmlFor="adresse.rue" className="block text-sm font-medium text-gray-700">Rue</label>
            <input
              type="text"
              id="adresse.rue"
              name="adresse.rue"
              value={user.adresse.rue}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="adresse.nomBatiment" className="block text-sm font-medium text-gray-700">Nom du bâtiment</label>
            <input
              type="text"
              id="adresse.nomBatiment"
              name="adresse.nomBatiment"
              value={user.adresse.nomBatiment}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="adresse.ville" className="block text-sm font-medium text-gray-700">Ville</label>
            <input
              type="text"
              id="adresse.ville"
              name="adresse.ville"
              value={user.adresse.ville}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="adresse.pays" className="block text-sm font-medium text-gray-700">Pays</label>
            <input
              type="text"
              id="adresse.pays"
              name="adresse.pays"
              value={user.adresse.pays}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="adresse.codePostal" className="block text-sm font-medium text-gray-700">Code Postal</label>
            <input
              type="text"
              id="adresse.codePostal"
              name="adresse.codePostal"
              value={user.adresse.codePostal}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Mettre à jour
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
