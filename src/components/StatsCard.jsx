
import {
  Target,
  Clock,
  Trophy
} from "lucide-react";

const icons = {
  sessions: Target,
  minutes: Clock,
  goals: Trophy,
};

export default function StatsCard({
  title,
  value,
  subtitle,
  type,
}) {
  const Icon = icons[type];

  return (
    <div className="bg-[#17172A] border
                    border-white/10 rounded-2xl p-5
                    hover:border-purple-500/40
                    transition-all">

      <div className="flex items-center
                      justify-between mb-4">

        <p className="text-gray-400 text-sm">
          {title}
        </p>

        <Icon className="text-purple-400" size={22} />
      </div>

      <h2 className="text-3xl font-bold text-white">
        {value}
      </h2>

      <p className="text-gray-500 text-xs mt-2">
        {subtitle}
      </p>

    </div>
  );
}
