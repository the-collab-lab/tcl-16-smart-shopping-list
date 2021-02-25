import React, { useState } from "react";
import { db } from "../../lib/firebase";
import swal from "@sweetalert/with-react";
// styles
import "./AddItem.scss";

const AddItem = () => {
  const [groceryItem, setGroceryItem] = useState("");
  const [daysToPurchase, setDaysToPurchase] = useState(null);

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
    db.collection(localStorage.getItem("token")).add({
      itemName: groceryItem,
      daysToPurchase: daysToPurchase,
      lastPurchasedDate: null,
      numberOfPurchases: 0,
    });

    setGroceryItem("");
    setDaysToPurchase(null);

    swal("Item added!", {
      icon: "success",
      buttons: false,
      timer: 500,
    });
  };

  const existingItemCheck = async (item) => {
    let alreadyExists = false;
    await db
      .collection(localStorage.getItem("token"))
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
        <fieldset>
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
