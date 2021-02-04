import React, { useContext } from "react";
// import { useCollection } from "react-firebase-hooks/firestore";
import UserContext from "../../App";

import EmptyList from "./EmptyList";
import PopulatedList from "./PopulatedList";

const ListContainer = () => {
  const { db } = useContext(UserContext);

  // const [value, loading, error] = useCollection(db, {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // });

  return (
    <>
      <hr />
      {/* {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Loading Shopping List...</span>}
      {value && (value.empty ? <EmptyList /> : <PopulatedList />)} */}
    </>
  );
};

export default ListContainer;
