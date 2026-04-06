import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Task Tracker (Firestore)</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
