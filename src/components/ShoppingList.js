import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ShoppingList = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [estimate, setEstimate] = useState(null);

  const [value, loading, error] = useCollection(db.collection('shoppingList'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const onGroceryItemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    db.collection('shoppingList').add({
      itemName: groceryItem,
      estimate: estimate,
    });

    setGroceryItem('');
  };

  const onRadioInputChange = (e) => {
    setEstimate(parseInt(e.target.value));
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
        <fieldset>
          <p>How soon will you buy this again?</p>
          Soon
          <input
            id="soon"
            value="7"
            type="radio"
            name="estimate"
            onChange={onRadioInputChange}
          />
          Kind of soon
          <input
            id="kinda-soon"
            value="14"
            type="radio"
            name="estimate"
            onChange={onRadioInputChange}
          />
          Not soon
          <input
            id="not-soon"
            value="30"
            type="radio"
            name="estimate"
            onChange={onRadioInputChange}
          />
        </fieldset>
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
                {groceryItem.data().itemName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
