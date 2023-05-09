import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ handleToken, token, search, setSearch }) => {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo vinted" />
        </Link>
        <div className="connect">
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
        <input
          placeholder="Rechercher des articles ..."
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>
    </header>
  );
};

export default Header;
