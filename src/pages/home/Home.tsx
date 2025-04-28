import { Box, Button, OutlinedInput, Typography, Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { QuizSettings } from "../../services/backend/types";
import "./Home.css";

const LOW_QUESTIONS_COUNT = 5;
const MEDIUM_QUESTIONS_COUNT = 10;
const HIGH_QUESTIONS_COUNT = 20;
const MANUAL_QUESTIONS_COUNT_OPTION = -1;
const MANUAL_MIN_QUESTIONS_COUNT = 5;
const MANUAL_MAX_QUESTIONS_COUNT = 30;
const MANUAL_QUESTIONS_COUNT_STEP = 5;

interface QuestionCountOption {
  value: number;
  label: string;
}

const questionCountOptions: QuestionCountOption[] = [
  { value: LOW_QUESTIONS_COUNT, label: "Low (5)" },
  { value: MEDIUM_QUESTIONS_COUNT, label: "Medium (10)" },
  { value: HIGH_QUESTIONS_COUNT, label: "High (20)" },
  { value: MANUAL_QUESTIONS_COUNT_OPTION, label: "Manual" },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [questionCount, setQuestionCount] =
    useState<number>(LOW_QUESTIONS_COUNT);
  const [manualQuestionCount, setManualQuestionCount] = useState<number>(
    MANUAL_MIN_QUESTIONS_COUNT
  );
  const [questionOrder, setQuestionOrder] = useState<
    "chronological" | "random"
  >("chronological");
  const [feedbackType, setFeedbackType] =
    useState<QuizSettings["checkType"]>("onSubmit");

  const handleSummaryNavigation = (): void => {
    const quizSettings: QuizSettings = {
      checkType: feedbackType,
      isRandomOrder: questionOrder === "random",
      maxQuestionCount:
        questionCount === MANUAL_QUESTIONS_COUNT_OPTION
          ? manualQuestionCount
          : questionCount,
      solvingTimeMs: 60000,
    };

    navigate("/summary", { state: { videoUrl, quizSettings } });
  };

  return (
    <Box sx={{ width: "50%", margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Insert YouTube Video
      </Typography>
      <OutlinedInput
        placeholder="youtube.com/watch?v=j0u7ub3m473"
        sx={{
          borderRadius: "8px",
          width: "100%",
          height: "3rem",
          marginBottom: 3,
        }}
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <Typography variant="h6" gutterBottom>
        How Many Questions?
      </Typography>
      <Box className="custom-radio-group">
        {questionCountOptions.map((option) => (
          <label
            key={option.value}
            className={`custom-radio ${
              questionCount === option.value ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="questionCount"
              value={option.value}
              checked={questionCount === option.value}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </Box>
      {questionCount === MANUAL_QUESTIONS_COUNT_OPTION && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="body2" gutterBottom>
            Select the number of questions (5-30):
          </Typography>
          <Slider
            value={manualQuestionCount}
            onChange={(e, value) => setManualQuestionCount(value as number)}
            step={MANUAL_QUESTIONS_COUNT_STEP}
            marks
            min={MANUAL_MIN_QUESTIONS_COUNT}
            max={MANUAL_MAX_QUESTIONS_COUNT}
            valueLabelDisplay="auto"
            sx={{
              color: "primary.main",
              height: 8,
              "& .MuiSlider-thumb": {
                height: 16,
                width: 16,
                backgroundColor: "#fff",
                border: "2px solid currentColor",
                "&:hover": {
                  boxShadow: "0px 0px 0px 8px rgba(25, 118, 210, 0.16)",
                },
                "&.Mui-active": {
                  boxShadow: "0px 0px 0px 14px rgba(25, 118, 210, 0.16)",
                },
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#bdbdbd",
              },
              "& .MuiSlider-mark": {
                backgroundColor: "#bdbdbd",
                height: 8,
                width: 8,
                borderRadius: "50%",
              },
              "& .MuiSlider-markActive": {
                backgroundColor: "primary.main",
              },
            }}
          />
        </Box>
      )}

      <Typography variant="h6" gutterBottom>
        Questions Order
      </Typography>
      <Box className="custom-radio-group">
        <label
          className={`custom-radio ${
            questionOrder === "chronological" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="questionOrder"
            value="chronological"
            checked={questionOrder === "chronological"}
            onChange={(e) =>
              setQuestionOrder(e.target.value as "chronological" | "random")
            }
          />
          <span>Chronological</span>
        </label>
        <label
          className={`custom-radio ${
            questionOrder === "random" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="questionOrder"
            value="random"
            checked={questionOrder === "random"}
            onChange={(e) =>
              setQuestionOrder(e.target.value as "chronological" | "random")
            }
          />
          <span>Random</span>
        </label>
      </Box>

      <Typography variant="h6" gutterBottom>
        Feedback
      </Typography>
      <Box className="custom-radio-group">
        <label
          className={`custom-radio ${
            feedbackType === "onSubmit" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="feedbackType"
            value="onSubmit"
            checked={feedbackType === "onSubmit"}
            onChange={(e) =>
              setFeedbackType(e.target.value as QuizSettings["checkType"])
            }
          />
          <span>On Submit</span>
        </label>
        <label
          className={`custom-radio ${
            feedbackType === "onSelectAnswer" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="feedbackType"
            value="onSelectAnswer"
            checked={feedbackType === "onSelectAnswer"}
            onChange={(e) =>
              setFeedbackType(e.target.value as QuizSettings["checkType"])
            }
          />
          <span>Every Question</span>
        </label>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          height: "3rem",
          borderRadius: "8px",
          marginTop: 3,
        }}
        onClick={handleSummaryNavigation}
        disabled={!videoUrl.trim()}
      >
        Generate Lesson
      </Button>
    </Box>
  );
};

export default HomePage;
