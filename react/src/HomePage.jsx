import React from 'react';
import { Link } from 'react-router-dom';
import PanierPage from './page/PagePanier'; // Importez le composant Panier

const HomePage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 font-roboto">
      {/* Section principale */}
      <section className="py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Équipez-vous pour le badminton</h2>
          <p className="mb-6">Découvrez notre large gamme de produits pour tous les niveaux.</p>
          <Link 
            to="/articles" 
            className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Voir les articles
          </Link>
        </div>
      </section>

      {/* Produits populaires */}
      <section className="py-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Articles Populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Répétez ce bloc pour chaque produit */}
          <div className="bg-white p-4 rounded-md shadow-md text-center">
            <img src="/path-to-product-image.jpg" alt="Product" className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold">Article 1</h3>
            <p className="text-gray-600">$50.00</p>
            <Link 
              to="/product/1" 
              className="text-blue-600 hover:underline"
            >
              Voir Détails
            </Link>
          </div>
          {/* Fin du bloc produit */}
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
