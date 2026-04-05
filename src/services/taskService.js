import { db } from "../firebase";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const tasksCollection = collection(db, "tasks");

export const addTask = async (task) => {
  await addDoc(tasksCollection, {
    title: task.title,
    completed: false,
    createdAt: new Date()
  });
};

export const subscribeTasks = (callback) => {
  return onSnapshot(tasksCollection, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(tasks);
  });
};

export const toggleTask = async (id, completed) => {
  await updateDoc(doc(db, "tasks", id), { completed });
};

export const deleteTask = async (id) => {
  await deleteDoc(doc(db, "tasks", id));
};
