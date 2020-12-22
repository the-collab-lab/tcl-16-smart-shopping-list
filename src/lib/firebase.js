// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: "AIzaSyAryrdGGzIRpgNIBOYTYm1nbAGP1n60m3E",
  authDomain: "tcl-16-shopping-list.firebaseapp.com",
  projectId: "tcl-16-shopping-list",
  storageBucket: "tcl-16-shopping-list.appspot.com",
  messagingSenderId: "673795137687",
  appId: "1:673795137687:web:0cca36b195ad94bd0c89d2"
};

let fb = firebase.initializeApp(firebaseConfig);

export { fb };
