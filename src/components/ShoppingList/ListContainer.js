import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../lib/firebase";

import EmptyList from "./EmptyList";
import PopulatedList from "./PopulatedList/PopulatedList";

const ListContainer = () => {
  const [value, loading, error] = useCollection(
    db.collection(localStorage.getItem("token")),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading Shopping List...</span>}
      {value && (value.empty ? <EmptyList /> : <PopulatedList />)}
    </>
  );
};

export default ListContainer;
