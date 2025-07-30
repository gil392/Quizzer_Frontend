import React, { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizSettings, QuizAttempt } from "../../api/quiz/types";
import useStyles from "./Quiz.styles";
import { exportToPDF } from "../../utils/pdfUtils";
import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { toastWarning } from "../../utils/utils";
import {
  createQuizAttemptAsync,
  fetchQuizAttempts,
  updateAttemptWithAnswersAsync,
} from "../../store/attemptReducer";
import { fetchQuizzes, generateQuizAsync } from "../../store/quizReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import QuizTimer from "./QuizTimer";
import { LessonData } from "../../api/lesson/types";
import QuizQuestionList from "./QuizQuestionList";
import { selectAttemptSelector } from "../../store/selectors/attemptSelector";
import { areAllQuestionsSubmitted } from "./Utils";
import { PAGES_ROUTES } from "../../routes/routes.const";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { getDefaultQuizSettings } from "../../components/lessonConfig/components/utils";
import { isNotNil } from "ramda";
import { useTheme } from "@mui/material/styles";

const QUIZ_CONTENT_PDF_ID = "quiz-content";

type LocationProps =
  | {
      quizSettings?: QuizSettings;
      quizId?: undefined;
      viewAttempt?: undefined;
      attemptToContinue?: undefined;
    }
  | {
      viewAttempt: QuizAttempt;
      quizSettings?: undefined;
      quizId?: undefined;
      attemptToContinue?: undefined;
    }
  | {
      attemptToContinue: QuizAttempt;
      quizSettings?: undefined;
      quizId?: undefined;
      viewAttempt?: undefined;
    };

const feedbackMap = [
  { min: 100, message: "Flawless score - You're unstoppable!" },
  { min: 95, message: "Perfect - Nothing left to say!" },
  { min: 90, message: "Amazing - You're dominating this topic!" },
  { min: 85, message: "Fantastic job - Keep up the great work!" },
  { min: 80, message: "Great job - You're clearly getting it." },
  { min: 75, message: "Nice work - You've got the hang of it." },
  { min: 70, message: "Solid performance - You understand the basics." },
  { min: 65, message: "Okay-ish - But there's room for improvement." },
  { min: 60, message: "Just enough to scrape by - Review is needed." },
  { min: 0, message: "Not great - Keep practicing and You'll get there!" },
];

function getFeedback(score: number): string {
  return feedbackMap.find((entry) => score >= entry.min)?.message ?? "";
}

const QuizPage: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const locationState =
    (location.state as LocationProps & { lessonData: LessonData }) || undefined;

  const [attemptId, setAttemptId] = useState<string | undefined>(
    locationState?.viewAttempt?._id ?? locationState?.attemptToContinue?._id
  );
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(!!locationState?.viewAttempt);

  const [quizId, setQuizId] = useState<string | undefined>(
    locationState?.quizId ??
      (locationState?.viewAttempt ?? locationState?.attemptToContinue)?.quizId
  );
  const quizData = useSelector((state: RootState) =>
    quizId ? state.quizzes.quizzes.find((q) => q._id === quizId) : null
  );

  const [finishedLoading, setFinishedLoading] = useState(false);

  useEffect(() => {
    const syncRedux = async () => {
      if (quizId && !quizData && locationState) {
        await dispatch(fetchQuizzes(locationState.lessonData._id));
      }
    };

    syncRedux();
  }, []);
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: string]: string | null;
  }>({});

  useEffect(() => {
    const loadAttempts = async () => {
      if (quizId) {
        await dispatch(fetchQuizAttempts(quizId));
      }
      setFinishedLoading(true);
    };
    loadAttempts();
  }, [quizId]);

  const currentAttempt: QuizAttempt | null | undefined = useSelector(
    (state: RootState) =>
      finishedLoading
        ? selectAttemptSelector(state, quizId, attemptId)
        : undefined
  );

  useEffect(() => {
    const createEmptyAttemptIfNeeded = async () => {
      if (currentAttempt === null && quizId) {
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
  }, [quizId, currentAttempt !== null]);

  const selectedAnswersRef = useRef(selectedAnswers);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  const dispatch = useDispatch<AppDispatch>();

  const [showQuizSettings, setShowQuizSettings] = useState(
    !locationState.quizId &&
      !locationState.quizSettings &&
      !locationState.attemptToContinue &&
      !locationState.viewAttempt
  );
  const isGenerateNewQuiz =
    locationState.quizId !== undefined ||
    locationState.quizSettings !== undefined;

  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const userQuizSettings = getDefaultQuizSettings(loggedUser?.settings);

  const [quizSettings, setQuizSettings] = useState(
    locationState?.quizSettings ?? quizData?.settings
  );

  const isOnSelectAnswerMode = useMemo(
    () => quizSettings?.feedbackType === "onSelectAnswer",
    [quizSettings]
  );

  const generateNewQuiz = async () => {
    setShowQuizSettings(false);
    setLoading(true);

    setSelectedAnswers({});
    if (!locationState) return;

    try {
      const data = await dispatch(
        generateQuizAsync({
          lessonId: locationState.lessonData._id,
          settings: quizSettings,
        })
      ).unwrap();
      setQuizId(data._id);
      setIsLocked(false);
    } catch (error) {
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
    if (isGenerateNewQuiz) {
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
            selectedAnswer: answer!,
          })),
      };

      await dispatch(updateAttemptWithAnswersAsync(submissionData)).unwrap();
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
    ? quizData.questions.every((question) =>
        isNotNil(selectedAnswers[question._id])
      )
    : false;

  return (
    <Box className={classes.container}>
      {showQuizSettings ? (
        <>
          <Typography
            variant="h4"
            gutterBottom
            className={classes.settingsTitle}
          >
            Quiz Settings
          </Typography>
          <LessonConfig
            onChange={(quizSettings: QuizSettings) => {
              setQuizSettings(quizSettings);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submitSettingsButton}
            onClick={generateNewQuiz}
          >
            Generate New Quiz
          </Button>
        </>
      ) : (
        <>
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
                  <Paper
                    className={classes.resultBox}
                    style={{
                      backgroundColor: theme.palette.background.paper,
                    }}
                  >
                    <Typography variant="h5" color="primary">
                      You scored {currentAttempt.score} out of 100
                    </Typography>
                    <Typography variant="subtitle2" color="primary">
                      {getFeedback(currentAttempt.score)}
                    </Typography>
                  </Paper>
                )}
                <Box>
                  <Typography variant="h5" component="div" gutterBottom>
                    {locationState?.lessonData.title}
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
                  !isLocked &&
                  currentAttempt && (
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
                  onClick={() => {
                    setQuizSettings(userQuizSettings);
                    setShowQuizSettings(true);
                  }}
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
        </>
      )}
    </Box>
  );
};

export default QuizPage;
