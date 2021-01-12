import React from 'react';
import logo from './tcl-logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from 'react-router-dom';
import NotFound from './components/NotFound';
import ShoppingList from './components/ShoppingList';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>TCL-16</h1>
          <p>
            Welcome to TCL-16! This app component is a good starting place for
            the Smart Shopping List!
          </p>
          <h2>Week 1</h2>
          <ShoppingList />
          <MenuLink activeWhenExact={true} to="/ListView" label="List View" />
          <MenuLink to="/AddItem" label="Add Item" />

          <Switch>
            <Route exact path="/">
              {localStorage.getItem("token") ? <Redirect to="/ListView" /> : <Home />}
            </Route>
            <Route exact path="/ListView">
              <ListView />
            </Route>
            <Route exact path="/AddItem">
              <AddItem />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </header>
      </div>
    </Router>
  );
};

function MenuLink({ label, to, activeWhenExact = false }) {
  let match = useRouteMatch({
    path: to,
    exact: activeWhenExact,
  });

  return (
    <div className={match ? 'active' : ''}>
      <Link to={to}>{label}</Link>
    </div>
  );
}

function ListView() {
  return (
    <div>
      <h3>List View</h3>
    </div>
  );
}

function AddItem() {
  return (
    <div>
      <h3>Add Item</h3>
    </div>
  );
}

export default App;
