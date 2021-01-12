import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';
import { token } from '../lib/tokens';

const AddItem = () => {
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
      daysToPurchase: estimate,
      lastPurchasedDate: null,
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
        <fieldset border="none">
          <p>How soon will you buy this again?</p>
          <input
            id="soon"
            value="7"
            type="radio"
            name="estimate"
            onChange={onRadioInputChange}
          />
          <br />
          <label htmlFor="soon">Soon</label>
          <input
            id="kinda-soon"
            value="14"
            type="radio"
            name="estimate"
            onChange={onRadioInputChange}
          />
          <label htmlFor="kinda-soon">Kind of Soon</label>
          <input
            id="not-soon"
            value="30"
            type="radio"
            name="estimate"
            onChange={onRadioInputChange}
          />
          <label htmlFor="not-soon">Not Soon</label>
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
