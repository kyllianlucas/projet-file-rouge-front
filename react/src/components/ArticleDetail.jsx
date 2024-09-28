import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer l'article depuis sessionStorage
    const storedArticle = sessionStorage.getItem('selectedArticle');
    if (storedArticle) {
      setArticle(JSON.parse(storedArticle));
    } else {
      // Si l'article n'existe pas dans le stockage, rediriger vers la page d'accueil
      navigate('/');
    }
  }, [navigate]);

  if (!article) {
    return <p className="text-center text-blue-600">Chargement...</p>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{article.productName}</h1>
      {article.image && (
        <img src={article.image} alt={article.productName} className="w-full h-auto mb-4 rounded" />
      )}
      <p className="text-lg mb-4">{article.description}</p>
      <p className="text-xl font-bold text-blue-600 mb-4">
        Prix spécial: ${article.prixSpecial}
      </p>
      <p className="text-gray-600">
        <span className="line-through text-red-500">${article.prix}</span>
      </p>
      <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
        Ajouter au panier
      </button>
    </div>
  );
};

export default ArticleDetail;
