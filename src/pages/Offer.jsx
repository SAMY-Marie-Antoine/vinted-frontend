import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const Offer = ({}) => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-vinted--ybvpc4ksyyjp.code.run/offer/${id}`
        );
        response.data && setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response.status);
      }
    };
    // J'apelle immédiatement ma fonction fetchData
    fetchData();
  }, [id]); //tableau de dependances pour le search; il refresh
  // console.log("mon composant se render");
  return isLoading ? (
    <></>
  ) : (
    // <p>Loading ...</p>
    <div className="container">
      <div className="article-container">
        <div>
          {data.product_image.secure_url && (
            <img src={data.product_image.secure_url} alt="" />
          )}
        </div>
        {data.product_details.map((detail, index) => {
          console.log("detail de l'offre =>", detail);
          return (
            <div key={index}>
              {/* J'affiche le nom dela clef  */}
              <div className="article-container">
                <span>{detail.MARQUE} </span>
                <span>{detail.TAILLE} </span>
                <span>{detail.ÉTAT} </span>
                <span>{detail.COULEUR} </span>
                <span>{detail.EMPLACEMENT} </span>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="/payment" state={data}>
        Acheter
      </Link>
    </div>
  );
};

export default Offer;
