import { Box, Button, OutlinedInput, Typography, Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { QuizSettings } from "../../services/backend/types";
import "./Home.css";

interface QuestionCountOption {
  value: number;
  label: string;
}

const questionCountOptions: QuestionCountOption[] = [
  { value: 5, label: "Low (5)" },
  { value: 10, label: "Medium (10)" },
  { value: 20, label: "High (20)" },
  { value: -1, label: "Manual" },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [manualQuestionCount, setManualQuestionCount] = useState<number>(5);
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
        questionCount === -1 ? manualQuestionCount : questionCount,
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
      {questionCount === -1 && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="body2" gutterBottom>
            Select the number of questions (5-50):
          </Typography>
          <Slider
            value={manualQuestionCount}
            onChange={(e, value) => setManualQuestionCount(value as number)}
            step={5}
            marks
            min={5}
            max={50}
            valueLabelDisplay="auto"
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
