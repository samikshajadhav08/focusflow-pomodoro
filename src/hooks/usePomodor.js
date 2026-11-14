import { useEffect, useRef, useState } from "react";
import { timerConfig } from "../data/timerConfig";
import { playBell } from "../utils/sound";

export function usePomodoro() {
  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(
    timerConfig.focus
  );
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] =
    useState(0);

  const endTimeRef = useRef(null);

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

      if (remaining === 0) {
        clearInterval(interval);
        setIsRunning(false);

        if (mode === "focus") {
          setCompletedSessions(prev => prev + 1);
        }

        playBell();
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const startTimer = () => {
    endTimeRef.current = Date.now() + timeLeft * 1000;
    setIsRunning(true);
  };

  const pauseTimer = () => {
    const remaining = Math.max(
      0,
      Math.ceil(
        (endTimeRef.current - Date.now()) / 1000
      )
    );

    setTimeLeft(remaining);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerConfig[mode]);
  };

  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(timerConfig[newMode]);
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
  };
}