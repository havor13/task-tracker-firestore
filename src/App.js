import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue, push, set, update, remove } from "firebase/database";
import TaskForm from "./components/TaskForm.js";
import TaskList from "./components/TaskList.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  // 🔄 Fetch tasks in real-time
  useEffect(() => {
    const tasksRef = ref(db, "tasks");
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTasks(tasksList);
      } else {
        setTasks([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // ➕ Add or Update a task
  const handleSubmitTask = async (task) => {
    if (editTask) {
      const taskRef = ref(db, `tasks/${editTask.id}`);
      await update(taskRef, {
        title: task.title,
        description: task.description,
      });
      setEditTask(null);
    } else {
      const tasksRef = ref(db, "tasks");
      const newTaskRef = push(tasksRef);
      await set(newTaskRef, {
        title: task.title,
        description: task.description,
        status: "pending",
      });
    }
  };

  // ✅ Toggle completion
  const handleToggleComplete = async (taskId, currentStatus) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    await update(taskRef, {
      status: currentStatus === "completed" ? "pending" : "completed",
    });
  };

  // ❌ Delete task
  const handleDeleteTask = async (taskId) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    await remove(taskRef);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Task Tracker</h1>

      {/* Task Form */}
      <TaskForm onSubmit={handleSubmitTask} editTask={editTask} />

      {/* Task List */}
      <TaskList
        tasks={tasks}
        onEdit={setEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={(id) => {
          const task = tasks.find((t) => t.id === id);
          if (task) handleToggleComplete(id, task.status);
        }}
      />
    </div>
  );
}

export default App;
