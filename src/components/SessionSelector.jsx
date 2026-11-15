
const sessions = [
  { id: "focus", label: "Focus" },
  { id: "shortBreak", label: "Short Break" },
  { id: "longBreak", label: "Long Break" },
];

export default function SessionSelector({
  mode,
  changeMode,
}) {
  return (
    <div className="flex flex-wrap justify-center
                    gap-2 mb-8">

      {sessions.map((session) => (
        <button
          key={session.id}
          onClick={() => changeMode(session.id)}
          className={`px-5 py-2 rounded-xl
            text-sm font-medium transition-all
            ${
              mode === session.id
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            }`}
        >
          {session.label}
        </button>
      ))}

    </div>
  );
}
