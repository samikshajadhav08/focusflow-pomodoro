
import { useState } from "react";
import { Plus } from "lucide-react";

const subjects = [
  "DSA",
  "JavaScript",
  "React",
  "Node.js",
  "Backend",
  "Other",
];

export default function TaskForm({ addTask }) {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("DSA");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask(title, subject);

    setTitle("");
    setSubject("DSA");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#17172A] border border-white/10
                 rounded-2xl p-5"
    >
      <h3 className="text-white font-semibold mb-4">
        Add Study Task
      </h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What do you want to study?"
        className="w-full bg-[#0B0B14]
                   border border-white/10
                   rounded-xl px-4 py-3
                   text-white outline-none
                   focus:border-purple-500"
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full mt-3 bg-[#0B0B14]
                   border border-white/10
                   rounded-xl px-4 py-3
                   text-white outline-none"
      >
        {subjects.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full mt-4 bg-purple-600
                   hover:bg-purple-700
                   text-white rounded-xl py-3
                   flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add Task
      </button>
    </form>
  );
}
