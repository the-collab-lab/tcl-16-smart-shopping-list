import React from 'react';
import logo from './tcl-logo.svg';
import './App.css';
import ShoppingList from './components/ShoppingList';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>TCL-16</h1>
        <p>
          Welcome to TCL-16! This app component is a good starting place for the
          Smart Shopping List!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ShoppingList />
      </header>
    </div>
  );
};

export default App;
