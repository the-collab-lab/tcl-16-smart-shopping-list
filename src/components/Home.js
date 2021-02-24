import React, { useState } from "react";
import getToken from "../lib/tokens.js";
import { useHistory } from "react-router-dom";
import { db } from "../lib/firebase";
import swal from "@sweetalert/with-react";

const Home = (props) => {
  const [token, setToken] = useState("");
  const history = useHistory();

  const generateToken = () => {
    const token = getToken();
    localStorage.setItem("token", token);
    props.setAuth(token);
    history.push("/List");
  };

  const onTokenInputChange = (e) => {
    setToken(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    db.collection(token)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          swal({
            title: "Oh no!",
            text: "This list does not exist.",
            icon: "error"
          });
        } else {
          localStorage.setItem("token", token);
          props.setAuth(token);
          history.push("/List");
        }
      })
      .catch((error) => {
        swal({
          title: "Error",
          text: error
        });
      });

    setToken("");
  };

  return (
    <div className="home">
      <h1>Welcome to Smart-Shopper! Let's make a list and start tracking.</h1>
      <button className="new-list-btn" onClick={generateToken}>
        Create new list
      </button>
      <p>- or -</p>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="joinList">Paste token here: </label>
        <input
          id="joinList"
          name="joinList"
          type="text"
          placeholder="three word token"
          value={token}
          onChange={onTokenInputChange}
        />
        <button>Join an existing list</button>
      </form>
    </div>
  );
};

export default Home;
