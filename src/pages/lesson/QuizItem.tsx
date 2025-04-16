import { useState } from "react";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { QuizData } from "../../services/backend/types";

type QuizItemProps = {
  quiz: QuizData;
  deleteQuiz: () => void;
  updateQuizTitle: (newTitle: string) => void;
};

const QuizItem = ({ quiz, deleteQuiz, updateQuizTitle }: QuizItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(quiz.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateQuizTitle(newTitle);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewTitle(quiz.title);
    setIsEditing(false);
  };

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
        {isEditing ? (
          <TextField
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            size="small"
            sx={{ marginBottom: "0.5rem", flexGrow: 1, marginRight: "1rem" }}
          />
        ) : (
          <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
            Quiz: {quiz.title}
          </Typography>
        )}
        <Box>
          {isEditing ? (
            <>
              <IconButton onClick={handleSaveClick}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancelClick}>
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={deleteQuiz}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
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

}

export default QuizItem;
