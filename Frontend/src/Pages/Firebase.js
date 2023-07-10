import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCPBAQgF8bTMvCVWlU_IOpV-7F0TTp2drc",
  authDomain: "printbajar-3edba.firebaseapp.com",
  projectId: "printbajar-3edba",
  storageBucket: "printbajar-3edba.appspot.com",
  messagingSenderId: "719533183574",
  appId: "1:719533183574:web:9db1c35fb15d9a9f0a61f7",
  measurementId: "G-7W0DG5QC9P",
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;