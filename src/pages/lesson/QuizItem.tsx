import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuizData } from "../../services/backend/types";
import EditableActions from "../../components/EditableActions";

type QuizItemProps = {
  quiz: QuizData;
  deleteQuiz: () => void;
  updateQuizTitle: (newTitle: string) => void;
};

const QuizItem = ({ quiz, deleteQuiz, updateQuizTitle }: QuizItemProps) => {
  return (
    <Box
      sx={{
        marginBottom: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <EditableActions
          title={quiz.title}
          onSave={(newTitle) => updateQuizTitle(newTitle)}
          onDelete={deleteQuiz}
        />
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Attempts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {["Attempt 1", "Nice attempt"].map((attempt, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: "0.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="body1">
                {index + 1}. {attempt}
              </Typography>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default QuizItem;
