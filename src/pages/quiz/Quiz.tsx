import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizSettings, QuizAttempt } from "../../api/quiz/types";
import useStyles from "./Quiz.styles";
import { exportToPDF } from "../../utils/pdfUtils";
import { Box, Button, Skeleton, Typography } from "@mui/material";
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
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import { PAGES_ROUTES } from "../../routes/routes.const";
import InvalidNavigationGuard from "./InvalidNavigationGuard";

const QUIZ_CONTENT_PDF_ID = "quiz-content";

type LocationProps =
  | {
      quizSettings: QuizSettings;
      quizId?: string;
      viewAttempt?: undefined;
      attemptToContinue?: undefined;
    }
  | {
      quizId: string;
      quizSettings: QuizSettings;
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
      quizSettings: QuizSettings;
      quizId: string;
      viewAttempt?: undefined;
      attemptToContinue?: undefined;
    }
  | {
      attemptToContinue: QuizAttempt;
      quizSettings?: undefined;
      quizId?: undefined;
      viewAttempt?: undefined;
    };

const QuizPage: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const locationState = location.state as
    | (LocationProps & { lessonData: LessonData })
    | undefined;

  const [attemptId, setAttemptId] = useState<string | undefined>(
    locationState?.viewAttempt?._id || locationState?.attemptToContinue?._id
  );
  const navigate = useNavigate();
  const [isLocked, setIsLocked] = useState(!!locationState?.viewAttempt);

  const [quizId, setQuizId] = useState<string | undefined>(
    locationState?.quizId ||
      (locationState?.viewAttempt || locationState?.attemptToContinue)?.quizId
  );
  const quizData = useSelector((state: RootState) =>
    quizId ? state.quizzes.quizzes.find((q) => q._id === quizId) : null
  );

  useEffect(() => {
    const syncRedux = async () => {
      if (quizId && !quizData && locationState) {
        await dispatch(fetchQuizzes(locationState.lessonData._id));
      }
    };

    syncRedux();
  }, []);

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

  const [showQuizSettings, setShowQuizSettings] = useState(false);

  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const userQuizSettings = getDefaultQuizSettings(loggedUser?.settings);

  const [quizSettings, setQuizSettings] = useState(
    location.state?.quizSettings
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
    if (!locationState?.quizId && locationState?.quizSettings) {
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
    <>
      {showQuizSettings ? (
        <Box className={classes.container}>
          <Typography
            variant="h4"
            gutterBottom
            className={classes.settingsTitle}
          >
            New Quiz Settings
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
        </Box>
      ) : (
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
                        onClick={handleQuizSubmission}
                        disabled={!allQuestionsAnswered}
                      >
                        Submit
                      </Button>
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
          </Box>
        </Box>
      )}
    </>
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
