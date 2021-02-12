import React, { Fragment, useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";
import calculateEstimate from "../../lib/estimates";

const PopulatedList = () => {
  const [listData] = useCollection(
    db

      // Sort in alphabetical order from DB
      .collection(localStorage.getItem("token"))
      .orderBy("itemName", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [filterValue, setFilterValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (listData) {
      // Iterate over firestore obj - need to save doc ID as a key in new obj
      // Save each firestore object as a regular object in our own array
      let list = [];
      listData.docs.map((doc) => {
        let docObj = doc.data();
        docObj.id = doc.id;
        list.push(docObj);
      });

      // Map over new array and calculate days until next purchase for each item
      // Set as new property on object (only saved in our app - not in db)
      list.map((doc) => {
        doc.daysUntilPurchase = calculateDaysTilNextPurchase(doc);
      });

      // Sort by days until next purchase
      // The if/else ensures that 'null' (inactive) items will always be at bottom - thanks stackoverflow
      list.sort(function (a, b) {
        if (a.daysUntilPurchase === null) {
          return 1;
        } else if (b.daysUntilPurchase === null) {
          return -1;
        }
        return a.daysUntilPurchase < b.daysUntilPurchase ? -1 : 1;
      });

      // Run filter on our new list and set state using this list
      let filtered = list.filter((doc) => {
        return doc.itemName.toLowerCase().includes(filterValue.toLowerCase());
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

  // const deleteItemHandler = (id) => {
  //   db.collection(localStorage.getItem("token")).doc(id).delete();
  // };

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
        .doc(itemData.id)
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

  function calculateDaysTilNextPurchase(itemObj) {
    if (!itemObj.lastPurchasedDate) return null;
    const daysElapsed = Math.floor(
      (Date.now() - itemObj.lastPurchasedDate.toMillis()) /
        (24 * 60 * 60 * 1000),
    );
    if (daysElapsed > 2 * itemObj.daysToPurchase) return null;
    const daysUntilPurchase = itemObj.daysToPurchase - daysElapsed;
    return daysUntilPurchase;
  }

  function getClassName(itemObj) {
    if (itemObj.daysUntilPurchase === null) {
      return "inactive";
    } else if (itemObj.daysUntilPurchase < 7) {
      return "soon";
    } else if (itemObj.daysUntilPurchase < 30) {
      return "kinda-soon";
    } else {
      return "not-soon";
    }
  }

  return (
    <div className="shopping-list">
      <h1>Shopping List</h1>
      <label>
        Filter items:{" "}
        <input
          aria-label="Filter Items"
          id="itemFilter"
          name="itemFilter"
          type="text"
          value={filterValue}
          onChange={onFilterChange}
        />
      </label>
      {filterValue !== "" && (
        <button aria-label="Clear filter" onClick={resetFilter}>
          X
        </button>
      )}
      <div>
        {listData && (
          <ul>
            {/* All of these methods have been updated so we're just iterating over
            our simple array rather than .doc.data() etc */}
            {filteredList.map((groceryItem) => (
              <Fragment key={groceryItem.id}>
                <label>
                  Purchased?{" "}
                  <input
                    aria-label="Purchased?"
                    type="checkbox"
                    id={groceryItem.itemName}
                    name={groceryItem.itemName}
                    value={groceryItem.id}
                    onChange={(e) => onPurchaseChange(e, groceryItem)}
                    checked={hasItemBeenPurchased(
                      groceryItem.lastPurchasedDate,
                    )}
                  />
                </label>
                <li
                  // onClick={() => deleteItemHandler(groceryItem.id)}
                  className={getClassName(groceryItem)}
                  aria-label="Grocery Item to be purchased."
                >
                  {groceryItem.itemName} - {groceryItem.daysToPurchase}
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
