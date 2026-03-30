// Import Firebase core and Realtime Database
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiQWYOCU4J_MWiig65PE9dbrscvayPslI",
  authDomain: "task-tracker-firestore.firebaseapp.com",
  databaseURL: "https://task-tracker-firestore-default-rtdb.firebaseio.com", // Realtime Database URL
  projectId: "task-tracker-firestore",
  storageBucket: "task-tracker-firestore.appspot.com",
  messagingSenderId: "687510985404",
  appId: "1:687510985404:web:a9a9d9eb13fc23e309ceb9",
  measurementId: "G-VFTF2Z2K2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Realtime Database instance
export const db = getDatabase(app);
