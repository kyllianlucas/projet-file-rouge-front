import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [articlesEnPromotion, setArticlesEnPromotion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchArticlesEnPromotion = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/produit/promotions');
        console.log(response.data);
        setArticlesEnPromotion(response.data);
        setLoading(false);
      } catch (error) {
        setError("Erreur lors de la récupération des articles");
        console.error(error);
        setLoading(false);
      }
    };

  
    fetchArticlesEnPromotion();
  }, []);

    const handleArticleClick = (article) => {
      sessionStorage.setItem('selectedArticle', JSON.stringify(article)); // Stocker l'article dans sessionStorage
      navigate('/article-detail'); // Naviguer vers la page de détail
    };
  if (loading) {
    return <p className="text-center text-blue-600">Chargement...</p>; // Change loading text color
  }

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  return (
    <div className="bg-gray-100 text-gray-800 font-roboto">
      {/* Section principale */}
      <section className="py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Équipez-vous pour le badminton</h2>
          <p className="mb-6">Découvrez notre large gamme de produits pour tous les niveaux.</p>
          <Link 
            to="/article" 
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Voir les articles
          </Link>
        </div>
      </section>

      {/* Articles en Promotions */}
      <section className="py-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Articles en Promotions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {articlesEnPromotion.length > 0 ? (
            articlesEnPromotion.map((article) => (
              <div key={article.idProduit} className="bg-white p-4 rounded-md shadow-md text-center transition-transform transform hover:scale-105"  onClick={() => handleArticleClick(article)}>
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.productName} 
                    className="w-full h-48 object-cover rounded-md mb-4 transition duration-200 ease-in-out" // Smooth transition on hover
                  />
                )}
                <h3 className="text-lg font-semibold">{article.productName}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="text-blue-600 font-bold">${article.prixSpecial}</span> 
                  <span className="line-through text-red-500 mx-1">${article.prix}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">Aucun article en promotion disponible.</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-4 mt-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600">&copy; 2024 BadmintonShop. Tous droits réservés.</p>
          <div className="mt-2">
            <Link to="#" className="text-blue-600 hover:underline mx-2">Politique de confidentialité</Link>
            <Link to="#" className="text-blue-600 hover:underline mx-2">Conditions générales</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
