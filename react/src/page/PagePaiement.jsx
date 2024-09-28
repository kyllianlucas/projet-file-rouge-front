import React from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Q3G0k09Qr72ALYgCKfXTJQTCJcOiWZgtQux1v8j0wyxM5hmwhzBaX5qcXrfEgqQyYDU16Y2k8rUbrVwTMoV4dAh007Wk9ZMnB'); // Remplacez par votre clé publique Stripe

const CheckoutForm = ({ totalAmount, panierItems }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Assurez-vous que Stripe est chargé
    }

    const cardElement = elements.getElement(CardElement);

    // Créez un token ou une source à partir de la carte
    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error('Error creating token:', error);
    } else {
      // Envoyez le token au serveur pour créer une session de paiement ou traiter le paiement
      console.log('Received Stripe token:', token);
      // Vous devez faire une requête à votre serveur ici
      const response = await fetch('http://localhost:5000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token.id,
          items: panierItems.map(item => ({
            id: item.id,
            nom: item.nom,
            prix: item.prix,
            quantité: item.quantité,
          })),
        }),
      });

      if (response.ok) {
        const session = await response.json();
        console.log('Payment successful!', session);
      } else {
        console.error('Error processing payment:', response);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="border border-gray-300 p-4 rounded-lg">
        <label className="block text-gray-700 mb-2">Informations de carte bancaire</label>
        <CardElement className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <h3 className="text-lg font-semibold">Total à payer: {totalAmount.toFixed(2)} €</h3>
      <button 
        type="submit" 
        disabled={!stripe} 
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
      >
        Payer
      </button>
    </form>
  );
};

const PaiementPage = () => {
  const location = useLocation();
  const { totalAmount, panierItems } = location.state || {};

  if (!panierItems || totalAmount === undefined) {
    return <p className="text-red-600">Erreur: Aucun article à payer.</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Récapitulatif de la commande</h2>
        <ul className="space-y-4">
          {panierItems.map(item => (
            <li key={item.id} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold text-gray-800">{item.nom}</h3>
              <p className="text-gray-600">Quantité: {item.quantité}</p>
              <p className="text-gray-800">Prix: {(item.prix).toFixed(2)} €</p>
            </li>
          ))}
        </ul>
        <CheckoutForm totalAmount={totalAmount} panierItems={panierItems} />
      </div>
    </Elements>
  );
};

export default PaiementPage;
