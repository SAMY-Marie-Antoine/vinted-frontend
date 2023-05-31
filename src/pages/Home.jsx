import { useState, useEffect } from "react";
import axios from "axios";
import Details from "./Details";

const Home = ({ search, priceMin, priceMax, tri }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if ((search !== "" && priceMin !== "" && priceMax !== "") || tri !== "") {
        search = `${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=price-${tri}`;
      }
      try {
        const response = await axios.get(
          `https://site--backend-vinted--ybvpc4ksyyjp.code.run/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, priceMin, tri]); //tableau de dependances pour le search; il refresh

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main className="container">
      <div>
        {data.map((offer) => {
          return (
            <div key={offer._id}>
              <Details key={offer._id} offer={offer} />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
