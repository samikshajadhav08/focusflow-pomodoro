import Timer from "./components/Timer";
import { usePomodoro } from "./hooks/usePomodoro";

function App() {
  const {
    mode,
    timeLeft,
    isRunning,
    completedSessions,
    startTimer,
    pauseTimer,
    resetTimer,
  } = usePomodoro();

  return (
    <div className="min-h-screen bg-[#0B0B14]
                    flex flex-col items-center
                    justify-center p-6">

      <h1 className="text-4xl font-bold text-white mb-3">
        FocusFlow
      </h1>

      <p className="text-gray-400 mb-10">
        Your interview preparation companion
      </p>

      <Timer
        mode={mode}
        timeLeft={timeLeft}
        isRunning={isRunning}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
      />

      <p className="text-gray-400 mt-8">
        Completed sessions: {completedSessions}
      </p>

    </div>
  );
}

export default App;