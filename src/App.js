import React from 'react';
import logo from './tcl-logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import NotFound from './components/NotFound';

function App() {
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

          <MenuLink activeWhenExact={true} to="/" label="List View" />
          <MenuLink to="/AddItem" label="Add Item" />

          <Switch>
            <Route exact path="/">
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
}

function MenuLink({ label, to, activeWhenExact }) {
  let match = useRouteMatch({
    activeWhenExact: false,
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
