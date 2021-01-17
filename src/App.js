import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from 'react-router-dom';

import NotFound from './components/NotFound';
import AddItem from './components/AddItem';
import ListView from './components/ListView';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <div className="App">
        {localStorage.getItem('token') ? (
          <div>
            <MenuLink
              activeWhenExact={true}
              pathTo="/ListView"
              label="List View"
            />
            <MenuLink pathTo="/AddItem" label="Add Item" />

            <Switch>
              <Route exact path="/">
                <ListView />
              </Route>
              <Route exact path="/ListView">
                <ListView />
              </Route>
              <Route exact path="/AddItem">
                <AddItem />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </div>
        ) : (
          <Home />
        )}
      </div>
    </Router>
  );
};

const MenuLink = ({ label, pathTo, activeWhenExact = false }) => {
  let match = useRouteMatch({
    path: pathTo,
    exact: activeWhenExact,
  });

  return (
    <div className={match ? 'active' : ''}>
      <Link to={pathTo}>{label}</Link>
    </div>
  );
};

export default App;
