import React, { useEffect, useRef, useState } from "react";
import { Typography, Box } from "@mui/material";

const QUIZ_TIME_LIMIT_SECONDS = 60 * 1;

type QuizTimerProps = {
  quizId?: string;
  isLocked: boolean;
  attempt: any;
  loading: boolean;
  quizResult: any;
  areAllQuestionsSubmitted: () => boolean | undefined;
  onTimeUp: () => void;
  setIsLocked: (locked: boolean) => void;
};

const QuizTimer: React.FC<QuizTimerProps> = ({
  quizId,
  isLocked,
  attempt,
  loading,
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

    if (!loading && !attempt) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsLocked(true);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizResult, isLocked, loading, attempt]);

  useEffect(() => {
    setTimeLeft(QUIZ_TIME_LIMIT_SECONDS);
    setIsLocked(false);
    //if (timerRef.current) clearInterval(timerRef.current);
  }, [quizId]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading || attempt) return null;

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Typography variant="h6" color={timeLeft <= 10 ? "error" : "textPrimary"}>
        Time Left: {formatTime(timeLeft)}
      </Typography>
    </Box>
  );
};

export default QuizTimer;
