import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskData);
    });
    return () => unsubscribe();
  }, []);

  const filteredTasks = tasks.filter((task) =>
  typeof task.title === "string" &&
  task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return (
    <div className="container">
      <h2 className="heading">Tasks</h2>

      {/* Search form */}
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          className="input"
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="button" type="button">
          Search
        </button>
        <button
          className="button"
          type="button"
          onClick={() => setSearchTerm("")}
        >
          Clear
        </button>
      </form>

      {/* Task list */}
      <ul className="list">
        {filteredTasks.map((task) => (
          <li className="listItem" key={task.id}>
            <span className={task.completed ? "completed" : ""}>
              {task.title}
            </span>
            <button
              className="deleteButton"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && <p>No tasks found.</p>}
    </div>
  );
}

export default TaskList;
