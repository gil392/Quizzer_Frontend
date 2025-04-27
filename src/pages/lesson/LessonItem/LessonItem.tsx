import Box from "@mui/material/Box";
import { LessonData } from "../../../services/backend/types";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import { FunctionComponent, useState } from "react";
import { Typography } from "@mui/material";
import styles from "./LessonItem.styles";
import { WithStyles } from "@mui/styles/withStyles/withStyles";

interface LessonItemProps extends WithStyles<typeof styles> {
  lesson: LessonData;
  onLessonDeleted: (lessonId: string) => void;
  updateLessonTitle: (newTitle: string) => void;
  openLesson: () => void;
};

const LessonItem: FunctionComponent<LessonItemProps> = (
  props: LessonItemProps
) => {
  const [isEditing, setIsEditing] = useState(false);
  const classes = props.classes;

  return (
    <Box
      className={`${classes.lessonItem} ${
        !isEditing ? classes.lessonItemHover : ""
      }`}
      onClick={() => !isEditing && props.openLesson()}
    >
      <Box className={classes.flexContainer}>
        <EditableTitleWithActions
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
