import { Box, Button, OutlinedInput, Typography, Slider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";

function HomePage() {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [questionCount, setQuestionCount] = useState("low");
  const [manualQuestionCount, setManualQuestionCount] = useState(5);
  const [questionOrder, setQuestionOrder] = useState("chronological");
  const [feedbackType, setFeedbackType] = useState("onSubmit");

  const handleSummaryNavigation = () => {
    const quizSettings = {
      questionCount:
        questionCount === "manual" ? manualQuestionCount : questionCount,
      questionOrder,
      feedbackType,
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
        <label
          className={`custom-radio ${
            questionCount === "low" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="questionCount"
            value="low"
            checked={questionCount === "low"}
            onChange={(e) => setQuestionCount(e.target.value)}
          />
          <span>Low (5)</span>
        </label>
        <label
          className={`custom-radio ${
            questionCount === "medium" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="questionCount"
            value="medium"
            checked={questionCount === "medium"}
            onChange={(e) => setQuestionCount(e.target.value)}
          />
          <span>Medium (10)</span>
        </label>
        <label
          className={`custom-radio ${
            questionCount === "high" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="questionCount"
            value="high"
            checked={questionCount === "high"}
            onChange={(e) => setQuestionCount(e.target.value)}
          />
          <span>High (20)</span>
        </label>
        <label
          className={`custom-radio ${
            questionCount === "manual" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="questionCount"
            value="manual"
            checked={questionCount === "manual"}
            onChange={(e) => setQuestionCount(e.target.value)}
          />
          <span>Manual</span>
        </label>
      </Box>
      {questionCount === "manual" && (
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
            onChange={(e) => setQuestionOrder(e.target.value)}
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
            onChange={(e) => setQuestionOrder(e.target.value)}
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
            feedbackType === "everyQuestion" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="feedbackType"
            value="everyQuestion"
            checked={feedbackType === "everyQuestion"}
            onChange={(e) => setFeedbackType(e.target.value)}
          />
          <span>Every Question</span>
        </label>
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
            onChange={(e) => setFeedbackType(e.target.value)}
          />
          <span>On Submit</span>
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
}

export default HomePage;
