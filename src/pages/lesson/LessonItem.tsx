import Box from "@mui/material/Box";
import { LessonData } from "../../services/backend/types";
import classes from "./LessonItem.module.css";
import EditableActions from "../../components/EditableActions";
import { useState } from "react";
import { Typography } from "@mui/material";

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
      className={`${classes.lessonItem} ${
        !isEditing ? classes.lessonItemHover : ""
      }`}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => !isEditing && props.openLesson()}
      >
        <EditableActions
          title={props.lesson.title}
          onSave={(newTitle) => props.updateLessonTitle(newTitle)}
          onDelete={() => props.onLessonDeleted(props.lesson._id)}
          onEditModeChange={(isEditing) => setIsEditing(isEditing)}
        />
      </Box>
      <Typography
        sx={{ marginTop: "0.5rem", paddingLeft: "0.5vw", textAlign: "left" }}
      >
        Success rate: 100%
      </Typography>
    </Box>
  );
};

export default LessonItem;
