import Box from "@mui/material/Box";
import { LessonData } from "../../services/backend/types";
import classes from "./LessonItem.module.css";
import EditableActions from "../../components/EditableActions";

type LessonItemProps = {
  lesson: LessonData;
  onLessonDeleted: (lessonId: string) => void;
  openLesson: () => void;
};

const LessonItem = (props: LessonItemProps) => {
  return (
    <Box className={classes.lessonItem} onClick={() => props.openLesson()}>
      <EditableActions
        title={props.lesson.title}
        onSave={(newTitle) => console.log(`Save new title: ${newTitle}`)}
        onDelete={() => props.onLessonDeleted(props.lesson._id)}
      />
    </Box>
  );
};

export default LessonItem;
