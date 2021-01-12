import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';

const ListView = () => {
  const [value, loading, error] = useCollection(db.collection('shoppingList'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const deleteItemHandler = (id) => {
    db.collection('shoppingList').doc(id).delete();
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
              <li
                key={groceryItem.id}
                onClick={() => deleteItemHandler(groceryItem.id)}
              >
                {groceryItem.data().itemName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListView;
