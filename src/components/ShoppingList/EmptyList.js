import React from 'react';
import { useHistory } from 'react-router-dom';

const EmptyList = () => {
  const history = useHistory();

  const itemRedirect = () => {
    history.push('/AddItem');
  };
  return (
    <>
      <p>Your shopping list is empty!</p>
      <button onClick={itemRedirect}>Add item</button>
    </>
  );
};

export default EmptyList;
