// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKxsD2UV4mToHl4gDHGVKnDO5AFo04DeI",
  authDomain: "techfest-firebase.firebaseapp.com",
  projectId: "techfest-firebase",
  storageBucket: "techfest-firebase.firebasestorage.app",
  messagingSenderId: "376759457001",
  appId: "1:376759457001:web:b2af622bdd1f3f12148c78"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
