import React, { Fragment } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import calculateEstimate from "../../lib/estimates";

const PopulatedList = () => {
  const [value, loading, error] = useCollection(
    db.collection(localStorage.getItem("token")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const deleteItemHandler = (id) => {
    db.collection(localStorage.getItem("token")).doc(id).delete();
  };

  const onPurchaseChange = (e) => {
    if (e.target.checked) {
      const data = value.docs
        .filter((item) => item.id === e.target.value)[0]
        .data();

      let lastInterval;
      if (data.numberOfPurchases < 1) {
        lastInterval = null;
      } else {
        const lastIntervalMillis =
          Date.now() - data.lastPurchasedDate.toMillis();
        const oneDay = 1000 * 60 * 60 * 24;
        lastInterval = Math.round(lastIntervalMillis / oneDay);
      }

      const lastEstimate = calculateEstimate(
        data.daysToPurchase,
        lastInterval,
        data.numberOfPurchases + 1,
      );
      db.collection(localStorage.getItem("token"))
        .doc(e.target.value)
        .update({
          lastPurchasedDate: new Date(),
          numberOfPurchases: data.numberOfPurchases + 1,
          daysToPurchase: lastEstimate,
        });
    }
  };

  const hasItemBeenPurchased = (lastPurchaseTimestamp) => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    let isMoreThanADay = false;
    if (lastPurchaseTimestamp) {
      isMoreThanADay = now - lastPurchaseTimestamp.toMillis() < oneDay;
    }
    return isMoreThanADay;
  };

  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>
      <div>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Loading Shopping List...</span>}
        {value && (
          <ul>
            {value.docs.map((groceryItem) => (
              <Fragment key={groceryItem.id}>
                <input
                  type="checkbox"
                  id={groceryItem.data().itemName}
                  name={groceryItem.data().itemName}
                  value={groceryItem.id}
                  onChange={onPurchaseChange}
                  checked={hasItemBeenPurchased(
                    groceryItem.data().lastPurchasedDate,
                  )}
                ></input>
                <li onClick={() => deleteItemHandler(groceryItem.id)}>
                  {groceryItem.data().itemName}
                </li>
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PopulatedList;
