/**
 * firebase configuaration of my Project
 */
import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDXLBDHf-vejwxOBYo5aXsNq2KWsEpFGcI",
  authDomain: "fundoo-keep.firebaseapp.com",
  databaseURL: "https://fundoo-keep.firebaseio.com",
  projectId: "fundoo-keep",
  storageBucket: "fundoo-keep.appspot.com",
  messagingSenderId: "785709131579",
  appId: "1:785709131579:web:b433b44c1710ceaada391e",
  measurementId: "G-4T4H4QHGP0"
};
const firebaseConfiguration = firebase.initializeApp(firebaseConfig);
export default firebaseConfiguration;
