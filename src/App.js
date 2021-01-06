import React, { useEffect, useState } from 'react';
import { fb } from './lib/firebase';

function App() {
  const [term, setTerm] = useState('');
  const [list, setList] = useState([]);

  // initialize firestore
  const db = fb.firestore();

  const onInputChange = (e) => {
    setTerm(e.target.value);
  };

  const getItems = async () => {
    const data = await db.collection('shoppingLists').get();
    data.docs.map((doc) => setList([...list, doc.data()]));

    // console.log(data)
    // for(const doc of data.docs){
    //   console.log(typeof doc.data().item);
    // }
    // return "Hi"
    //return data.docs.map(doc => console.log(doc.data()))
  };

  useEffect(() => {
    getItems();
  }, []);

  //   async getMarker() {
  //     const snapshot = await firebase.firestore().collection('events').get()
  //     return snapshot.docs.map(doc => doc.data());
  // }

  const renderList = () => {
    console.log(Array.isArray(list));
    return list.map((item) => <li>{item.item}</li>);
  };

  console.log(list);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    db.collection('shoppingLists').add({
      item: term,
    });

    setTerm('');
  };

  //getItems()

  return (
    <div className="App">
      <h1>firestore connect</h1>
      <form onSubmit={onSubmitHandler}>
        <input value={term} onChange={onInputChange} />
      </form>
      <div>
        <ul>{renderList()}</ul>
      </div>
    </div>
  );
}

export default App;
