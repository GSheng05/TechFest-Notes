import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc4pmydkKcWvMWtdL_3POMcxuatGYavQ4",
  authDomain: "techfest-8f66a.firebaseapp.com",
  projectId: "techfest-8f66a",
  storageBucket: "techfest-8f66a.firebasestorage.app",
  messagingSenderId: "530505669745",
  appId: "1:530505669745:web:977ac87d907293fc8e0fd0"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
