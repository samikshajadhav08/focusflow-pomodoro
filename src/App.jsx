
import Navbar from "./components/Navbar";
import Timer from "./components/Timer";
import SessionSelector from "./components/SessionSelector";
import StatsCard from "./components/StatsCard";
import ProgressBar from "./components/ProgressBar";

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
    changeMode,
  } = usePomodoro();

  const focusMinutes = completedSessions * 25;
  const dailyGoal = 100;

  return (
    <div className="min-h-screen bg-[#0B0B14]">

      <Navbar />

      <main className="max-w-7xl mx-auto px-5 py-10">

        {/* Dashboard Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white">
            Welcome to FocusFlow 👋
          </h2>

          <p className="text-gray-400 mt-2">
            Stay consistent. Prepare smarter. Get hired.
          </p>
        </div>

        {/* Timer Section */}
        <div className="max-w-2xl mx-auto mb-12">

          <SessionSelector
            mode={mode}
            changeMode={changeMode}
          />

          <Timer
            mode={mode}
            timeLeft={timeLeft}
            isRunning={isRunning}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
          />

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
            title="Daily Goal"
            value={`${Math.min(
              100,
              Math.round((focusMinutes / dailyGoal) * 100)
            )}%`}
            subtitle="Progress towards your goal"
            type="goals"
          />

        </div>

        {/* Daily Progress */}
        <div className="max-w-2xl">
          <ProgressBar
            completed={focusMinutes}
            target={dailyGoal}
          />
        </div>

      </main>
    </div>
  );
}

export default App;
