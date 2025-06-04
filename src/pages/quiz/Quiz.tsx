import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  generateQuiz,
  getQuizById,
  submitQuestionAnswer,
  createQuizAttempt,
  getLessonById,
} from "../../api/quiz/api";
import {
  QuizData,
  QuizResult,
  QuizSettings,
  QuizAttempt,
} from "../../api/quiz/types";
import useStyles from "./Quiz.styles";
import { exportToPDF } from "../../utils/pdfUtils";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toastWarning } from "../../utils/utils";

const QUIZ_CONTENT_PDF_ID = "quiz-content";
const QUIZ_TIME_LIMIT_SECONDS = 60 * 1;

const QuizPage: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  const quizSettings: QuizSettings = location.state?.quizSettings;
  const lessonData = location.state?.lessonData;
  const quizId = location.state?.quizId;
  const attempt: QuizAttempt = location.state?.attempt;

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [lessonDataState, setLessonDataState] = useState(lessonData || null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | null;
  }>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(QUIZ_TIME_LIMIT_SECONDS);
  const [isLocked, setIsLocked] = useState(false);
  const timerRef = useRef<number | null>(null);

  const selectedAnswersRef = useRef(selectedAnswers);
  const quizDataRef = useRef<QuizData | null>(quizData);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    quizDataRef.current = quizData;
  }, [quizData]);

  const isOnSelectAnswerMode = quizSettings?.feedbackType === "onSelectAnswer";

  const fetchQuizById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await getQuizById(id);
      setQuizData(data);
      setQuizResult({
        quizId: data._id,
        results: data.questions.map((question) => ({
          questionId: question._id,
          selectedAnswer: null,
          correctAnswer: null,
          isCorrect: null,
        })),
        score: 0,
      });
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateNewQuiz = useCallback(async () => {
    if (!lessonDataState?._id) {
      if (quizData?.lessonId) {
        try {
          const { data } = await getLessonById(quizData.lessonId);
          setLessonDataState(data);
        } catch (error) {
          console.error("Error fetching lesson data:", error);
          alert("Failed to fetch lesson data. Cannot generate a new quiz.");
          return;
        }
      } else {
        console.error("Lesson data is not available.");
        alert("Lesson data is missing. Cannot generate a new quiz.");
        return;
      }
    }

    setLoading(true);
    setQuizResult(null);
    setSelectedAnswers({});

    try {
      const { data } = await generateQuiz(
        lessonDataState?._id || quizData?.lessonId,
        quizSettings || quizData?.settings
      );
      setQuizData(data);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate a new quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [lessonDataState?._id, quizData?.lessonId, quizSettings]);

  useEffect(() => {
    if (attempt) {
      setQuizResult(attempt);

      if (attempt.quizId) {
        fetchQuizById(attempt.quizId);
      }

      if (!lessonDataState && quizData?.lessonId) {
        getLessonById(quizData.lessonId)
          .then(({ data }) => setLessonDataState(data))
          .catch((error) =>
            console.error("Error fetching lesson data from attempt:", error)
          );
      }

      const preselectedAnswers: { [key: number]: string | null } = {};
      attempt.results.forEach((result, index) => {
        preselectedAnswers[index] = result.selectedAnswer || null;
      });
      setSelectedAnswers(preselectedAnswers);
    }
  }, [attempt]);

  useEffect(() => {
    if (quizId) {
      fetchQuizById(quizId);
    }
  }, [quizId]);

  useEffect(() => {
    if (!quizData && lessonDataState && quizSettings) {
      generateNewQuiz();
    }
  }, [lessonDataState, quizSettings, generateNewQuiz]);

  useEffect(() => {
    if (quizResult && areAllQuestionsSubmitted()) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    if (isLocked) return;

    if (!loading && !attempt) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsLocked(true);
            handleQuizSubmission(
              quizDataRef.current,
              selectedAnswersRef.current
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizResult, isLocked, loading]);

  useEffect(() => {
    setTimeLeft(QUIZ_TIME_LIMIT_SECONDS);
    setIsLocked(false);
    //if (timerRef.current) clearInterval(timerRef.current);
  }, [quizData?._id]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleOptionChange = (questionIndex: number, option: string) => {
    if (isLocked) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleQuizSubmission = async (
    quizDataOverride?: QuizData | null,
    answersOverride?: {
      [key: number]: string | null;
    }
  ) => {
    if (!quizData) {
      toastWarning("Quiz data is not available.");
      return;
    }

    const answersToUse = answersOverride ?? selectedAnswers;
    const quizDataToUse = quizDataOverride ?? quizData;

    try {
      const submissionData = {
        quizId: quizData._id,
        questions: Object.entries(answersToUse)
          .filter(([_, answer]) => answer !== null)
          .map(([questionIndex, answer]) => ({
            questionId: quizDataToUse.questions[parseInt(questionIndex)]._id,
            selectedAnswer: answer as string,
          })),
      };

      const { data: result } = await createQuizAttempt(submissionData);
      setQuizResult(result);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toastWarning("Failed to submit quiz. Please try again.");
    }
  };

  const retry = () => {
    if (!quizData) {
      toastWarning("Quiz retry failed loading.");
      console.error("Quiz data is not available for retry.");
      return;
    }

    setQuizResult({
      quizId: quizData._id,
      results: quizData.questions.map((question) => ({
        questionId: question._id,
        selectedAnswer: null,
        correctAnswer: null,
        isCorrect: null,
      })),
      score: 0,
    });

    setSelectedAnswers({});
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

  const areAllQuestionsSubmitted = () => {
    return quizResult?.results.every((result) => result.correctAnswer !== null);
  };

  const handleSubmitQuestionClick = async (questionIndex: number) => {
    if (!quizData) {
      console.error("Quiz data is not available.");
      return;
    }

    const question = quizData.questions[questionIndex];
    const selectedAnswer = selectedAnswers[questionIndex];

    if (!selectedAnswer) {
      console.error("Please select an answer before submitting.");
      toastWarning("Please select an answer before submitting.");
      return;
    }

    try {
      const { data: questionResult } = await submitQuestionAnswer(
        question._id,
        selectedAnswer
      );

      setQuizResult((prev) => {
        if (!prev) {
          console.error("Quiz result state is not initialized.");
          return null;
        }

        const updatedResults = [...prev.results];

        updatedResults[questionIndex] = {
          questionId: question._id,
          selectedAnswer,
          correctAnswer: questionResult.correctAnswer,
          isCorrect: questionResult.isCorrect,
        };

        return {
          ...prev,
          results: updatedResults,
        };
      });

      const allSubmitted = quizData.questions.every((_, resultIndex) => {
        if (resultIndex === questionIndex) {
          return true;
        }
        const result = quizResult?.results[resultIndex];
        return result?.correctAnswer !== null;
      });

      if (allSubmitted) {
        await handleQuizSubmission();
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      toastWarning("Failed to submit question. Please try again.");
    }
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.quizBox}>
        {!loading && !attempt && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Typography
              variant="h6"
              color={timeLeft <= 10 ? "error" : "textPrimary"}
            >
              Time Left: {formatTime(timeLeft)}
            </Typography>
          </Box>
        )}
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
            <Box id={QUIZ_CONTENT_PDF_ID}>
              {quizResult && areAllQuestionsSubmitted() && (
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
              <Box>
                <Typography variant="h5" component="div" gutterBottom>
                  {lessonData?.lessonTitle}
                </Typography>
                {quizData.questions.map((question, index) => (
                  <Box
                    key={index}
                    style={{ pageBreakInside: "avoid" }}
                    className={classes.questionBox}
                  >
                    <Card className={classes.card}>
                      <Typography variant="h6" gutterBottom>
                        {index + 1}. {question.text}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {question.answers.map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                checked={selectedAnswers[index] === option}
                                onChange={() =>
                                  handleOptionChange(index, option)
                                }
                                disabled={
                                  !!quizResult && areAllQuestionsSubmitted()
                                }
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
                      <Box display="flex" justifyContent="flex-end">
                        {isOnSelectAnswerMode && selectedAnswers[index] && (
                          <IconButton
                            color="primary"
                            onClick={() => handleSubmitQuestionClick(index)}
                            disabled={
                              !!quizResult?.results[index]?.correctAnswer
                            }
                          >
                            <ArrowForwardIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box className={classes.buttonContainer}>
              {quizResult && areAllQuestionsSubmitted() ? (
                <Button variant="contained" color="primary" onClick={retry}>
                  Retry
                </Button>
              ) : (
                !isOnSelectAnswerMode && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleQuizSubmission()} // Can't shorten it or it'd get the click event as the first parameter
                    disabled={!allQuestionsAnswered}
                  >
                    Submit
                  </Button>
                )
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={generateNewQuiz}
              >
                Generate New Quiz
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  exportToPDF(
                    QUIZ_CONTENT_PDF_ID,
                    "Quiz_" + quizData.title + ".pdf"
                  )
                }
              >
                Export to PDF
              </Button>
            </Box>
            {isLocked && (
              <Typography color="error" mt={2}>
                Time is up! The quiz has been submitted automatically.
              </Typography>
            )}
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
