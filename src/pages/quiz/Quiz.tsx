import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizData, QuizSettings, QuizAttempt } from "../../api/quiz/types";
import useStyles from "./Quiz.styles";
import { exportToPDF } from "../../utils/pdfUtils";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { toastWarning } from "../../utils/utils";
import {
  createQuizAttemptAsync,
  updateAttemptWithAnswersAsync,
} from "../../store/attemptReducer";
import { generateQuizAsync } from "../../store/quizReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import QuizTimer from "./QuizTimer";
import { LessonData } from "../../api/lesson/types";
import QuizQuestionList from "./QuizQuestionList";
import { selectAttemptSelector } from "../../store/selectors/attemptSelector";
import { areAllQuestionsSubmitted } from "./Utils";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import { PAGES_ROUTES } from "../../routes/routes.const";
import InvalidNavigationGuard from "./InvalidNavigationGuard";

const QUIZ_CONTENT_PDF_ID = "quiz-content";

type LocationProps =
  | {
      lessonData: LessonData;
      quizSettings: QuizSettings;
      quizId?: string;
      viewAttempt?: undefined;
      attemptToContinue?: undefined;
    }
  | {
      quizId: string;
      quizSettings: QuizSettings;
      lessonData?: undefined;
      viewAttempt?: undefined;
      attemptToContinue?: undefined;
    }
  | {
      viewAttempt: QuizAttempt;
      lessonData?: undefined;
      quizSettings?: undefined;
      quizId?: undefined;
      attemptToContinue?: undefined;
    }
  | {
      lessonData: LessonData;
      quizSettings: QuizSettings;
      quizId: string;
      viewAttempt?: undefined;
      attemptToContinue?: undefined;
    }
  | {
      attemptToContinue: QuizAttempt;
      lessonData?: undefined;
      quizSettings?: undefined;
      quizId?: undefined;
      viewAttempt?: undefined;
    };

const QuizPage: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const locationState = location.state as LocationProps | undefined;

  if (
    !locationState ||
    (!locationState.lessonData &&
      !locationState.quizId &&
      !locationState.viewAttempt &&
      !locationState.attemptToContinue)
  ) {
    return <InvalidNavigationGuard show missingData="Quiz data" />;
  }
  const [attemptId, setAttemptId] = useState<string | undefined>(
    locationState.viewAttempt?._id || locationState.attemptToContinue?._id
  );
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(!!locationState.viewAttempt);

  const [quizId, setQuizId] = useState<string | undefined>(
    locationState.quizId ||
      (locationState.viewAttempt || locationState.attemptToContinue)?.quizId
  );
  const quizData = useSelector((state: RootState) =>
    quizId ? state.quizzes.quizzes.find((q) => q._id === quizId) : null
  );
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: string]: string | null;
  }>({});

  const currentAttempt: QuizAttempt | undefined = useSelector(
    (state: RootState) => selectAttemptSelector(state, quizId, attemptId)
  );

  useEffect(() => {
    const createEmptyAttemptIfNeeded = async () => {
      if (!currentAttempt && quizId) {
        const emptyAttempt = await dispatch(
          createQuizAttemptAsync({
            quizId: quizId,
            questions: [],
          })
        ).unwrap();
        setAttemptId(emptyAttempt._id);
      }
    };

    createEmptyAttemptIfNeeded();
  }, [quizId, currentAttempt !== undefined]);

  const selectedAnswersRef = useRef(selectedAnswers);

  useUpdateEffect(() => {
    setIsLocked(false);
  }, [quizId]);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  const dispatch = useDispatch<AppDispatch>();

  const isOnSelectAnswerMode =
    locationState.quizSettings?.feedbackType === "onSelectAnswer";

  const generateNewQuiz = async () => {
    setLoading(true);
    setSelectedAnswers({});

    try {
      const data = await dispatch(
        generateQuizAsync({
          lessonId: locationState.lessonData?._id || quizData?.lessonId!,
          settings: locationState.quizSettings || quizData?.settings,
        })
      ).unwrap();
      setQuizId(data._id);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate a new quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentAttempt) {
      const preselectedAnswers: { [key: string]: string | null } = {};
      currentAttempt.results.forEach((result) => {
        preselectedAnswers[result.questionId] = result.selectedAnswer || null;
      });
      setSelectedAnswers(preselectedAnswers);
    }
  }, [currentAttempt]);

  useEffect(() => {
    if (!locationState.quizId && locationState.quizSettings) {
      generateNewQuiz();
    }
  }, []);

  const handleOptionChange = (questionId: string, option: string) => {
    if (isLocked) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const continueLater = async () => {
    if (!isOnSelectAnswerMode) {
      await handleQuizSubmission(undefined, true);
    }
    navigate(PAGES_ROUTES.LESSON);
  };
  const handleQuizSubmission = async (
    answersOverride?: {
      [key: number]: string | null;
    },
    isNavigatingAfter?: boolean
  ) => {
    if (!quizData) {
      toastWarning("Quiz data is not available.");
      return;
    }

    if (!attemptId) {
      console.warn("Attempt id is missing when trying to submit a quiz");
      toastWarning("Quiz data is not available.");
      return;
    }

    const answersToUse = answersOverride ?? selectedAnswers;

    try {
      const submissionData = {
        attemptId: attemptId,
        questions: Object.entries(answersToUse)
          .filter(([_, answer]) => answer !== null)
          .map(([questionId, answer]) => ({
            questionId,
            selectedAnswer: answer as string,
          })),
      };

      const updatedAttempt = await dispatch(
        updateAttemptWithAnswersAsync(submissionData)
      ).unwrap();
      setAttemptId(updatedAttempt._id);
      if (!isNavigatingAfter) {
        setIsLocked(true);
      }
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

    setAttemptId(undefined);
    setIsLocked(false);

    setSelectedAnswers({});
  };

  const allQuestionsAnswered = quizData
    ? quizData.questions.every(
        (question) =>
          selectedAnswers[question._id] !== undefined &&
          selectedAnswers[question._id] !== null
      )
    : false;

  return (
    <Box className={classes.container}>
      <Box className={classes.quizBox}>
        {currentAttempt && quizData && (
          <QuizTimer
            quizId={quizId}
            isLocked={isLocked}
            canHaveTimer={!loading}
            timerCancelled={
              !!currentAttempt &&
              areAllQuestionsSubmitted(quizData, currentAttempt)
            }
            initialTime={
              currentAttempt
                ? currentAttempt.expiryTime - new Date().getTime()
                : undefined
            }
            onTimeUp={() => {
              setIsLocked(true);
              handleQuizSubmission(selectedAnswersRef.current);
            }}
          />
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
                  {locationState.lessonData?.title}
                </Typography>
                <QuizQuestionList
                  quizData={quizData}
                  selectedAnswers={selectedAnswers}
                  isLocked={isLocked}
                  setIsLocked={setIsLocked}
                  isOnSelectAnswerMode={isOnSelectAnswerMode}
                  currentAttempt={currentAttempt}
                  handleOptionChange={handleOptionChange}
                />
              </Box>
            </Box>
            <Box className={classes.buttonContainer}>
              {currentAttempt && isLocked ? (
                <Button variant="contained" color="primary" onClick={retry}>
                  Retry
                </Button>
              ) : (
                !isLocked && currentAttempt && (
                  <>
                    {!areAllQuestionsSubmitted(quizData, currentAttempt) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={continueLater}
                      >
                        Continue later
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleQuizSubmission()} // Can't shorten it or it'd get the click event as the first parameter
                      disabled={!allQuestionsAnswered}
                    >
                      Submit
                    </Button>
                  </>
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
