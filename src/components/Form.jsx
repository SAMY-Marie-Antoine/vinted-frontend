import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Signup from "./Signup";
import Valid from "./Valid";

// import "./Form.css";

function App() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");

  // State qui gère l'affichage ou non d'un message d'erreur en dessous de mon bouton submit
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="app">
      {!submit && <Header />}
      {!submit ? (
        <Signup
          email={email}
          setEmail={setEmail}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setSubmit={setSubmit}
          confirmPassword={confirmPassword}
          setconfirmPassword={setconfirmPassword}
        />
      ) : (
        <Valid
          email={email}
          username={username}
          password={password}
          submit={submit}
          setSubmit={setSubmit}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
