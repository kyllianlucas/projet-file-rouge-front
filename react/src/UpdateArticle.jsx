import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateArticleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prix, setPrix] = useState(0.0);
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    // Charger les détails de l'article à partir de l'API
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setQuantite(response.data.quantite);
        setPrix(response.data.prix);
        setCategoryId(response.data.categoryId);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('article', JSON.stringify({ name, description, quantite, prix }));
    formData.append('categoryId', categoryId);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.put(`/api/articles/majArticle/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Article mis à jour:', response.data);
      navigate('/articles'); // Redirigez vers la liste des articles après la mise à jour
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'article:', error);
    }
  };

  if (!article) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mettre à jour l&#39;article</h1>
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
            Mettre à jour l&#39;article
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticleForm;
