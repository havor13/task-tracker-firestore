// Firestore CRUD operations
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Add Task
export async function addTask(task) {
  await addDoc(collection(db, "tasks"), task);
}

// Get All Tasks
export async function getTasks() {
  const snapshot = await getDocs(collection(db, "tasks"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Update Task
export async function updateTask(id, updatedTask) {
  const taskRef = doc(db, "tasks", id);
  await updateDoc(taskRef, updatedTask);
}

// Delete Task
export async function deleteTask(id) {
  const taskRef = doc(db, "tasks", id);
  await deleteDoc(taskRef);
}

// Search Tasks (by title)
export async function searchTasks(keyword) {
  const q = query(collection(db, "tasks"), where("title", "==", keyword));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
