import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOfryeYahPZaER66DKgFAYY5LGWanloVU",
  authDomain: "netflix-payment-v2.firebaseapp.com",
  projectId: "netflix-payment-v2",
  storageBucket: "netflix-payment-v2.appspot.com",
  messagingSenderId: "201528825336",
  appId: "1:201528825336:web:6b8d7c2583c7f3d6cdb20d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { auth, db };
