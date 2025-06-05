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

type QuizQuestionListProps = {
  quizData: QuizData;
  selectedAnswers: { [key: number]: string | null };
  isLocked: boolean;
  isOnSelectAnswerMode: boolean;
  currentAttempt?: QuizAttempt;
  attempt?: QuizAttempt;
  handleOptionChange: (questionIndex: number, option: string) => void;
};

const QuizQuestionList: React.FC<QuizQuestionListProps> = ({
  quizData,
  selectedAnswers,
  isLocked,
  isOnSelectAnswerMode,
  currentAttempt,
  handleOptionChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const classes = useStyles();

  const answerQuestionInAttempt = async (answer: QuizAnswer) => {
    await dispatch(addAnswerToQuizAttemptAsync(answer));
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
      {quizData.questions.map((question, index) => (
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
                      checked={selectedAnswers[index] === option}
                      onChange={() => handleOptionChange(index, option)}
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
              {isOnSelectAnswerMode &&
                selectedAnswers[index] &&
                currentAttempt && (
                  <IconButton
                    color="primary"
                    onClick={() =>
                      answerQuestionInAttempt({
                        questionId: question._id,
                        selectedAnswer: selectedAnswers[index]!,
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
      ))}
    </Box>
  );
};

export default QuizQuestionList;
