import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import NotFound from "./components/NotFound";
import AddItem from "./components/AddItem";
import ListContainer from "./components/ShoppingList/ListContainer";
import Home from "./components/Home";
import { db } from "./lib/firebase";

const setToken = (value) => {
  localStorage.setItem("token", value);
};

const userStore = {
  token: localStorage.getItem("token"),
  db: null,
  setToken,
};

// Setup the app
window.addEventListener("storage", (e) => onTokenChange(e.newValue));

if (userStore.token) {
  const database = db.collection(userStore.token);
  database.onSnapShot((querySnapshot) => {
    userStore.db = querySnapshot;
  });
}

const onTokenChange = (token) => {
  userStore.token = token;
  const database = db.collection(token);
  database.onSnapShot((querySnapshot) => {
    userStore.db = querySnapshot;
  });
};

export const UserContext = React.createContext(userStore);

const App = () => {
  return (
    <UserContext.Provider>
      <Router>
        {userStore.token ? (
          <div className="App">
            <MenuLink activeWhenExact={true} pathTo="/List" label="List View" />
            <MenuLink pathTo="/AddItem" label="Add Item" />
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
          <Home setAuth={setToken} />
        )}
      </Router>
    </UserContext.Provider>
  );
};

const MenuLink = ({ label, pathTo, activeWhenExact = false }) => {
  let match = useRouteMatch({
    path: pathTo,
    exact: activeWhenExact,
  });

  return (
    <div className={match ? "active" : ""}>
      <Link to={pathTo}>{label}</Link>
    </div>
  );
};

export default App;
