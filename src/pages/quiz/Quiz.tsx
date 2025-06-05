import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { QuizData, QuizSettings, QuizAttempt } from "../../api/quiz/types";
import useStyles from "./Quiz.styles";
import { exportToPDF } from "../../utils/pdfUtils";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { toastWarning } from "../../utils/utils";
import { createQuizAttemptAsync } from "../../store/attemptReducer";
import { generateQuizAsync } from "../../store/quizReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import QuizTimer from "./QuizTimer";
import { LessonData } from "../../api/lesson/types";
import QuizQuestionList from "./QuizQuestionList";
import { selectAttemptSelector } from "../../store/selectors/attemptSelector";

const QUIZ_CONTENT_PDF_ID = "quiz-content";

const QuizPage: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  const quizSettings: QuizSettings | undefined = location.state?.quizSettings; // passed when creating a new quiz
  const lessonData: LessonData | undefined = location.state?.lessonData; // passed when creating a new quiz
  const attempt: QuizAttempt | undefined = location.state?.attempt; // passed when viewing an existing attempt
  const [attemptId, setAttemptId] = useState<string | undefined>(attempt?._id);

  const [quizId, setQuizId] = useState<string | undefined>(
    location.state?.quizId || attempt?.quizId
  );
  const quizData = useSelector((state: RootState) =>
    quizId ? state.quizzes.quizzes.find((q) => q._id === quizId) : null
  );
  const [loading, setLoading] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string | null;
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
  }, [quizId]);

  const [isLocked, setIsLocked] = useState(false);

  const selectedAnswersRef = useRef(selectedAnswers);
  const quizDataRef = useRef<QuizData | null | undefined>(quizData);

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
      setQuizId(data._id);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate a new quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [lessonData?._id, quizSettings]);

  useEffect(() => {
    if (currentAttempt) {
      const preselectedAnswers: { [key: number]: string | null } = {};
      currentAttempt.results.forEach((result, index) => {
        preselectedAnswers[index] = result.selectedAnswer || null;
      });
      setSelectedAnswers(preselectedAnswers);
    }
  }, [currentAttempt]);

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

      await dispatch(createQuizAttemptAsync(submissionData)).unwrap();
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
          canHaveTimer={!loading && !currentAttempt}
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
                  {lessonData?.title}
                </Typography>
                <QuizQuestionList
                  quizData={quizData}
                  selectedAnswers={selectedAnswers}
                  isLocked={isLocked}
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
