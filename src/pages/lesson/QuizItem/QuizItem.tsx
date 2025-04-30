import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import withStyles, { WithStyles } from "@mui/styles/withStyles/withStyles";
import { QuizData } from "../../../api/quiz/types";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import styles from "./QuizItem.styles";

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
