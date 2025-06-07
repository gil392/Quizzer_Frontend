import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, Paper } from "@mui/material";
//import AccessTimeIcon from "@mui/icons-material/AccessTime";

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

  useEffect(() => {
    if (timerCancelled) {
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
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          py: 1,
          bgcolor: timeLeft <= 10 ? "error.lighter" : "background.paper",
          color: timeLeft <= 10 ? "error.main" : "primary.main",
          borderRadius: 3,
          minWidth: 120,
          maxWidth: 200,
        }}
      >
        <span
          style={{ fontSize: 24, marginRight: 8 }}
          role="img"
          aria-label="timer"
        >
          ⏰
        </span>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "inherit",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.08em",
          }}
        >
          {formatTime(seconds)}
        </Typography>
      </Paper>
    </Box>
  );
};

export default QuizTimer;
