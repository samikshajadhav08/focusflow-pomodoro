
import { useEffect, useRef, useState } from "react";

import {
  timerConfig,
  LONG_BREAK_INTERVAL,
} from "../data/timerConfig";

import {
  unlockAudio,
  playBell,
} from "../utils/sound";

import {
  showNotification,
} from "../utils/notifications";

export function usePomodoro({ onFocusComplete } = {}) {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(timerConfig.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const endTimeRef = useRef(null);

  // Keep the latest callback without restarting the timer
  const onFocusCompleteRef = useRef(onFocusComplete);
  onFocusCompleteRef.current = onFocusComplete;

  // Start timer
  const startTimer = async () => {
    await unlockAudio();

    if (timeLeft <= 0) return;

    endTimeRef.current = Date.now() + timeLeft * 1000;
    setIsRunning(true);
  };

  // Pause timer
  const pauseTimer = () => {
    if (endTimeRef.current) {
      const remaining = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000)
      );

      setTimeLeft(remaining);
    }

    setIsRunning(false);
    endTimeRef.current = null;
  };

  // Reset current timer
  const resetTimer = () => {
    setIsRunning(false);
    endTimeRef.current = null;
    setTimeLeft(timerConfig[mode]);
  };

  // Change timer mode
  const changeMode = (newMode) => {
    setIsRunning(false);
    endTimeRef.current = null;

    setMode(newMode);
    setTimeLeft(timerConfig[newMode]);
  };

  // Timer countdown and automatic session switching
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((endTimeRef.current - Date.now()) / 1000)
      );

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);

        setIsRunning(false);
        endTimeRef.current = null;

        playBell();

        if (mode === "focus") {
          // Update task statistics
          onFocusCompleteRef.current?.();

          const nextCount = completedSessions + 1;

          setCompletedSessions(nextCount);

          // Long break after every 4 focus sessions
          const nextMode =
            nextCount % LONG_BREAK_INTERVAL === 0
              ? "longBreak"
              : "shortBreak";

          setMode(nextMode);
          setTimeLeft(timerConfig[nextMode]);

          showNotification(
            "Focus session completed!",
            nextMode === "longBreak"
              ? "Great work! Take a 15-minute break."
              : "Great work! Take a 5-minute break."
          );
        } else {
          // After a break, return to focus mode
          setMode("focus");
          setTimeLeft(timerConfig.focus);

          showNotification(
            "Break completed!",
            "Time to get back to your interview preparation."
          );
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isRunning, mode, completedSessions]);

  // Enable browser notifications
  const enableNotifications = async () => {
    if (!("Notification" in window)) return false;

    const permission = await Notification.requestPermission();

    return permission === "granted";
  };

  return {
    mode,
    timeLeft,
    isRunning,
    completedSessions,

    startTimer,
    pauseTimer,
    resetTimer,
    changeMode,
    enableNotifications,
  };
}
