import React, { useState } from "react";
import { db } from "../../lib/firebase";
import swal from "@sweetalert/with-react";
// styles
import "./AddItem.scss";
// image
import { ReactComponent as WineDog } from "../../img/wine_dog.svg";

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
      swal({
        title: "Check again!",
        text: "Looks like this item is already on your shopping list.",
      });

      setGroceryItem("");
      setDaysToPurchase(null);
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
      timer: 1000,
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
        swal({
          title: "Error",
          text: e.message,
          icon: "error",
        });
      });
    return alreadyExists;
  };

  return (
    <main className="add-item">
      <h1>Add Item</h1>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="addItem">
          Item Name:{" "}
          <input
            id="addItem"
            name="addItem"
            type="text"
            value={groceryItem}
            onChange={onGroceryItemInputChange}
            required
          />
        </label>
        <fieldset>
          <p>How soon will you buy this again?</p>
          <div className="radio-group-container">
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
            <input
              id="kinda-soon"
              value="14"
              type="radio"
              name="daysToPurchase"
              onChange={onRadioInputChange}
              checked={daysToPurchase === 14}
            />
            <label htmlFor="kinda-soon">Kind of Soon</label>
            <input
              id="not-soon"
              value="30"
              type="radio"
              name="daysToPurchase"
              onChange={onRadioInputChange}
              checked={daysToPurchase === 30}
            />
            <label htmlFor="not-soon">Not Soon</label>
          </div>
        </fieldset>
        <input type="submit" value="Add to Shopping List" />
      </form>
      <div className="image-container">
        <WineDog />
      </div>
    </main>
  );
};

export default AddItem;
