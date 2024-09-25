import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { ArticleContext } from '../components/ArticleContext'; // Importer le contexte
import { jwtDecode } from 'jwt-decode'; 

const AllArticlesPage = () => {
  const navigate = useNavigate();
  const { setSelectedArticleId } = useContext(ArticleContext); // Utiliser le contexte
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (role === 'ADMIN') {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/produit/all');
        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erreur lors de la récupération des articles");
        setLoading(false);
      }
    };

    fetchArticles(); 
  }, []);

  const handleAddToCart = (article) => {
    const articleData = {
      productName: article.nomProduit,
      description: article.description,
      prix: article.prix,
      remise: article.remise,
    };
  
    addToCart(articleData);
    alert(`${article.nomProduit} ajouté au panier avec succès!`);
  };

  const handleUpdateRedirect = (articleId) => {
    setSelectedArticleId(articleId); // Stocker l'ID dans le contexte
    navigate('/article/mettre-a-jour'); // Naviguer sans ID
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
    return <p className="text-gray-600">Chargement des articles...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Liste des Articles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.articleId} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
            {article.imageUrl && (
              <img src={article.imageUrl} alt={article.nomProduit} className="w-full h-48 object-cover rounded mb-4" />
            )}
            <h2 className="text-xl font-bold text-gray-800">{article.nomProduit}</h2>
            <p className="text-gray-600 mt-1">Description: {article.description}</p>
            <p className="text-gray-800 mt-2">Prix : <span className="font-semibold">{article.prix} €</span></p>
            <p className="text-gray-600">Remise : {article.remise}%</p>
            <p className="text-gray-800">Prix Spécial : <span className="font-semibold">{article.prixSpecial} €</span></p>
            <div className={`mt-4 flex ${isAdmin ? 'justify-between' : 'justify-end'}`}>
              {isAdmin && (
                <>
                  <button 
                    onClick={() => handleDelete(article.articleId)}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                  >
                    Supprimer
                  </button>
                  <button 
                    onClick={() => handleUpdateRedirect(article.articleId)}
                    className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
                  >
                    Modifier
                  </button>
                </>
              )}
              <button 
                onClick={() => handleAddToCart(article)}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Ajouter au panier
              </button>
            </div>
          </div>            
        ))}
      </div>
    </div>
  );
};

export default AllArticlesPage;
