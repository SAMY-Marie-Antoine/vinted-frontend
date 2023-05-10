import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Components
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51N6DTIDLLpVGb7W40aeUHgccPgn5A1PQzv1wLhlaLsRg04SRc3z1XMu0YZSwO84f6GX5hkRnXxPXKwb7cWTU0q9T00JCh5IBkx"
);

const Payment = ({ token }) => {
  const { product_price, product_name } = useLocation().state;
  //   console.log(product_title);

  return token ? (
    <div>
      <h1>Résumé de la commande</h1>
      <p>Prix de la commande : {useLocation().state.product_price} €</p>
      <p>Vous allez acheter : {useLocation().state.product_name}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          product_name={useLocation().state.product_name}
          product_price={useLocation().state.product_price}
        />
      </Elements>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
