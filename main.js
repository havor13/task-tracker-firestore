// Connect UI to Firestore functions
import { addTask, getTasks, updateTask, deleteTask, searchTasks } from "./taskService.js";

const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

let editMode = false;
let editTaskId = null;

// Render tasks in UI
async function renderTasks(tasks = null) {
  const data = tasks || await getTasks();
  taskList.innerHTML = "";
  data.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.title}: ${task.description}`;

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      document.getElementById("title").value = task.title;
      document.getElementById("description").value = task.description;
      editMode = true;
      editTaskId = task.id;
    };

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await deleteTask(task.id);
      renderTasks();
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  if (editMode) {
    await updateTask(editTaskId, { title, description });
    editMode = false;
    editTaskId = null;
  } else {
    await addTask({ title, description });
  }

  form.reset();
  renderTasks();
});

// Handle search
searchBtn.addEventListener("click", async () => {
  const keyword = searchInput.value.trim();
  if (keyword) {
    const results = await searchTasks(keyword);
    renderTasks(results);
  } else {
    renderTasks();
  }
});

// Handle reset (reload all tasks)
resetBtn.addEventListener("click", async () => {
  searchInput.value = "";
  renderTasks();
});

// Initial render
renderTasks();
