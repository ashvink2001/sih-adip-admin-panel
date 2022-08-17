// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAdVrNSjHGuPLeADPOJwOoohEXZIC3nhos",
  authDomain: "adip-78b9c.firebaseapp.com",
  databaseURL: "https://adip-78b9c-default-rtdb.firebaseio.com",
  projectId: "adip-78b9c",
  storageBucket: "adip-78b9c.appspot.com",
  messagingSenderId: "25385403487",
  appId: "1:25385403487:web:8cd37f28a8fd1aba8147ea",
  measurementId: "G-X306PZYKXZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase(app);

// export const getMessage = getMessaging(app);
