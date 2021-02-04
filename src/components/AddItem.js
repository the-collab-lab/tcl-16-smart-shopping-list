import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

const AddItem = () => {
  const { db } = useContext(UserContext);
  const [groceryItem, setGroceryItem] = useState("");
  const [daysToPurchase, setDaysToPurchase] = useState(null);

  const history = useHistory();

  const onGroceryItemInputChange = (e) => {
    setGroceryItem(e.target.value);
  };

  const sanitizeItemInput = (item) => {
    return item.replace(/[\W_]+/g, "").toLowerCase();
  };

  const onRadioInputChange = (e) => {
    setDaysToPurchase(parseInt(e.target.value));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const alreadyExists = await existingItemCheck(groceryItem);
    if (alreadyExists) {
      alert("Item already on shoppping list");
      return;
    }
    db.add({
      itemName: groceryItem,
      daysToPurchase: daysToPurchase,
      lastPurchasedDate: null,
    });

    setGroceryItem("");
    setDaysToPurchase(null);

    history.push("/List");
  };

  const existingItemCheck = async (item) => {
    let alreadyExists = false;
    await db
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (
            sanitizeItemInput(doc.data().itemName) === sanitizeItemInput(item)
          ) {
            alreadyExists = true;
          }
        });
      })
      .catch((e) => {
        alert(e.message);
      });
    return alreadyExists;
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
            required
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
