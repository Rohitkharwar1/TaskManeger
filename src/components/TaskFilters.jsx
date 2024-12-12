const TaskFilters = ({ filterStatus, setFilterStatus }) => {
  return (
    <div className="task-filters">
      <label htmlFor="status-filter">Filter by Status:</label>
      <select
        id="status-filter"
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default TaskFilters;
