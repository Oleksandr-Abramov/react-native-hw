import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBi9pVq2whxw-7R-fV1wyidACSIOc-Dfhg",
  authDomain: "photoblog-174a8.firebaseapp.com",
  projectId: "photoblog-174a8",
  storageBucket: "photoblog-174a8.appspot.com",
  messagingSenderId: "309406492811",
  appId: "1:309406492811:web:f8c90c59d86fba48850c8e",
  measurementId: "G-G185Y7JPWZ",
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();

export const firestore = firebase.firestore();

export default firebase;
