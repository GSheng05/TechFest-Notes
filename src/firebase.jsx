import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyt5S9FcdgKhE4MGfwa1zXSVafQopIlkg",
  authDomain: "techfest-notesfirebase.firebaseapp.com",
  projectId: "techfest-notesfirebase",
  storageBucket: "techfest-notesfirebase.firebasestorage.app",
  messagingSenderId: "1035434404870",
  appId: "1:1035434404870:web:8f586e6bb7d2b436e8e787",
  measurementId: "G-WRFFKFQHMS"
};



export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
