import React, { useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../lib/firebase";
import "./PopulatedList.scss";
import calculateEstimate from "../../../lib/estimates";
import swal from "@sweetalert/with-react";
import { ReactComponent as Checkbox } from "../../../img/circle_empty.svg";
import { ReactComponent as DeleteButton } from "../../../img/delete_button.svg";

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
        doc.purchaseCountdown = calculateDaysTilNextPurchase(doc);
      });

      // Sort by days until next purchase
      // The if/else ensures that 'null' (inactive) items will always be at bottom
      list.sort(function (a, b) {
        if (a.purchaseCountdown === null) {
          return 1;
        } else if (b.purchaseCountdown === null) {
          return -1;
        }
        return a.purchaseCountdown < b.purchaseCountdown ? -1 : 1;
      });

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

  const deleteItemHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, this action cannot be undone.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        db.collection(localStorage.getItem("token")).doc(id).delete();
        swal("Item deleted!", {
          icon: "success",
          button: false,
        });
      }
    });
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
    const purchaseCountdown = itemObj.daysToPurchase - daysElapsed;
    return purchaseCountdown;
  }

  function getClassName(itemObj) {
    if (itemObj.purchaseCountdown === null) {
      return "inactive";
    } else if (itemObj.purchaseCountdown < 7) {
      return "soon";
    } else if (itemObj.purchaseCountdown < 30) {
      return "kinda-soon";
    } else {
      return "not-soon";
    }
  }

  function formatTime(seconds) {
    const months = {
      0: "Jan.",
      1: "Feb.",
      2: "March",
      3: "April",
      4: "May",
      5: "June",
      6: "July",
      7: "Aug.",
      8: "Sept.",
      9: "Oct.",
      10: "Nov.",
      11: "Dec.",
    };
    const timestamp = new Date(seconds * 1000);
    return `${
      months[timestamp.getMonth()]
    } ${timestamp.getDate()}, ${timestamp.getFullYear()}`;
  }

  return (
    <>
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
            Clear
          </button>
        )}
      </div>
      <div className="listDataContainer">
        {listData && (
          <div className="listItemContainer">
            {filteredList.map((groceryItem) => (
              <div key={groceryItem.id}>
                <div className={getClassName(groceryItem)}>
                  <div className="itemArrangement">
                    <div className="checkedItemContainer">
                      <div className="checkbox">
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
                          visible="false"
                        />
                        <label for="checkbox">
                          <Checkbox className="circle" aria-hidden="true" />
                        </label>
                      </div>
                    </div>

                    <div className="itemDetailsContainer">
                      <div className="itemName">{groceryItem.itemName}</div>
                      <div className="lastPurchaseDate">
                        $:{" "}
                        {groceryItem.lastPurchasedDate
                          ? formatTime(groceryItem.lastPurchasedDate["seconds"])
                          : "n/a"}
                      </div>
                    </div>

                    <div className="countdownContainer">
                      <div className="daysNumber">
                        {groceryItem.daysToPurchase}
                      </div>
                      <div className="daysText">days</div>
                    </div>
                    <div className="deleteItemContainer">
                      <DeleteButton
                        onClick={() => deleteItemHandler(groceryItem.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PopulatedList;
