import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../lib/firebase';

import EmptyList from './EmptyList';
import ListView from './ListView';

const ListContainer = () => {
  const [value, loading, error] = useCollection(
    db.collection(localStorage.getItem('token')),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <>
      <hr />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading Shopping List...</span>}
      {value && (value.empty ? <EmptyList /> : <ListView />)}
    </>
  );
};

export default ListContainer;
