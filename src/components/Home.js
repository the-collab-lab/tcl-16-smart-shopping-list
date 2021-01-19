import React, { useState } from 'react';
import getToken from '../lib/tokens.js';
import { useHistory } from 'react-router-dom';
import { db } from '../lib/firebase';

const Home = (props) => {
  const [token, setToken] = useState('');

  const history = useHistory();

  const generateToken = () => {
    const token = getToken();
    localStorage.setItem('token', token);
    props.setAuth(token);
    history.push('/ListView');
  };

  const onTokenInputChange = (e) => {
    setToken(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    db.collection(token)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          alert('uh oh! list does not exist');
        } else {
          localStorage.setItem('token', token);
          history.push('/ListView'); // when joining url is /ListView but ListView component does not render until refresh
        }
      })
      .catch(function (error) {
        alert(error);
      });

    setToken('');
  };

  return (
    <div className="home">
      <h1>Welcome to Smart Shopping List!</h1>
      <button className="new-list-btn" onClick={generateToken}>
        Create a new list
      </button>
      <p>- or -</p>
      <p>Join an existing shopping list by entering a three word token.</p>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="joinList">Share token </label>
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
