
import { useEffect, useState } from "react";
import { getData, saveData } from "../utils/storage";

const STORAGE_KEY = "focusflow-tasks";

export function useTasks() {
  // Load saved tasks when the app starts
  const [tasks, setTasks] = useState(() =>
    getData(STORAGE_KEY, [])
  );

  const [selectedTaskId, setSelectedTaskId] = useState(null);

  // Save tasks whenever they change
  useEffect(() => {
    saveData(STORAGE_KEY, tasks);
  }, [tasks]);

  // Add a new task
  const addTask = (title, subject) => {
    if (!title.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      subject,
      completed: false,
      completedSessions: 0,
      createdAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Mark task as completed or pending
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    setSelectedTaskId((prevId) =>
      prevId === id ? null : prevId
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );

    setSelectedTaskId((prevId) =>
      prevId === id ? null : prevId
    );
  };

  // Select a task for the next focus session
  const selectTask = (id) => {
    const task = tasks.find((item) => item.id === id);

    if (task && !task.completed) {
      setSelectedTaskId(id);
    }
  };

  // Track completed focus sessions for selected task
  const incrementTaskSession = () => {
    if (!selectedTaskId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTaskId
          ? {
              ...task,
              completedSessions: task.completedSessions + 1,
            }
          : task
      )
    );
  };

  // Get currently selected task
  const selectedTask =
    tasks.find((task) => task.id === selectedTaskId) || null;

  // Count pending and completed tasks
  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  return {
    tasks,
    selectedTask,
    selectedTaskId,
    pendingTasks,
    completedTasks,

    addTask,
    toggleTask,
    deleteTask,
    selectTask,
    incrementTaskSession,
  };
}
