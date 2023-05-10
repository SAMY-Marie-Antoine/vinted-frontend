import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  // State qui sert à savoir si ma requête attend toujours une réponse
  const [isLoading, setIsLoading] = useState(false);
  //   State qui set à savoir si le paiement a été effectué
  const [completed, setCompleted] = useState(false);

  // Permetra de créer une requête vers stripe pour obtenir un token
  const stripe = useStripe();
  // Permetra de récupérer les données bancaires de l'utilisateur
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      // Je récupère le contenu de l'input CardElement
      const cardElement = elements.getElement(CardElement);
      //   J'envoie ces informations à stripe pour qu'il valide le code de carte de l'utilisateur et qu'il me renvoie un token.
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      //   Je fais une requête à mon back en envoyant le stripetoken
      const responseFromBackend = await axios.post(
        `https://site--backend-vinted--ybvpc4ksyyjp.code.run/payment`,
        { stripeToken: stripeToken }
      );
      console.log("aprés deploiemnt", responseFromBackend);
      console.log(responseFromBackend.data);

      //   Si le back me répond succeeded
      if (responseFromBackend.data === "succeeded") {
        // Je modifie mes states isLoading et Completed
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Formulaire de paiement</h1>
      <CardElement />
      {completed ? (
        <p>Paiement validé</p>
      ) : (
        <button type="submit" disabled={isLoading}>
          Pay
        </button>
      )}
    </form>
  );
};

export default CheckoutForm;
