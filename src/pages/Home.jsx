import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  //useEffect(()=>{}, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
        );
        //console.log(response.data);
        setData(response.data);
        //console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      {data.offers.map((offer) => {
        // console.log(offer);
        return (
          <Link to={`/offers/${offer._id}`} key={offer._id}>
            <article>
              <div>
                <img
                  className="avatar"
                  // Pour Ckecker si un avatar n'est pas dispo sur tous les profils
                  src={offer.owner.account.avatar?.secure_url}
                  alt=""
                />
                <span>{offer.owner.account.username}</span>
              </div>

              <img
                className="offre"
                src={offer.product_image.secure_url}
                alt=""
              />
              <div>
                <p>{offer.product_price} €</p>
                <p>{offer.product_details[1].TAILLE}</p>
                <p>{offer.product_details[0].MARQUE}</p>
              </div>
            </article>
          </Link>
        );
      })}
    </main>
  );
};

export default Home;
