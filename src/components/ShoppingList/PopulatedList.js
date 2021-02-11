import React, { Fragment, useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import calculateEstimate from "../../lib/estimates";

const PopulatedList = () => {
  const [listData] = useCollection(
    db
      .collection(localStorage.getItem("token"))
      .orderBy("daysToPurchase")
      .orderBy("itemName"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [filterValue, setFilterValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (listData) {
      let filtered = listData.docs.filter((doc) => {
        return doc
          .data()
          .itemName.toLowerCase()
          .includes(filterValue.toLowerCase());
      });

      setFilteredList(filtered);
    }
  }, [filterValue, listData]);

  const onFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const resetFilter = () => {
    setFilterValue("");
  };

  const deleteItemHandler = (id) => {
    db.collection(localStorage.getItem("token")).doc(id).delete();
  };

  const onPurchaseChange = (e, itemData) => {
    if (e.target.checked) {
      let lastInterval;
      if (!itemData.numberOfPurchases) {
        lastInterval = null;
      } else {
        const lastIntervalMillis =
          Date.now() - itemData.lastPurchasedDate.toMillis();
        const oneDay = 1000 * 60 * 60 * 24;
        lastInterval = Math.round(lastIntervalMillis / oneDay);
      }

      const lastEstimate = calculateEstimate(
        itemData.daysToPurchase,
        lastInterval,
        itemData.numberOfPurchases + 1,
      );

      db.collection(localStorage.getItem("token"))
        .doc(e.target.value)
        .update({
          lastPurchasedDate: new Date(),
          numberOfPurchases: itemData.numberOfPurchases + 1,
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

  // function getClassName(lastPurchasedDate, daysToPurchase) {
  //   const daysElapsed = Math.floor(
  //     (Date.now() - lastPurchasedDate.toMillis()) / (24 * 60 * 60 * 1000),
  //   );
  //   const daysUntilPurchase = daysToPurchase - daysElapsed;

  //   if (daysElapsed > 2 * daysToPurchase || !lastPurchasedDate)
  //     return "inactive";
  //   if (daysUntilPurchase < 7) return "soon";
  //   if (daysUntilPurchase >= 7 && daysUntilPurchase <= 30) return "kinda-soon";
  //   if (daysToPurchase > 30) return "not-soon";
  // }

  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>
      <input
        aria-label="Filter Items"
        id="itemFilter"
        name="itemFilter"
        type="text"
        placeholder="Filter items..."
        value={filterValue}
        onChange={onFilterChange}
      />
      {filterValue !== "" && (
        <button aria-label="Clear filter" onClick={resetFilter}>
          X
        </button>
      )}
      <div>
        {listData && (
          <ul>
            {filteredList.map((groceryItem) => (
              <Fragment
                key={groceryItem.id}
                // className={getClassName(
                //   groceryItem.data().lastPurchasedDate,
                //   groceryItem.data().daysToPurchase,
                // )}
              >
                <input
                  type="checkbox"
                  id={groceryItem.data().itemName}
                  name={groceryItem.data().itemName}
                  value={groceryItem.id}
                  onChange={(e) => onPurchaseChange(e, groceryItem.data())}
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
