
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

export function usePomodoro() {
  const [mode, setMode] = useState("focus");

  const [timeLeft, setTimeLeft] = useState(
    timerConfig.focus
  );

  const [isRunning, setIsRunning] = useState(false);

  const [completedSessions, setCompletedSessions] =
    useState(0);

  const endTimeRef = useRef(null);

  // Start timer
  const startTimer = async () => {
    await unlockAudio();

    if (timeLeft <= 0) return;

    endTimeRef.current =
      Date.now() + timeLeft * 1000;

    setIsRunning(true);
  };

  // Pause timer
  const pauseTimer = () => {
    if (endTimeRef.current) {
      const remaining = Math.max(
        0,
        Math.ceil(
          (endTimeRef.current - Date.now()) / 1000
        )
      );

      setTimeLeft(remaining);
    }

    setIsRunning(false);
    endTimeRef.current = null;
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    endTimeRef.current = null;
    setTimeLeft(timerConfig[mode]);
  };

  // Change session
  const changeMode = (newMode) => {
    setIsRunning(false);
    endTimeRef.current = null;
    setMode(newMode);
    setTimeLeft(timerConfig[newMode]);
  };

  // Timer countdown
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil(
          (endTimeRef.current - Date.now()) / 1000
        )
      );

      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);

        setIsRunning(false);
        endTimeRef.current = null;

        // Play bell
        playBell();

        if (mode === "focus") {
          const nextCount = completedSessions + 1;

          setCompletedSessions(nextCount);

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

  // Request notifications
  const enableNotifications = async () => {
    if (!("Notification" in window)) {
      return false;
    }

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
