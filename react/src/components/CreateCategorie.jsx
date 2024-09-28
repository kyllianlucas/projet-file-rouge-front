import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Remplacez useHistory par useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Récupérer le token d'authentification
    const token = localStorage.getItem('jwt-token');

    if (!token) {
      alert('Vous devez être connecté pour créer une catégorie.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/admin/categorie/creer', {
        categoryName: categoryName,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Ajouter le token aux en-têtes
        },
      });

      if (response.status === 201) {
        setSuccess('Catégorie créée avec succès !');
        setCategoryName('');
        
        // Redirection vers la page d'accueil après la création réussie
        setTimeout(() => navigate('/'), 2000); // Redirection vers la page d'accueil
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Erreur lors de la création de la catégorie.');
      } else {
        setError('Erreur de réseau. Veuillez réessayer.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Créer une Catégorie</h2>
        
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Nom de la Catégorie</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
