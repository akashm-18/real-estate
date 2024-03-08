// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2b292.firebaseapp.com",
  projectId: "mern-estate-2b292",
  storageBucket: "mern-estate-2b292.appspot.com",
  messagingSenderId: "296029852609",
  appId: "1:296029852609:web:0ded7e4c4a7620b4bf5540"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);