import React, { useEffect, useRef, useState } from "react";
import { Typography, Box } from "@mui/material";

const QUIZ_TIME_LIMIT_SECONDS = 60 * 0.5;

type QuizTimerProps = {
  quizId?: string;
  isLocked: boolean;
  canHaveTimer?: boolean;
  quizResult: any;
  areAllQuestionsSubmitted: () => boolean | undefined;
  onTimeUp: () => void;
  setIsLocked: (locked: boolean) => void;
};

const QuizTimer: React.FC<QuizTimerProps> = ({
  quizId,
  isLocked,
  canHaveTimer = false,
  quizResult,
  areAllQuestionsSubmitted,
  onTimeUp,
  setIsLocked,
}) => {
  const timerRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(QUIZ_TIME_LIMIT_SECONDS);

  useEffect(() => {
    if (quizResult && areAllQuestionsSubmitted()) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    if (isLocked) return;

    if (canHaveTimer) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimeout(() => {
              console.log("Time is up!");
              setIsLocked(true);
              onTimeUp();
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizResult, isLocked, canHaveTimer]);

  useEffect(() => {
    setTimeLeft(QUIZ_TIME_LIMIT_SECONDS);
    //if (timerRef.current) clearInterval(timerRef.current);
  }, [quizId]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!canHaveTimer) return null;

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Typography variant="h6" color={timeLeft <= 10 ? "error" : "textPrimary"}>
        Time Left: {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
};

export default QuizTimer;
