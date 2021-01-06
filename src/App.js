import React, { useEffect, useState } from 'react';
import { fb } from './lib/firebase';

function App() {
  const [term, setTerm] = useState('');

  // initialize firestore
  const db = fb.firestore();

  const onInputChange = (e) => {
    setTerm(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    db.collection('shoppingLists').add({
      item: term,
    });

    setTerm('');
  };

  return (
    <div className="App">
      <h1>firestore connect</h1>
      <form onSubmit={onSubmitHandler}>
        <input value={term} onChange={onInputChange} />
      </form>
    </div>
  );
}

export default App;
