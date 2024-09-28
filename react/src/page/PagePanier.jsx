import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext';
import { useNavigate } from 'react-router-dom'; // Import pour la navigation

const PanierPage = () => {
  const { cartItems, removeFromCart, updateQuantityInCart } = useContext(CartContext);
  const navigate = useNavigate(); // Initialisation de la navigation

  // Calculer le prix total du panier
  const totalAmount = cartItems.reduce((total, item) => total + (item.prix || 0) * (item.quantity || 0), 0);

  // Vérification de l'authentification
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwt-token');
    return !!token; // Si le token existe, l'utilisateur est authentifié
  };

  // Fonction pour gérer le paiement (redirection vers PaiementPage)
  const handlePaymentRedirect = () => {
    if (!isAuthenticated()) {
      alert("Vous devez être connecté pour procéder au paiement.");
      navigate('/connexion'); // Redirection vers la page de connexion
      return;
    }

    // Récupérer les données nécessaires pour la page de paiement
    const panierItems = cartItems.map(item => ({
      id: item.id, // Assurez-vous que chaque item a un identifiant unique
      nom: item.productName,
      quantité: item.quantity,
      prix: item.prix,
    }));

    navigate('/paiement', {
      state: {
        totalAmount,
        panierItems,
      },
    });
  };

  if (cartItems.length === 0) {
    return <p className="text-gray-600"></p>; // Ne pas afficher le panier si vide
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Votre Panier</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="bg-white p-4 rounded shadow">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{item.productName}</h3>
              <p className="text-gray-600">{item.description}</p> {/* Affiche la description */}
              <p className="text-gray-800">Prix: <span className="font-semibold">{item.prix} €</span></p>
              <div className="mt-2">
                <label htmlFor={`quantity-${item.id}`} className="block text-gray-700">Quantité:</label>
                <input 
                  id={`quantity-${item.id}`} 
                  type="number" 
                  value={item.quantity || 1} 
                  onChange={(e) => updateQuantityInCart(item.id, parseInt(e.target.value) || 1)} 
                  min="1"
                  className="border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">Total: <span className="font-bold">{totalAmount.toFixed(2)} €</span></h3>
        <button 
          onClick={handlePaymentRedirect} 
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
        >
          Procéder au Paiement
        </button>
      </div>
    </div>
  );
};

export default PanierPage;
