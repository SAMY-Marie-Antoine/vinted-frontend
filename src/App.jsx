import { useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
import "./App.css";

// Pages
import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Offer from "./pages/Offer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Publish from "./components/Publish";
import Payment from "./pages/Payment";

function App() {
  const [token, setToken] = useState(Cookies.get("vintedToken") || null);
  const [search, setSearch] = useState("");
  const [priceMin, setpriceMin] = useState(0);
  const [priceMax, setpriceMax] = useState(10000);
  const [tri, setTri] = useState("asc");

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("vintedToken", token, { expires: 14 });
    } else {
      setToken(null);
      Cookies.remove("vintedToken");
    }
  };

  return (
    <Router>
      {/* Mon Header apparait sur toutes mes pages */}
      <header>
        <Header
          token={token}
          handleToken={handleToken}
          search={search}
          setSearch={setSearch}
          priceMin={priceMin}
          setpriceMin={setpriceMin}
          priceMax={priceMax}
          setpriceMax={setpriceMax}
          tri={tri}
          setTri={setTri}
        />
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              priceMin={priceMin}
              priceMax={priceMax}
              tri={tri}
            />
          }
        />
        <Route path="/details" element={<Details />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
