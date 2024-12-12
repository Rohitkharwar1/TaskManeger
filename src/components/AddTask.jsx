import { useState } from "react";

const AddTask = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleAdd = () => {
    const newTask = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID
      title,
      description,
      status,
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setStatus("To Do");
  };

  return (
    <div className="add-task-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
};

export default AddTask;
