import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { generateQuiz, getQuizById, submitQuiz } from "../api/quiz/api";
import { QuizData, QuizResult } from "../api/quiz/types";
import useStyles from "./Quiz.styles";

const QuizPage: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | null;
  }>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const lessonData = location.state?.lessonData;
  const quizId = location.state?.quizId;

  const fetchQuizById = useCallback(async () => {
    if (!quizId) {
      console.error("Quiz ID is not available.");
      return;
    }
    setLoading(true);

    try {
      const { data } = await getQuizById(quizId);
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  const generateNewQuiz = useCallback(async () => {
    if (!lessonData?._id) {
      console.error("Lesson data is not available.");
      return;
    }

    setLoading(true);
    setQuizResult(null);
    setSelectedAnswers({});

    try {
      const { data } = await generateQuiz(lessonData._id, quizData?.settings);
      setQuizData(data);
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false);
    }
  }, [lessonData, quizData?.settings]);

  useEffect(() => {
    fetchQuizById();
  }, [fetchQuizById]);

  const handleOptionChange = (questionIndex: number, option: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleQuizSubmission = async () => {
    if (!quizData) {
      alert("Quiz data is not available.");
      return;
    }

    try {
      const submissionData = {
        quizId: quizData._id,
        questions: Object.entries(selectedAnswers)
          .filter(([_, answer]) => answer !== null)
          .map(([questionIndex, answer]) => ({
            questionId: quizData.questions[parseInt(questionIndex)]._id,
            selectedAnswer: answer as string,
          })),
      };

      const { data: result } = await submitQuiz(submissionData);
      setQuizResult(result);
      console.log("Quiz submission result:", result);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const allQuestionsAnswered = quizData
    ? quizData.questions.every(
        (_, index) =>
          selectedAnswers[index] !== undefined &&
          selectedAnswers[index] !== null
      )
    : false;

  const getAnswerOutlineColor = (
    questionId: string,
    option: string
  ): string => {
    if (!quizResult) return "default";

    const questionResult = quizResult.results.find(
      (result) => result.questionId === questionId
    );

    if (!questionResult) return "default";
    if (questionResult.correctAnswer === option) return "green";
    if (
      questionResult.selectedAnswer === option &&
      questionResult.correctAnswer !== option
    )
      return "red";

    return "default";
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.quizBox}>
        {loading ? (
          <Box>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </Box>
        ) : quizData ? (
          <Box>
            {quizResult && (
              <Box
                className={classes.resultBox}
                style={{
                  backgroundColor:
                    quizResult.score >= 60 ? "#e8f5e9" : "#ffebee",
                }}
              >
                <Typography
                  variant="h5"
                  color={quizResult.score >= 60 ? "green" : "red"}
                >
                  Your Score: {quizResult.score} / 100
                </Typography>
              </Box>
            )}
            <Typography variant="h5" component="div" gutterBottom>
              {lessonData?.lessonTitle}
            </Typography>
            {quizData.questions.map((question, index) => (
              <Box key={index} className={classes.questionBox}>
                <Card className={classes.card}>
                  <Typography variant="h6" gutterBottom>
                    {index + 1}. {question.text}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {question.answers.map((option) => (
                      <FormControlLabel
                        key={option}
                        control={
                          <Checkbox
                            checked={selectedAnswers[index] === option}
                            onChange={() => handleOptionChange(index, option)}
                            disabled={!!quizResult}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                border: `2px solid ${getAnswerOutlineColor(
                                  question._id,
                                  option
                                )}`,
                                borderRadius: "4px",
                              },
                            }}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </Box>
                </Card>
              </Box>
            ))}
            <Box className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleQuizSubmission}
                disabled={!allQuestionsAnswered}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={generateNewQuiz}
              >
                Generate New Quiz
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="h6" color="error">
            Failed to load quiz data.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default QuizPage;
