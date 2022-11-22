// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm5p2ZZ0Gfg26MkWFw8b4ZwE9_tR9Xz3o",
  authDomain: "react-netflix-clone-ea693.firebaseapp.com",
  projectId: "react-netflix-clone-ea693",
  storageBucket: "react-netflix-clone-ea693.appspot.com",
  messagingSenderId: "807005978236",
  appId: "1:807005978236:web:76d493bd98cb2b8a7013f9",
  measurementId: "G-46QKHVLEVJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app); 