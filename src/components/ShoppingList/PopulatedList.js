import React, { Fragment, useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import UserContext from "../../App";

const PopulatedList = () => {
  const { db } = useContext(UserContext);
  const [value, loading, error] = useCollection(db, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const deleteItemHandler = (id) => {
    db.doc(id).delete();
  };

  const onPurchaseChange = (e) => {
    if (e.target.checked) {
      db.doc(e.target.value).update({ lastPurchasedDate: new Date() });
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
