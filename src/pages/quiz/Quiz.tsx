import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  getQuizById,
} from "../../api/quiz/api";
import {
  QuizData,
  QuizSettings,
  QuizAttempt,
  QuizAnswer,
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
import {
  addAnswerToQuizAttemptAsync,
  createQuizAttemptAsync,
} from "../../store/attemptReducer";
import { generateQuizAsync } from "../../store/quizReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import QuizTimer from "./QuizTimer";
import { LessonData } from "../../api/lesson/types";

const QUIZ_CONTENT_PDF_ID = "quiz-content";

const QuizPage: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  const quizSettings: QuizSettings | undefined = location.state?.quizSettings; // passed when creating a new quiz
  const lessonData: LessonData | undefined = location.state?.lessonData; // passed when creating a new quiz
  const quizId: string | undefined = location.state?.quizId; // passed when retaking a quiz
  const attempt: QuizAttempt | undefined = location.state?.attempt; // passed when viewing an existing attempt

  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | null;
  }>({});
  const currentAttempt: QuizAttempt | undefined = useSelector(
    (state: RootState) =>
      attempt
        ? state.attempt.attemptsByQuiz[attempt.quizId]?.find(
            (a) => a._id === attempt._id
          )
        : undefined
  );

  useEffect(() => {
    console.log(
      "Checking in useEffect",
      currentAttempt,
      quizData?._id || quizId
    );
    if (!currentAttempt) {
      console.log(
        "No current attempt found, creating a new one for quizId:",
        quizId
      );
      dispatch(
        createQuizAttemptAsync({
          quizId: quizData?._id || quizId!,
          questions: [],
        })
      );
    }
  }, []);

  //const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
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
    } catch (error) {
      console.error("Error fetching quiz:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const generateNewQuiz = useCallback(async () => {
    setLoading(true);
    setSelectedAnswers({});

    try {
      const data = await dispatch(
        generateQuizAsync({
          lessonId: lessonData!._id,
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
  }, [lessonData?._id, quizSettings]);

  useEffect(() => {
    if (attempt) {
      if (attempt.quizId) {
        fetchQuiz(attempt.quizId);
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
    if (!quizData && lessonData && quizSettings) {
      generateNewQuiz();
    }
  }, [lessonData, quizSettings, generateNewQuiz]);

  const handleOptionChange = (questionIndex: number, option: string) => {
    if (isLocked) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const answerQuestionInAttempt = async (answer: QuizAnswer) => {
    await dispatch(addAnswerToQuizAttemptAsync(answer));
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

      await dispatch(
        createQuizAttemptAsync(submissionData)
      ).unwrap();
      //setQuizResult(() => result);
      areAllQuestionsSubmitted() && setIsLocked(true);
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

    // todo: fix retry logic

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
    if (!currentAttempt) return "default";

    const questionResult = currentAttempt.results.find(
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
      quizData?.questions.length === currentAttempt?.results.length &&
      currentAttempt?.results.every((result) => result.correctAnswer !== null)
    );
  };



  return (
    <Box className={classes.container}>
      <Box className={classes.quizBox}>
        <QuizTimer
          quizId={quizId}
          isLocked={isLocked}
          canHaveTimer={!loading && !attempt}
          quizResult={currentAttempt}
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
              {currentAttempt && isLocked && (
                <Box
                  className={classes.resultBox}
                  style={{
                    backgroundColor:
                      currentAttempt.score >= 60 ? "#e8f5e9" : "#ffebee",
                  }}
                >
                  <Typography
                    variant="h5"
                    color={currentAttempt.score >= 60 ? "green" : "red"}
                  >
                    Your Score: {currentAttempt.score} / 100
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
                            onClick={() =>
                              answerQuestionInAttempt({
                                questionId: question._id,
                                selectedAnswer: selectedAnswers[index]!,
                                attemptId: attempt?._id || "",
                              })
                            }
                            disabled={
                              !!currentAttempt?.results[index]?.correctAnswer
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
              {currentAttempt && isLocked ? (
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
