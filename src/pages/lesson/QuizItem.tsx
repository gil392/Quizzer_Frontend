import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuizData } from "../../services/backend/types";
import DeleteIcon from "@mui/icons-material/Delete";

type QuizItemProps = {
  quiz: QuizData;
};

const QuizItem = ({ quiz }: QuizItemProps) => {
  return (
    <Box
      sx={{
        marginBottom: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1rem",
      }}
    >
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
          Quiz: {quiz.title}
        </Typography>
        <IconButton onClick={() => {}}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Attempts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {["Attempt 1", "Nice attempt"].map((attempt, index) => (
            <Box key={index} sx={{ marginBottom: "0.5rem" }}>
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
