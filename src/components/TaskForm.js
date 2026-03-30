import React, { useState } from "react";
import "../styles.css"; 

function TaskForm({ onSubmit, editTask }) {
  const [title, setTitle] = useState(editTask ? editTask.title : "");
  const [description, setDescription] = useState(editTask ? editTask.description : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2 className="form-title">{editTask ? "Edit Task" : "Add New Task"}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
