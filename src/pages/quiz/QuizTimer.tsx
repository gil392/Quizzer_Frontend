import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
import useStyles from "./QuizTimer.styles";
import { formatTime } from "./Utils";

const QUIZ_TIME_LIMIT_MILLISECONDS = 60 * 2 * 1000;

type QuizTimerProps = {
  quizId?: string;
  isLocked?: boolean;
  canHaveTimer?: boolean;
  onTimeUp?: () => void;
  timerCancelled?: boolean;
  initialTime?: number;
};

const QuizTimer: React.FC<QuizTimerProps> = ({
  quizId,
  isLocked,
  canHaveTimer = true,
  timerCancelled,
  onTimeUp,
  initialTime,
}) => {
  const timerRef = useRef<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(
    initialTime ?? QUIZ_TIME_LIMIT_MILLISECONDS
  );
  const classes = useStyles();

  useEffect(() => {
    if (timerCancelled) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    if (isLocked) return;

    if (canHaveTimer) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimeout(() => {
              onTimeUp?.();
            }, 0);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerCancelled, isLocked, canHaveTimer]);

  useEffect(() => {
    setTimeLeft(initialTime ?? QUIZ_TIME_LIMIT_MILLISECONDS);
  }, [quizId]);

  if (!canHaveTimer || isLocked) return null;

  const seconds = Math.max(0, Math.floor(timeLeft / 1000));

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Paper
        elevation={2}
        className={`${classes.timer} ${
          seconds <= 10 ? classes.runningOutOfTime : classes.enoughTime
        }`}
      >
        <span className={classes.icon} role="img" aria-label="timer">
          ⏰
        </span>
        <Typography variant="h6" className={classes.timeDisplay}>
          {formatTime(seconds)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default QuizTimer;
