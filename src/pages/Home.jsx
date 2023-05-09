import { useState, useEffect } from "react";
import axios from "axios";
import Details from "./Details";

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
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
  }, [search]); //tableau de dependances pour le search; il refresh

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div className="container">
      <div className="article-container">
        {data.map((offer) => {
          return (
            <div key={offer._id}>
              <Details key={offer._id} offer={offer} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
