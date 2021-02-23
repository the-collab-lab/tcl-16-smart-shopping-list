import React, { useState } from "react";
import "./App.scss";
import "./styles/base.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NotFound from "./components/NotFound";
import AddItem from "./components/AddItem";
import ListContainer from "./components/ShoppingList/ListContainer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  return (
    <Router>
      {auth ? (
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <ListContainer />
            </Route>
            <Route exact path="/List">
              <ListContainer />
            </Route>
            <Route exact path="/AddItem">
              <AddItem />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      ) : (
        <Home setAuth={setAuth} />
      )}
    </Router>
  );
};

export default App;
