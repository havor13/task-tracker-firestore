// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCiQWYOCU4J_MWiig65PE9dbrscvayPslI",
  authDomain: "task-tracker-firestore.firebaseapp.com",
  databaseURL: "https://task-tracker-firestore-default-rtdb.firebaseio.com",
  projectId: "task-tracker-firestore",
  storageBucket: "task-tracker-firestore.firebasestorage.app",
  messagingSenderId: "687510985404",
  appId: "1:687510985404:web:6485805cd027011209ceb9",
  measurementId: "G-EDKN8HLLME"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);

// Export Analytics
export const analytics = getAnalytics(app);

// Export Authentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
