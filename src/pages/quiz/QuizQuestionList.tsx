import {
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { QuizData, QuizAttempt, QuizAnswer } from "../../api/quiz/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addAnswerToQuizAttemptAsync } from "../../store/attemptReducer";
import useStyles from "./Quiz.styles";
import { areAllQuestionsSubmitted } from "./Utils";

type QuizQuestionListProps = {
  quizData: QuizData;
  selectedAnswers: { [questionId: string]: string | null };
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
  isOnSelectAnswerMode: boolean;
  currentAttempt?: QuizAttempt;
  attempt?: QuizAttempt;
  handleOptionChange: (questionId: string, option: string) => void;
};

const QuizQuestionList: React.FC<QuizQuestionListProps> = ({
  quizData,
  selectedAnswers,
  isLocked,
  setIsLocked,
  isOnSelectAnswerMode,
  currentAttempt,
  handleOptionChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const classes = useStyles();

  const answerQuestionInAttempt = async (answer: QuizAnswer) => {
    const attempt = await dispatch(
      addAnswerToQuizAttemptAsync(answer)
    ).unwrap();
    if (areAllQuestionsSubmitted(quizData, attempt)) {
      setIsLocked(true);
    }
  };

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

  return (
    <Box>
      {quizData.questions.map((question, index) => {
        const isQuestionLocked =
          isLocked ||
          (isOnSelectAnswerMode &&
            currentAttempt?.results.some(
              (result) => result.questionId === question._id
            ));
        return (
          <Box
            key={index}
            style={{ pageBreakInside: "avoid" }}
            className={classes.questionBox}
          >
            <Card>
              <Typography variant="h6" gutterBottom>
                {index + 1}. {question.text}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {question.answers.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={selectedAnswers[question._id] === option}
                        onChange={() =>
                          handleOptionChange(question._id, option)
                        }
                        disabled={isQuestionLocked}
                        sx={{
                          "& .MuiSvgIcon-root": {
                            border: `2px solid ${
                              isQuestionLocked &&
                              getAnswerOutlineColor(question._id, option)
                            }`,
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
                {isOnSelectAnswerMode &&
                  selectedAnswers[question._id] &&
                  currentAttempt && (
                    <IconButton
                      color="primary"
                      onClick={() =>
                        answerQuestionInAttempt({
                          questionId: question._id,
                          selectedAnswer: selectedAnswers[question._id]!,
                          attemptId: currentAttempt._id,
                        })
                      }
                      disabled={!!currentAttempt?.results[index]?.correctAnswer}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  )}
              </Box>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export default QuizQuestionList;
