import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ShoppingList = () => {
  const [term, setTerm] = useState('');

  const [value, loading, error] = useCollection(
    db.collection('shoppingLists'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

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

  const deleteItemHandler = (id) => {
    db.collection('shoppingLists').doc(id).delete();
  };

  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="addItem">Add Item:</label>
        <input
          id="addItem"
          name="addItem"
          type="text"
          value={term}
          onChange={onInputChange}
        />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading Shopping List...</span>}
        {value && (
          <ul>
            {value.docs.map((doc) => (
              <li key={doc.id} onClick={() => deleteItemHandler(doc.id)}>
                {doc.data().item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
