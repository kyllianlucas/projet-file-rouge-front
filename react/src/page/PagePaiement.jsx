import { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('votre_clé_publique_stripe');

const PaiementPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  useEffect(() => {
    // Crée un PaymentIntent dès que l'utilisateur arrive sur la page de paiement
    const createPaymentIntent = async () => {
      try {
        const { data: clientSecret } = await axios.post('http://localhost:8080/api/payment/create-payment-intent', {
          amount: totalAmount * 100, // Montant en centimes
          currency: 'eur',
        });
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Erreur lors de la création de l'intention de paiement", error);
      }
    };

    createPaymentIntent();
  }, []);

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
    <div>
      <h2>Paiement</h2>
      <form onSubmit={handlePayment}>
        <CardElement className="p-2 border rounded" />
        <button 
          type="submit" 
          disabled={isPaymentProcessing} 
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
const PaiementWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaiementPage />
    </Elements>
  );
};

export default PaiementWrapper;
