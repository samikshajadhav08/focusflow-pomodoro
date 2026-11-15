
export default function ProgressBar({
  completed,
  target,
}) {
  const percentage = Math.min(
    100,
    Math.round((completed / target) * 100)
  );

  return (
    <div className="bg-[#17172A] border
                    border-white/10 rounded-2xl p-6">

      <div className="flex justify-between mb-4">
        <h3 className="text-white font-semibold">
          Daily Focus Goal
        </h3>

        <span className="text-purple-400 text-sm">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-white/10
                      h-3 rounded-full overflow-hidden">

        <div
          className="bg-purple-500 h-full
                     rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />

      </div>

      <p className="text-gray-400 text-sm mt-3">
        {completed} / {target} focus minutes completed
      </p>

    </div>
  );
}
