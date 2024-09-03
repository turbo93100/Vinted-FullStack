import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //   Permet de naviguer au click après avoir exécuté du code
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      //Faire la requête axios.post avec les infos des inputs
      //   Requête axios :
      // - Premier argument : l'url que j'interroge
      // - deuxième : le body que j'envoi = {}
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: Name,
          password: password,
          newsletter: newsletter,
        }
      );
      //console.log(response.data);

      /*  On enregistre le cookie pour 15 jours */
      /* Cookies.set("vinted-token", response.data.token, { expires: 15 }); */
      /*  On utilise la fonction avec comme argument le token reçu par le backend */
      handleToken(response.data.token);
      /* On continue la navigation vers la page Home */
      navigate("/");
    } catch (error) {
      console.log(error.message); // erreur 400/409 ==> This email already has an account/Missing parameters
      // Si j'ai un message d'erreur je récupère dans le catch les infos pour adapter la réponse envoyée à l'utilisateur
      if (error.response.status === 409) {
        setErrorMessage("Cet email est déjà utilisé");
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs");
      } else {
        // Si je tombe dans le catch pour une raison inconnue
        setErrorMessage("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <div className="signup-form">
          <input
            onChange={(event) => {
              //console.log(event.target.value); // renvoie la lettre tapé dans le champs name
              setName(event.target.value);
            }}
            type="text"
            placeholder="Nom d'utilisateur"
            value={Name}
          />
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            type="email"
            placeholder="Email"
            value={email}
          />
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
            placeholder="Mot de passe"
          />
          <div className="checkbox">
            <input
              type="checkbox"
              //checked permet de donner la valeur initial, ici on a choisit false donc non cherchée
              checked={newsletter}
              onChange={() => {
                /* On choisit au moment du click de changé la valeur de checked par l'opposée */
                setNewsletter(!newsletter);
              }}
            />
            <p>S'inscrire à la newsletter</p>
          </div>
          <button type="submit">S'inscrire</button>
          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </div>
      </form>
      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}
    </main>

    // Envoie de errorMessage si besoin
  );
};

export default Signup;
