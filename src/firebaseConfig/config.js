// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA_EqYyS3-MNv4aLf5x7VlhVQtYv_s0ryA",
  authDomain: "adminpanel-6b481.firebaseapp.com",
  projectId: "adminpanel-6b481",
  storageBucket: "adminpanel-6b481.appspot.com",
  messagingSenderId: "380673082129",
  appId: "1:380673082129:web:afbd695d66b92accdc82b0",
  measurementId: "G-PKWNPHBQ6Z",
  databaseURL:
    "https://adminpanel-6b481-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase(app);
