import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCMrZIqU6rbXS2vZ68HXHRWLPsT5J2vGiI",
  authDomain: "task-tracker-firestore-59ad3.firebaseapp.com",
  projectId: "task-tracker-firestore-59ad3",
  storageBucket: "task-tracker-firestore-59ad3.firebasestorage.app",
  messagingSenderId: "1068278671364",
  appId: "1:1068278671364:web:e5af3fe00d6524d1706d51",
  measurementId: "G-N0R9VB77BK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
