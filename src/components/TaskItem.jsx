function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4 mb-2 rounded">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.completed ? 'line-through text-gray-400' : 'text-black'
        }`}
      >
        {task.title}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700 font-bold"
      >
        X
      </button>
    </div>
  );
}

export default TaskItem;
