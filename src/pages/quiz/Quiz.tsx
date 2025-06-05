import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  getQuizById,
  submitQuestionAnswer,
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
import { createQuizAttemptAsync } from "../../store/attemptReducer";
import { generateQuizAsync } from "../../store/quizReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import QuizTimer from "./QuizTimer";

const QUIZ_CONTENT_PDF_ID = "quiz-content";

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
  const [isLocked, setIsLocked] = useState(false);

  const selectedAnswersRef = useRef(selectedAnswers);
  const quizDataRef = useRef<QuizData | null>(quizData);

  useEffect(() => {
    setIsLocked(false);
  }, [quizId]);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    quizDataRef.current = quizData;
  }, [quizData]);

  const dispatch = useDispatch<AppDispatch>();

  const isOnSelectAnswerMode = quizSettings?.feedbackType === "onSelectAnswer";

  const fetchQuiz = useCallback(async (id: string) => {
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
      const lessonIdFromState =
        quizData?.lessonId || location.state?.lessonData?.lessonId;
      if (lessonIdFromState) {
        try {
          const { data } = await getLessonById(lessonIdFromState);
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
      const data = await dispatch(
        generateQuizAsync({
          lessonId: lessonDataState?._id || quizData?.lessonId,
          settings: quizSettings || quizData?.settings,
        })
      ).unwrap();
      setQuizData(data);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate a new quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [lessonDataState?._id, quizData?.lessonId, quizSettings]);

  useEffect(() => {
    console.log("isLocked state changed:", isLocked);
  }, [isLocked]);
  useEffect(() => {
    if (attempt) {
      setQuizResult(attempt);

      if (attempt.quizId) {
        fetchQuiz(attempt.quizId);
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
      fetchQuiz(quizId);
    }
  }, [quizId]);

  useEffect(() => {
    if (!quizData && lessonDataState && quizSettings) {
      generateNewQuiz();
    }
  }, [lessonDataState, quizSettings, generateNewQuiz]);

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

      console.log("Submitting quiz with data:", submissionData);

      const result = await dispatch(
        createQuizAttemptAsync(submissionData)
      ).unwrap();
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
      (result) => result && result.questionId === questionId
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
    return (
      quizData?.questions.length === quizResult?.results.length &&
      quizResult?.results.every((result) => result.correctAnswer !== null)
    );
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
        <QuizTimer
          quizId={quizId}
          isLocked={isLocked}
          canHaveTimer={!loading && !attempt}
          quizResult={quizResult}
          areAllQuestionsSubmitted={areAllQuestionsSubmitted}
          onTimeUp={() =>
            handleQuizSubmission(
              quizDataRef.current,
              selectedAnswersRef.current
            )
          }
          setIsLocked={setIsLocked}
        />
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
              {quizResult && isLocked && (
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
                                disabled={isLocked}
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
              {quizResult && isLocked ? (
                <Button variant="contained" color="primary" onClick={retry}>
                  Retry
                </Button>
              ) : (
                !isOnSelectAnswerMode &&
                !isLocked && (
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
