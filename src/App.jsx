
import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import SessionSelector from "./components/SessionSelector";
import StatsCard from "./components/StatsCard";
import ProgressBar from "./components/ProgressBar";
import TaskManager from "./components/TaskManager";

import { usePomodoro } from "./hooks/usePomodoro";
import { useTasks } from "./hooks/useTasks";

function App() {

  const {
    tasks,
    selectedTask,
    selectedTaskId,
    addTask,
    toggleTask,
    deleteTask,
    selectTask,
    incrementTaskSession,
  } = useTasks();

  const {
    mode,
    timeLeft,
    isRunning,
    completedSessions,
    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
    enableNotifications,
  } = usePomodoro({
    onFocusComplete: incrementTaskSession,
  });

  const focusMinutes = completedSessions * 25;
  const dailyGoal = 100;

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  return (
    <div className="min-h-screen bg-[#0B0B14]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-10">

        {/* Heading */}
        <div className="mb-10">

          <h2 className="text-3xl font-bold text-white">
            Welcome to FocusFlow 👋
          </h2>

          <p className="text-gray-400 mt-2">
            Stay consistent. Prepare smarter. Get hired.
          </p>

        </div>

        {/* Timer */}
        <div className="max-w-2xl mx-auto mb-12">

          <SessionSelector
            mode={mode}
            changeMode={changeMode}
          />

          {selectedTask && (
            <p className="text-center text-purple-400 mb-4">
              Currently focusing on: {selectedTask.title}
            </p>
          )}

          <Timer
            mode={mode}
            timeLeft={timeLeft}
            isRunning={isRunning}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
          />

          <button
            onClick={enableNotifications}
            className="mt-4 text-sm text-gray-400
                       hover:text-purple-400"
          >
            Enable browser notifications
          </button>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2
                        lg:grid-cols-3 gap-5 mb-8">

          <StatsCard
            title="Completed Sessions"
            value={completedSessions}
            subtitle="Keep up the momentum"
            type="sessions"
          />

          <StatsCard
            title="Focus Minutes"
            value={focusMinutes}
            subtitle="Total completed focus time"
            type="minutes"
          />

          <StatsCard
            title="Completed Tasks"
            value={completedTasks}
            subtitle={`${tasks.length} total tasks`}
            type="goals"
          />

        </div>

        {/* Progress */}
        <div className="max-w-2xl mb-10">

          <ProgressBar
            completed={focusMinutes}
            target={dailyGoal}
          />

        </div>

        {/* Task Management */}
        <div className="mb-6">

          <h2 className="text-2xl font-bold text-white mb-5">
            Your Study Planner
          </h2>

          <TaskManager
            tasks={tasks}
            selectedTaskId={selectedTaskId}
            addTask={addTask}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            selectTask={selectTask}
          />

        </div>

      </main>

    </div>
  );
}

export default App;
