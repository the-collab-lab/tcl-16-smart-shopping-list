import React, { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import authContext from "../../auth";
import { db } from "../../lib/firebase";

import EmptyList from "./EmptyList";
import PopulatedList from "./PopulatedList";

const ListContainer = () => {
  const userAuthToken = useContext(authContext);

  const [value, loading, error] = useCollection(db.collection(userAuthToken), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <>
      <hr />
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading Shopping List...</span>}
      {value && (value.empty ? <EmptyList /> : <PopulatedList />)}
    </>
  );
};

export default ListContainer;
