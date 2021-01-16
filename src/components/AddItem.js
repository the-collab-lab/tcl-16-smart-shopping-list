import React, { useState } from 'react';
import { db } from '../lib/firebase';

const AddItem = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [daysToPurchase, setDaysToPurchase] = useState(null);

  const onGroceryItemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    db.collection(localStorage.getItem('token')).add({
      itemName: groceryItem,
      daysToPurchase: daysToPurchase,
      lastPurchasedDate: null,
    });

    setGroceryItem('');
    setDaysToPurchase(null);
  };

  const onRadioInputChange = (e) => {
    setDaysToPurchase(parseInt(e.target.value));
  };

  return (
    <div className="add-item">
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="addItem">Item name: </label>
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
            name="daysToPurchase"
            onChange={onRadioInputChange}
            checked={daysToPurchase === 7}
          />
          <label htmlFor="soon">Soon</label>
          <br />
          <input
            id="kinda-soon"
            value="14"
            type="radio"
            name="daysToPurchase"
            onChange={onRadioInputChange}
            checked={daysToPurchase === 14}
          />
          <label htmlFor="kinda-soon">Kind of Soon</label>
          <br />
          <input
            id="not-soon"
            value="30"
            type="radio"
            name="daysToPurchase"
            onChange={onRadioInputChange}
            checked={daysToPurchase === 30}
          />
          <label htmlFor="not-soon">Not Soon</label>
        </fieldset>
        <input type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddItem;
