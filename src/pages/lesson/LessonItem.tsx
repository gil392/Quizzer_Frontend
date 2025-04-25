import Box from "@mui/material/Box";
import { LessonData } from "../../services/backend/types";
import EditableActions from "../../components/EditableActions";
import { useState } from "react";
import { Typography } from "@mui/material";
import useStyles from "./LessonItem.styles";

type LessonItemProps = {
  lesson: LessonData;
  onLessonDeleted: (lessonId: string) => void;
  updateLessonTitle: (newTitle: string) => void;
  openLesson: () => void;
};

const LessonItem = (props: LessonItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();

  return (
    <Box
      className={`${classes.lessonItem} ${
        !isEditing ? classes.lessonItemHover : ""
      }`}
      onClick={() => !isEditing && props.openLesson()}
    >
      <Box className={classes.flexContainer}>
        <EditableActions
          title={props.lesson.title}
          onSave={(newTitle) => props.updateLessonTitle(newTitle)}
          onDelete={() => props.onLessonDeleted(props.lesson._id)}
          onEditModeChange={(isEditing) => setIsEditing(isEditing)}
        />
      </Box>
      <Typography className={classes.successRateText}>
        Success rate: 100%
      </Typography>
    </Box>
  );
};

export default LessonItem;
