import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBi9pVq2whxw-7R-fV1wyidACSIOc-Dfhg",
  authDomain: "photoblog-174a8.firebaseapp.com",
  projectId: "photoblog-174a8",
  storageBucket: "photoblog-174a8.appspot.com",
  messagingSenderId: "309406492811",
  appId: "1:309406492811:web:f8c90c59d86fba48850c8e",
  measurementId: "G-G185Y7JPWZ",
};

const db = firebase.initializeApp(firebaseConfig);

export default db;
