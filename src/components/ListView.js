import React, { useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../lib/firebase';
import { useHistory } from 'react-router-dom';

const ListView = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/');
    } else {
      history.push('/ListView');
    }
  }, [history]);

  const [value, loading, error] = useCollection(
    db.collection(localStorage.getItem('token')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  const deleteItemHandler = (id) => {
    db.collection(localStorage.getItem('token')).doc(id).delete();
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
