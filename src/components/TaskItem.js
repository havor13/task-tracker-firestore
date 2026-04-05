import { toggleTask, deleteTask } from "../services/taskService";

export default function TaskItem({ task }) {
  return (
    <li>
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
        onClick={() => toggleTask(task.id, !task.completed)}
      >
        {task.title}
      </span>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}
