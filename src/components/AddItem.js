import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { useHistory } from 'react-router-dom';

const AddItem = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [daysToPurchase, setDaysToPurchase] = useState(null);

  const history = useHistory();

  const onGroceryItemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  async function onSubmitHandler(e) {
    await existingItemCheck(groceryItem);
    e.preventDefault();
    console.log('Item passing');
    db.collection(localStorage.getItem('token')).add({
      itemName: groceryItem,
      daysToPurchase: daysToPurchase,
      lastPurchasedDate: null,
    });

    setGroceryItem('');
    setDaysToPurchase(null);

    history.push('/ListView');
  }

  const existingItemCheck = (i) => {
    db.collection(localStorage.getItem('token'))
      .get()
      .then(function (querySnapshot) {
        console.log(i);
        querySnapshot.forEach(function (doc) {
          if (doc.data().itemName === i) {
            alert('That item exists!');
          }
          console.log(doc.data().itemName);
        });
      });
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
          required
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
