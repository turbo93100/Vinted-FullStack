import { Link } from "react-router-dom";

const Header = ({ token, handleToken, search, setSearch }) => {
  return (
    <header>
      <img src="../src/assets/images/logo-vinted.png" alt="logo-vinted" />
      {token ? (
        <button
          onClick={() => {
            handleToken(null);
          }}
        >
          Déconnexion
        </button>
      ) : (
        <>
          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>
        </>
      )}

      <input
        type="text"
        placeholder="rechercher des articles"
        value={search}
        onChange={(event) => {
          // console.log(event);
          setSearch(event.target.value);
        }}
      />

      <Link to="/publish">
        <button>Vends tes articles</button>
      </Link>
    </header>
  );
};

export default Header;
