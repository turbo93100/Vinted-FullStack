import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

//App
const App = () => {
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      Cookies.set("vinted-token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("vinted-token");
      setToken(null);
    }
  };
  return (
    <Router>
      <div className="container">
        <Header
          token={token}
          handleToken={handleToken}
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/offers/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/login" element={<Login handleToken={handleToken} />} />

          {/* // il faut la props token pour être certain que l'user a bien un compte pour publier une annonce */}
          <Route path="/publish/" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
