import { Link } from "react-router-dom";

const Details = ({ offer }) => {
  const {
    product_name,
    product_description,
    product_image,
    product_price,
    product_details,
  } = offer;

  return (
    <Link to={`/offer/${offer._id}`}>
      <div>
        <div>
          <h1>{product_name}</h1>
          <p>{product_description}</p>
          <img src={product_image.url} />
          <p>{product_price} €</p>
        </div>
        <div>
          {product_details.map((details, index) => {
            <div key={index}></div>;
            if (!details.MARQUE) {
              return null;
            } else {
              details.MARQUE;
            }
          })}
          <button className="button">Cliquez sur l'offre !</button>
        </div>
      </div>
    </Link>
  );
};

export default Details;
