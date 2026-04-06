import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function TaskForm() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        createdAt: serverTimestamp(),
        userId: auth.currentUser ? auth.currentUser.uid : null,
      });
      setTitle(""); // clear input
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
