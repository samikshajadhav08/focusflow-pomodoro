import {
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

export default function Timer({
  mode,
  timeLeft,
  isRunning,
  startTimer,
  pauseTimer,
  resetTimer
}) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-[#17172A] p-8 rounded-2xl
                    text-center border border-white/10">

      <p className="text-purple-400 uppercase
                    tracking-widest mb-6">
        {mode === "focus" ? "Time to Focus" :
         mode === "shortBreak" ? "Short Break" :
         "Long Break"}
      </p>

      <h1 className="text-7xl font-bold text-white
                     mb-8 tabular-nums">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </h1>

      <div className="flex justify-center gap-4">

        <button
          onClick={isRunning ? pauseTimer : startTimer}
          className="bg-purple-600 hover:bg-purple-700
                     text-white px-8 py-3 rounded-xl
                     flex items-center gap-2"
        >
          {isRunning ? <Pause /> : <Play />}
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetTimer}
          className="bg-white/10 text-white p-3
                     rounded-xl hover:bg-white/20"
          aria-label="Reset timer"
        >
          <RotateCcw />
        </button>

      </div>
    </div>
  );
}