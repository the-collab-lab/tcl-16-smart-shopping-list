import React, { Fragment, useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";

const PopulatedList = () => {
  const [listData] = useCollection(
    db.collection(localStorage.getItem("token")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const [filterValue, setFilterValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const deleteItemHandler = (id) => {
    db.collection(localStorage.getItem("token")).doc(id).delete();
  };

  useEffect(() => {
    setFilteredList(listData);
  }, [filterValue]);

  const onFilterChange = (e) => {
    setFilterValue(e.target.value);
    console.log("value", filterValue);
    if (listData) {
      let filtered = listData.docs.filter((doc) => {
        return doc.data().itemName.includes(setFilterValue);
      });

      setFilteredList(filtered);
    }

    console.log("filtered list", filteredList);

    // e.persist();
    // db.collection(localStorage.getItem("token"))
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       if (doc.data().itemName === e.target.value) {
    //         console.log("word is included", e.target.value);
    //       } else {
    //         console.log("not included");
    //       }

    //       filteredList.filter();
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log("Error getting documents: ", error);
    //   });
  };

  const onPurchaseChange = (e) => {
    if (e.target.checked) {
      db.collection(localStorage.getItem("token"))
        .doc(e.target.value)
        .update({ lastPurchasedDate: new Date() });
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
      <input
        id="itemFilter"
        name="itemFilter"
        type="text"
        placeholder="Filter items..."
        onChange={onFilterChange}
      ></input>
      <div>
        {listData && (
          <ul>
            {listData.docs.map((groceryItem) => (
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
