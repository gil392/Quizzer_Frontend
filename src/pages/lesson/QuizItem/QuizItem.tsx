import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuizData } from "../../../services/backend/types";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import styles from "./QuizItem.styles";
import withStyles, { WithStyles } from "@mui/styles/withStyles/withStyles";

interface QuizItemProps extends WithStyles<typeof styles> {
  quiz: QuizData;
  deleteQuiz: () => void;
  updateQuizTitle: (newTitle: string) => void;
}

const QuizItem = ({
  quiz,
  deleteQuiz,
  updateQuizTitle,
  classes,
}: QuizItemProps) => {
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <EditableTitleWithActions
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
            <Box key={index} className={classes.accordionDetails}>
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

export default withStyles(styles)(QuizItem);
