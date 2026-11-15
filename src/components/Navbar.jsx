
import { Clock, Settings, Moon } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10
                    bg-[#10101C] px-6 py-4">

      <div className="max-w-7xl mx-auto flex
                      items-center justify-between">

        <div className="flex items-center gap-2">
          <Clock className="text-purple-500" size={28} />

          <h1 className="text-2xl font-bold text-white">
            FocusFlow
          </h1>
        </div>

        <div className="flex items-center gap-5">
          <span className="text-gray-400 hidden sm:block">
            Your productivity space
          </span>

          <button
            aria-label="Settings"
            className="text-gray-300 hover:text-purple-400"
          >
            <Settings size={21} />
          </button>

          <button
            aria-label="Theme"
            className="text-gray-300 hover:text-purple-400"
          >
            <Moon size={21} />
          </button>
        </div>

      </div>
    </nav>
  );
}
