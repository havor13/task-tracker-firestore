import React, { useEffect, useState } from "react";
import { ref, onValue, update, remove } from "firebase/database";
import { db } from "../firebase";
import "../styles.css";

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);

  // 🔄 Load tasks from Firebase in real time
  useEffect(() => {
    const tasksRef = ref(db, "tasks");
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedTasks = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setTasks(loadedTasks);
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Toggle task status
  const handleToggleComplete = (id, currentStatus) => {
    const taskRef = ref(db, `tasks/${id}`);
    update(taskRef, {
      status: currentStatus === "completed" ? "pending" : "completed",
    });
  };

  // ❌ Delete task
  const handleDelete = (id) => {
    const taskRef = ref(db, `tasks/${id}`);
    remove(taskRef);
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <div className="task-details">
            <h3 className="task-title">{task.title}</h3>
            <p className="task-desc">{task.description}</p>
            <p className={`task-status ${task.status}`}>
              Status: {task.status}
            </p>
          </div>
          <div className="task-actions">
            <button
              className="complete-btn"
              onClick={() => handleToggleComplete(task.id, task.status)}
            >
              {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
            </button>
            <button className="edit-btn" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
