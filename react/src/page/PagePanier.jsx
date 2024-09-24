import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom'; // Ajout pour redirection
import axios from 'axios';

// Chargez votre clé publique Stripe
const stripePromise = loadStripe('votre_clé_publique_stripe');

const PanierPage = () => {
  const { cartItems, removeFromCart, updateQuantityInCart } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const navigate = useNavigate(); // Initialisation de la navigation

  // Calculer le prix total du panier en fonction de la quantité
  const totalAmount = cartItems.reduce((total, item) => total + item.prix * item.quantity, 0);

  // Vérification de l'authentification
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwt-token');
    return !!token; // Si le token existe, l'utilisateur est authentifié
  };

  // Fonction pour gérer le paiement
  const handlePayment = async (event) => {
    event.preventDefault();

    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!isAuthenticated()) {
      alert("Vous devez être connecté pour procéder au paiement.");
      navigate('/connexion'); // Redirection vers la page de connexion
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsPaymentProcessing(true);

    try {
      const { data: clientSecret } = await axios.post('http://localhost:8080/api/payment/create-payment-intent', {
        amount: totalAmount * 100, // Montant en centimes pour Stripe
        currency: 'eur'
      });

      setClientSecret(clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (result.error) {
        setPaymentStatus('Le paiement a échoué : ' + result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setPaymentStatus('Paiement réussi !');
        }
      }
    } catch (error) {
      setPaymentStatus('Erreur lors du paiement : ' + error.message);
    }

    setIsPaymentProcessing(false);
  };

  // Fonction pour gérer le changement de quantité
  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return; // La quantité ne peut pas être inférieure à 1
    updateQuantityInCart(itemId, quantity);
  };

  if (cartItems.length === 0) {
    return <p>Votre panier est vide</p>; // Ne pas afficher le panier si vide
  }

  return (
    <div className="fixed right-0 top-0 w-1/4 bg-gray-100 shadow-lg p-4 h-full overflow-auto">
      <h2 className="text-xl font-bold mb-4">Votre Panier</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index} className="flex justify-between mb-2">
            <div>
              <h3>{item.productName}</h3>
              <p>{item.description}</p> {/* Affiche la description */}
              <p>Prix: {item.prix} €</p>
              <div className="flex items-center">
                <label htmlFor={`quantity-${item.id}`} className="mr-2">Quantité:</label>
                <input 
                  id={`quantity-${item.id}`} 
                  type="number" 
                  value={item.quantity || 1} 
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))} 
                  className="w-16 border rounded p-1"
                  min="1"
                />
              </div>
            </div>
            <button 
              onClick={() => removeFromCart(item.id)} 
              className="text-red-500"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Total: {totalAmount.toFixed(2)} €</h3>
      </div>

      <form onSubmit={handlePayment} className="mt-6">
        <CardElement className="p-2 border rounded" />
        <button 
          type="submit" 
          disabled={!stripe || isPaymentProcessing} 
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          {isPaymentProcessing ? 'Paiement en cours...' : 'Payer'}
        </button>
      </form>

      {paymentStatus && <p className="mt-4 text-red-500">{paymentStatus}</p>}
    </div>
  );
};

// Wrapper Stripe
const PanierWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PanierPage />
    </Elements>
  );
};

export default PanierWrapper;
