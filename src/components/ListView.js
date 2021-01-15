import React, { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';
import { useHistory } from 'react-router-dom';

const ListView = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    } else {
      history.push('/ListView');
    }
  }, [history]);

  const [groceryItem, setGroceryItem] = useState('');

  const [value, loading, error] = useCollection(db.collection('shoppingList'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const onGroceryItemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    db.collection('shoppingList').add({
      item: groceryItem,
      hello: 'goodbye',
    });

    setGroceryItem('');
  };

  const deleteItemHandler = (id) => {
    db.collection('shoppingList').doc(id).delete();
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
          value={groceryItem}
          onChange={onGroceryItemInputChange}
        />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading Shopping List...</span>}
        {value && (
          <ul>
            {value.docs.map((groceryItem) => (
              <li
                key={groceryItem.id}
                onClick={() => deleteItemHandler(groceryItem.id)}
              >
                {groceryItem.data().item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListView;
