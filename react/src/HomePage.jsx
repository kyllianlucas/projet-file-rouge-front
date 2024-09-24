import React from 'react';
import { Link } from 'react-router-dom';
import PanierPage from './components/PagePanier'; // Importez le composant Panier

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 relative">
      <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative flex items-center justify-center h-full text-center text-white">
          <div>
            <h2 className="text-4xl font-bold mb-4">Équipez-vous pour le badminton</h2>
            <p className="text-xl mb-6">Découvrez notre large gamme de produits pour tous les niveaux.</p>
            <Link to="/products" className="bg-yellow-500 text-black px-4 py-2 rounded">Voir les Produits</Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Produits Populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Repeat this block for each product */}
          <div className="bg-white p-4 rounded shadow-lg">
            <img src="/path-to-product-image.jpg" alt="Product" className="w-full h-48 object-cover rounded mb-4"/>
            <h3 className="text-xl font-semibold mb-2">Produit 1</h3>
            <p className="text-gray-700 mb-2">$50.00</p>
            <Link to="/product/1" className="bg-blue-500 text-white px-4 py-2 rounded">Voir Détails</Link>
          </div>
          {/* End Product Block */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 BadmintonShop. Tous droits réservés.</p>
          <div>
            <a href="#" className="mr-4 hover:underline">Politique de confidentialité</a>
            <a href="#" className="hover:underline">Conditions générales</a>
          </div>
        </div>
      </footer>

      {/* Panier flottant */}
      <div className="fixed right-0 top-0 h-full w-1/4 bg-white shadow-lg">
        <PanierPage />
      </div>
    </div>
  );
};

export default HomePage;
