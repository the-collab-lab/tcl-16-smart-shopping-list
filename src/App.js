import React, { useState } from "react";
import "./styles/base.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

import NotFound from "./components/NotFound";
import AddItem from "./components/AddItem/AddItem";
import ListContainer from "./components/ShoppingList/ListContainer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Navbar auth={auth} setAuth={setAuth} />
      {auth ? (
        <main className="App">
          <Switch>
            <Route exact path="/">
              <ArchivalNoticeModal />
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
        </main>
      ) : (
        <Home setAuth={setAuth} />
      )}
    </Router>
  );
};

export default App;
