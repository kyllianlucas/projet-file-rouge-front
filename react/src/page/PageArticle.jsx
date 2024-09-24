import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PanierPage from './PagePanier';
import { CartContext } from '../components/CartContext'; // Import du contexte du panier

const AllArticlesPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]); // État pour stocker les articles
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const { addToCart } = useContext(CartContext); // Utiliser la fonction addToCart du contexte

  // Récupérer tous les articles lors du chargement de la page
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/produit/all');
        console.log(response.data);
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des articles");
        setLoading(false);
      }
    };

    fetchArticles(); 
  }, []);

  // Fonction pour ajouter un article au panier
  const handleAddToCart = (article) => {
    // Inclure les informations souhaitées (nom, description, prix, etc.)
    const articleData = {
      productName: article.nomProduit,
      description: article.description,
      prix: article.prix,  // Ou article.prixSpecial si c'est ce que tu veux
      remise: article.remise,
    };
  
    addToCart(articleData); // Utiliser la fonction du contexte pour ajouter l'article au panier
    alert(`${article.nomProduit} ajouté au panier avec succès!`);
  };

  const handleUpdateRedirect = (articleId) => {
    navigate(`/update-article/${articleId}`);
  };

  const handleDelete = async (articleId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await axios.delete('/api/admin/produit/supprimer', {
          data: { articleId: parseInt(articleId) }
        });
        alert('Article supprimé avec succès');
        setArticles(articles.filter(article => article.articleId !== articleId));
      } catch (err) {
        console.error('Erreur lors de la suppression de l\'article', err);
      }
    }
  };

  if (loading) {
    return <p>Chargement des articles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto mt-10 relative">
      <div className="flex">
        <div className="w-3/4">
          <h1 className="text-2xl font-bold mb-6">Liste des Articles</h1>
          <div className="space-y-6">
            {articles.map((article) => (
              <div key={article.articleId} className="border p-4 rounded-lg">
              {/* Assure-toi que l'article contient une URL d'image */}
              {article.imageUrl && (
                <img src={article.imageUrl} alt={article.nomProduit} className="w-full h-48 object-cover mb-4" />
              )}
              {/* Affichage du nom et de la description */}
              <h2 className="text-xl font-semibold">{article.nomProduit}</h2>
              <p>Nom de l&#39;article: {article.nomProduit}</p>
              <p>Description: {article.description}</p>
              <p>Prix : {article.prix} €</p>
              <p>Remise : {article.remise}%</p>
              <p>Prix Spécial : {article.prixSpecial} €</p>
              <div className="mt-4">
                <button 
                  onClick={() => handleAddToCart(article)} 
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-4"
                >
                  Ajouter au panier
                </button>
                <button 
                  onClick={() => handleUpdateRedirect(article.articleId)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => handleDelete(article.articleId)} 
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>            
            ))}
          </div>
        </div>

        {/* Panier toujours visible */}
        <div className="w-1/4 fixed right-0 top-0 h-full">
          <PanierPage />
        </div>
      </div>
    </div>
  );
};

export default AllArticlesPage;
