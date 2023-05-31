import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//
const Header = ({
  handleToken,
  token,
  search,
  setSearch,
  priceMin,
  setpriceMin,
  priceMax,
  setpriceMax,
  tri,
  setTri,
}) => {
  const handleClick = (e) => {
    if (tri === "asc") {
      setTri("desc");
    } else {
      setTri("asc");
    }
  };
  return (
    <header>
      <div className="container">
        <div className="header-left">
          <Link to="/">
            <img src={logo} alt="Logo vinted" />
          </Link>
        </div>
        <input
          placeholder="Rechercher des articles ..."
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <div className="header-center">
          <button type="button" value={tri} onClick={handleClick}>
            <span>
              <span>
                {tri === "asc" ? (
                  <FontAwesomeIcon icon="fa-solid fa-arrow-up" />
                ) : (
                  <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
                )}
              </span>
              Trier par prix
            </span>
          </button>
          <span className="header-price">{priceMin}</span>
          <input
            type="range"
            min={0}
            max={priceMax}
            step="5"
            value={priceMin}
            onChange={(event) => {
              setpriceMin(event.target.value);
              //setpriceMax(event.target.value);
            }}
          />
        </div>

        <div className="header-right">
          {token ? (
            <button
              className="button"
              onClick={() => {
                handleToken(null);
              }}
            >
              Déconnexion
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="button">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="button">Se connecter</button>
              </Link>
            </>
          )}
          <Link to={token ? "/publish" : "/login"}>
            <button className="button">Ajouter une offre</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
