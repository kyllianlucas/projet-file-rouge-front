import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ArticleContext } from '../components/ArticleContext'; // Importer le contexte

const UpdateArticlePage = () => {
  const { selectedArticleId } = useContext(ArticleContext); // Récupérer l'ID de l'article
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
    if (selectedArticleId) {
      const fetchArticle = async () => {
        try {
          console.log(`Récupération de l'article avec l'ID : ${selectedArticleId}`);
          const response = await axios.get(`/api/public/produit/${selectedArticleId}`);
          setArticle(response.data);
          setLoading(false);
        } catch (err) {
          console.error(err); // Journaliser l'erreur
          setError('Erreur lors de la récupération de l\'article');
          setLoading(false);
        }
      };

      fetchArticle();
    }
  }, [selectedArticleId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/admin/produit/mettreAJour', article);
      alert('Article mis à jour avec succès');
      // Redirection vers la liste des articles après mise à jour
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
    <div>
      <h1>Modifier l'Article</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nom du produit</label>
          <input 
            type="text" 
            value={article.productName} 
            onChange={(e) => setArticle({ ...article, productName: e.target.value })}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea 
            value={article.description} 
            onChange={(e) => setArticle({ ...article, description: e.target.value })}
          ></textarea>
        </div>
        <div>
          <label>Prix</label>
          <input 
            type="number" 
            value={article.prix} 
            onChange={(e) => setArticle({ ...article, prix: e.target.value })}
          />
        </div>
        <div>
          <label>Remise</label>
          <input 
            type="number" 
            value={article.remise} 
            onChange={(e) => setArticle({ ...article, remise: e.target.value })}
          />
        </div>
        <div>
          <label>Prix Spécial</label>
          <input 
            type="number" 
            value={article.prixSpecial} 
            onChange={(e) => setArticle({ ...article, prixSpecial: e.target.value })}
          />
        </div>
        <div>
          <label>Image URL</label>
          <input 
            type="text" 
            value={article.image} 
            onChange={(e) => setArticle({ ...article, image: e.target.value })}
          />
        </div>
        <button type="submit">Mettre à Jour</button>
      </form>
    </div>
  );
};

export default UpdateArticlePage;
