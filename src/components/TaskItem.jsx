
import {
  Check,
  Trash2,
  Play,
} from "lucide-react";

export default function TaskItem({
  task,
  isSelected,
  toggleTask,
  deleteTask,
  selectTask,
}) {

  return (
    <div
      className={`p-4 rounded-xl border
        transition-all
        ${
          isSelected
            ? "border-purple-500 bg-purple-500/10"
            : "border-white/10 bg-[#17172A]"
        }`}
    >

      <div className="flex items-center gap-3">

        <button
          onClick={() => toggleTask(task.id)}
          aria-label={
            task.completed
              ? "Mark task incomplete"
              : "Mark task complete"
          }
          className={`w-6 h-6 rounded-full border
            flex items-center justify-center
            ${
              task.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-500"
            }`}
        >
          {task.completed && (
            <Check size={15} className="text-white" />
          )}
        </button>

        <div className="flex-1 min-w-0">

          <h4
            className={`text-white font-medium
              break-words
              ${
                task.completed
                  ? "line-through opacity-50"
                  : ""
              }`}
          >
            {task.title}
          </h4>

          <p className="text-gray-400 text-xs mt-1">
            {task.subject} · {task.completedSessions} sessions
          </p>

        </div>

        <button
          onClick={() => deleteTask(task.id)}
          aria-label="Delete task"
          className="text-gray-400 hover:text-red-400"
        >
          <Trash2 size={18} />
        </button>

      </div>

      {!task.completed && (
        <button
          onClick={() => selectTask(task.id)}
          className={`mt-4 w-full py-2 rounded-lg
            text-sm flex justify-center items-center gap-2
            ${
              isSelected
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
        >
          <Play size={15} />

          {isSelected ? "Selected for Focus" : "Focus on this task"}
        </button>
      )}

    </div>
  );
}
