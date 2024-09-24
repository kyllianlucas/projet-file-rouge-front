import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateArticlePage = () => {
  const { articleId } = useParams(); // Récupère l'ID de l'article depuis l'URL
  const navigate = useNavigate();
  const [article, setArticle] = useState({
    productName: '',
    description: '',
    prix: '',
    remise: '',
    prixSpecial: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Récupérer les détails de l'article à modifier
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/public/produit/${articleId}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération de l\'article');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  // Fonction pour mettre à jour l'article
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/admin/produit/mettreAJour', article);
      navigate('/articles'); // Redirection vers la liste des articles après mise à jour
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'article', err);
    }
  };

  if (loading) {
    return <p>Chargement de l'article...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Modifier l'Article</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom du produit</label>
          <input 
            type="text" 
            value={article.productName} 
            onChange={(e) => setArticle({ ...article, productName: e.target.value })} 
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea 
            value={article.description} 
            onChange={(e) => setArticle({ ...article, description: e.target.value })} 
            className="border p-2 w-full"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Prix</label>
          <input 
            type="number" 
            value={article.prix} 
            onChange={(e) => setArticle({ ...article, prix: e.target.value })} 
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Remise (%)</label>
          <input 
            type="number" 
            value={article.remise} 
            onChange={(e) => setArticle({ ...article, remise: e.target.value })} 
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Prix Spécial</label>
          <input 
            type="number" 
            value={article.prixSpecial} 
            onChange={(e) => setArticle({ ...article, prixSpecial: e.target.value })} 
            className="border p-2 w-full"
          />
        </div>
        <button 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default UpdateArticlePage;
