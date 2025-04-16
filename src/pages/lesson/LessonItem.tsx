import Box from "@mui/material/Box";
import { LessonData } from "../../services/backend/types";
import classes from "./LessonItem.module.css";
import EditableActions from "../../components/EditableActions";
import { useState } from "react";

type LessonItemProps = {
  lesson: LessonData;
  onLessonDeleted: (lessonId: string) => void;
  updateLessonTitle: (newTitle: string) => void;
  openLesson: () => void;
};

const LessonItem = (props: LessonItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Box
    className={`${classes.lessonItem} ${!isEditing ? classes.lessonItemHover : ""}`}
      onClick={() => !isEditing && props.openLesson()}
    >
      <EditableActions
        title={props.lesson.title}
        onSave={(newTitle) => props.updateLessonTitle(newTitle)}
        onDelete={() => props.onLessonDeleted(props.lesson._id)}
        onEditModeChange={(isEditing) => setIsEditing(isEditing)}
      />
    </Box>
  );
};

export default LessonItem;
