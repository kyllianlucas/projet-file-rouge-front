import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CreateArticleForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prix, setPrix] = useState(0.0);
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [sousCategoryName, setSousCategoryName] = useState(''); // Nom de la sous-catégorie
  const [taille, setTaille] = useState(''); // Taille pour Tee-shirt
  const [genre, setGenre] = useState(''); // Genre: Homme, Femme, Enfant
  const { token } = useAuth();
  const navigate = useNavigate();

  // Définir les options de taille en fonction du genre
  const getTailleOptions = () => {
    if (genre === 'enfant') {
      return ['XS', 'S', 'M', 'L', 'XL']; // Tailles pour enfant
    } else {
      return ['S', 'M', 'L', 'XL']; // Tailles pour adulte (Homme/Femme)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('article', JSON.stringify({ name, description, quantite, prix }));
    formData.append('categoryName', categoryId); // Ajout du nom de la catégorie
    formData.append('sousCategoryName', sousCategoryName); // Ajout du nom de la sous-catégorie
    formData.append('taille', taille); // Ajout de la taille
    formData.append('genre', genre); // Ajout du genre

    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('/api/users/articles/creerArticle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Article créé:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création de l\'article:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Créer un nouvel article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom de l&#39;article</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantité</label>
          <input
            type="number"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prix</label>
          <input
            type="number"
            step="0.01"
            value={prix}
            onChange={(e) => setPrix(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="" disabled>Choisir la catégorie de l&#39;article</option>
            <option value="volant">Volant</option>
            <option value="raquette">Raquette</option>
            <option value="chaussure">Chaussure</option>
            <option value="tee-shirt">Tee-shirt</option>
            <option value="accessoire">Accessoire</option>
          </select>
        </div>

        {categoryId === 'tee-shirt' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>Choisir le genre</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="enfant">Enfant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Taille</label>
              <select
                value={taille}
                onChange={(e) => setTaille(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="" disabled>Choisir la taille</option>
                {getTailleOptions().map((tailleOption) => (
                  <option key={tailleOption} value={tailleOption}>
                    {tailleOption}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Créer l&#39;article
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticleForm;
  