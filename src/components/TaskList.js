import { useEffect, useState } from "react";
import { subscribeTasks } from "../services/taskService";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeTasks(setTasks);
    return () => unsubscribe();
  }, []);

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}
