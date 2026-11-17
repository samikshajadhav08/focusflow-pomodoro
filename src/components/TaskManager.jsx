
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

export default function TaskManager({
  tasks,
  selectedTaskId,
  addTask,
  toggleTask,
  deleteTask,
  selectTask,
}) {

  return (
    <section className="grid grid-cols-1
                        lg:grid-cols-2 gap-6">

      <TaskForm addTask={addTask} />

      <div className="bg-[#10101C]
                      rounded-2xl p-5
                      border border-white/10">

        <div className="flex justify-between mb-5">

          <h3 className="text-white font-semibold">
            My Study Tasks
          </h3>

          <span className="text-purple-400 text-sm">
            {tasks.filter(task => !task.completed).length} Pending
          </span>

        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">

          {tasks.length === 0 ? (

            <p className="text-gray-500 text-center py-10">
              No tasks yet. Add your first study task!
            </p>

          ) : (

            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                isSelected={selectedTaskId === task.id}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                selectTask={selectTask}
              />
            ))

          )}

        </div>

      </div>

    </section>
  );
}
