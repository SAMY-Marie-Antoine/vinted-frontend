import { Link, useNavigate, Navigate } from "react-router-dom";
import "../components/Form.css";
import { useState } from "react";
import axios from "axios";

const Login = ({ handleToken, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   State qui gère le message d'erreur
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const user = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    //   Je fais disparaitre le message d'erreur
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://site--backend-vinted--ybvpc4ksyyjp.code.run/user/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("retour data", response);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      }

      console.log(response.data);
    } catch (error) {
      {
        console.log(error.message);
        console.log(error.response.data);
      }
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
      <button type="submit">Se connecter</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage} </p>}
    </form>
  );
};

export default Login;
