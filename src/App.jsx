import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import TaskTable from "./components/TaskTable";
import AddTaskForm from "./components/AddTask";
import TaskFilters from "./components/TaskFilters";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch initial data
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const formattedTasks = response.data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: "No description provided",
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(formattedTasks);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch tasks!");
      });
  }, []);

  // Add a new task
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added successfully!");
  };

  // Edit an existing task
  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    toast.success("Task updated successfully!");
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    toast.success("Task deleted successfully!");
  };

  // Filter tasks based on status and search query
  const filteredTasks = tasks.filter(
    (task) =>
      (filterStatus === "All" || task.status === filterStatus) &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Task counters
  const taskCounts = useMemo(() => {
    return tasks.reduce(
      (counts, task) => {
        if (task.status === "To Do") counts.toDo += 1;
        if (task.status === "In Progress") counts.inProgress += 1;
        if (task.status === "Done") counts.done += 1;
        return counts;
      },
      { toDo: 0, inProgress: 0, done: 0 }
    );
  }, [tasks]);

  return (
    <div className="app-container">
      <h1>Task List Manager</h1>

      {/* Task Counters */}
      <div className="task-counters">
        <p>To Do: {taskCounts.toDo}</p>
        <p>In Progress: {taskCounts.inProgress}</p>
        <p>Done: {taskCounts.done}</p>
      </div>

      {/* Search Bar */}
      <div className="task-search">
        <input
          type="text"
          placeholder="Search by Title or Description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters, Add Task, and Task Table */}
      <TaskFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <AddTaskForm onAddTask={handleAddTask} />
      <TaskTable
        tasks={filteredTasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      <ToastContainer />
    </div>
  );
}

export default App;
