import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css";

const TaskTable = ({ tasks, onEditTask, onDeleteTask }) => {
  const columns = [
    { title: "ID", field: "id", width: 50, headerSort: false },
    {
      title: "Title",
      field: "title",
      editor: "input",
    },
    {
      title: "Description",
      field: "description",
      editor: "input",
    },
    {
      title: "Status",
      field: "status",
      editor: "select",
      editorParams: { values: ["To Do", "In Progress", "Done"] },
    },
    {
      title: "Actions",
      formatter: () => `<button class="delete-btn">Delete</button>`,
      width: 100,
      headerSort: false,
      cellClick: (e, cell) => onDeleteTask(cell.getRow().getData().id),
    },
  ];

  const handleCellEdited = (cell) => {
    const updatedTask = cell.getRow().getData();
    onEditTask(updatedTask);
  };

  return (
    <div className="task-table">
      <ReactTabulator
        data={tasks}
        columns={columns}
        layout="fitData"
        cellEdited={handleCellEdited}
      />
    </div>
  );
};

export default TaskTable;
