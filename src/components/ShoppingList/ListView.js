import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../lib/firebase';

const ListView = () => {
  const [value] = useCollection(db.collection(localStorage.getItem('token')), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const deleteItemHandler = (id) => {
    db.collection(localStorage.getItem('token')).doc(id).delete();
  };

  return (
    <div className="shopping-list">
      <div>
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
