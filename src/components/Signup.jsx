import { Link, useNavigate } from "react-router-dom";
import "../components/Form.css";
import { useState } from "react";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://site--backend-vinted--ybvpc4ksyyjp.code.run/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log("data", response.data);
      if (response.data.token) {
        // console.log("response.data.token", response.data.token);
        handleToken(response.data.token);
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez en choisir un autre :)"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs :)");
      }
    }

    if (password === confirmPassword) {
      setErrorMessage("");
      setSubmit(true);
    } else {
      setErrorMessage("Vos deux mots de passe ne sont pas identiques");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <label htmlFor="email">
        Email :
        <input
          id="email"
          type="email"
          placeholder="samy@gmail.com"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </label>
      {/* {!email && <p>Veuilez renseigner un email</p>*/}
      <label htmlFor="username">
        Name :
        <input
          id="username"
          type="text"
          placeholder="samy"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
      </label>
      <label htmlFor="password">
        Password :
        <input
          id="password"
          type="password"
          placeholder="azerty"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </label>
      <label htmlFor="confirmPassword">
        confirm Password :
        <input
          id="confirmPassword"
          type="password"
          placeholder="azerty"
          value={confirmPassword}
          onChange={(event) => {
            setconfirmPassword(event.target.value);
          }}
        />
      </label>
      <button type="submit">Créer utilisateur</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage} </p>}
      <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
    </form>
  );
};

export default Signup;
