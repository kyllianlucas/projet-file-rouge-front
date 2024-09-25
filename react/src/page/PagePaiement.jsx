import { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('votre_clé_publique_stripe');

const PaiementPage = ({ totalAmount, panierItems = [] }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const { data: clientSecret } = await axios.post('http://localhost:8080/api/payment/create-payment-intent', {
          amount: totalAmount * 100,
          currency: 'eur',
        });
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Erreur lors de la création de l'intention de paiement", error);
      }
    };

    createPaymentIntent();
  }, [totalAmount]);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsPaymentProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setPaymentStatus('Le paiement a échoué : ' + result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setPaymentStatus('Paiement réussi !');
      }
    }

    setIsPaymentProcessing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#F8F9FA] rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-[#343A40] mb-6">Récapitulatif du Panier</h2>

      {/* Récapitulatif du Panier */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-semibold text-[#343A40]">Produits dans votre panier</h3>
        {panierItems && panierItems.length > 0 ? (
          panierItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b border-[#CED4DA] py-2">
              <span className="text-[#6C757D]">{item.nom} x {item.quantité}</span>
              <span className="text-[#343A40]">{item.prix} €</span>
            </div>
          ))
        ) : (
          <p className="text-[#343A40]">Votre panier est vide.</p>
        )}
        <div className="flex justify-between font-semibold mt-4">
          <span>Total</span>
          <span>{totalAmount} €</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-[#343A40] mb-6">Paiement</h2>

      <form onSubmit={handlePayment} className="space-y-4">
        {/* Case pour la Carte */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold text-[#343A40]">Informations de la Carte</h3>
          <div className="border border-[#CED4DA] rounded-md p-2 mb-4">
            <CardElement className="p-2" />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={isPaymentProcessing}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
            isPaymentProcessing ? 'bg-[#6C757D]' : 'bg-[#007BFF] hover:bg-[#0056b3]'
          } transition duration-200`}
        >
          {isPaymentProcessing ? 'Paiement en cours...' : 'Payer'}
        </button>

        {paymentStatus && (
          <p className={`mt-4 text-sm ${paymentStatus.includes('échec') ? 'text-[#DC3545]' : 'text-[#155724]'}`}>
            {paymentStatus}
          </p>
        )}
      </form>
    </div>
  );
};

// Wrapper Stripe
const PaiementWrapper = ({ totalAmount, panierItems }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaiementPage totalAmount={totalAmount} panierItems={panierItems} />
    </Elements>
  );
};

export default PaiementWrapper;
