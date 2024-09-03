import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//Connexion à Stripe
const stripePromise = loadStripe(
  "pk_test_51PuxWKGmHoMbwktlMYH7Y6X60ll3oF88djucPCKogime7sL7FC7EhAiNwpEe33vVnQgaJh80tmFsPEdFPXXk3nt800RElAAmlh"
);

const Payment = () => {
  const price = 5.9;

  //Informations de la transaction
  const options = {
    mode: "payment", //type de transaction
    amount: Number((price * 100).toFixed(0)), //Montant de la transaction en centimes
    currency: "eur", //Devise de la transaction
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
