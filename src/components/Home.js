import React from "react";
import getToken from "../lib/tokens.js";
import { useHistory } from "react-router-dom";

const Home = (props) => {
  const history = useHistory();

  const generateToken = () => {
    const token = getToken();
    localStorage.setItem("token", token);
    props.setAuth(token);
    history.push("/ListView");
  };

  return (
    <div className="home">
      <h1>Welcome to Smart Shopping List!</h1>
      <button className="new-list-btn" onClick={generateToken}>
        Create a new list
      </button>
    </div>
  );
};

export default Home;
