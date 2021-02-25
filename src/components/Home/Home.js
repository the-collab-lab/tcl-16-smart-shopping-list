import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import getToken from "../../lib/tokens.js";
import { db } from "../../lib/firebase";
import swal from "@sweetalert/with-react";
// styles
import "./Home.scss";
// image
import { ReactComponent as VeggieFruit } from "../../img/veggie_fruit.svg";

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
      <h1>Welcome to Meat Cheese Bread!</h1>
      <VeggieFruit />
      <h2>Are you new?</h2>
      <button className="new-list-btn" onClick={generateToken}>
        Create new list
      </button>
      <h2>Or joining a list?</h2>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="joinList" className="visually-hidden">
          Paste token here
        </label>
        <input
          id="joinList"
          name="joinList"
          type="text"
          placeholder="Enter your code..."
          value={token}
          onChange={onTokenInputChange}
          required
        />
        <button>Join list</button>
      </form>
    </div>
  );
};

export default Home;
