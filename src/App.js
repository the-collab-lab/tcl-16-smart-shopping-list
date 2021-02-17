import React, { useState } from "react";
import "./App.scss";
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

const App = () => {
  const [auth, setAuth] = useState(localStorage.getItem("token"));

  return (
    <Router>
      {auth ? (
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
        <Home setAuth={setAuth} />
      )}
    </Router>
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
