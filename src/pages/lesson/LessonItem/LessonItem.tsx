import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { FunctionComponent, useState } from "react";
import { LessonData } from "../../../api/lesson/types";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import useStyles from "./LessonItem.styles";

interface LessonItemProps {
  lesson: LessonData;
  onLessonDeleted: (lessonId: string) => void;
  updateLessonTitle: (newTitle: string) => void;
  openLesson: () => void;
  mergeIcon?: React.ReactNode;
  className?: string;
}

const LessonItem: FunctionComponent<LessonItemProps> = (
  props: LessonItemProps
) => {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();

  return (
    <Box
      className={`${classes.lessonItem} ${
        !isEditing ? classes.lessonItemHover : ""
      } (props.className ? ${props.className} : "")`}
      onClick={() => !isEditing && props.openLesson()}
    >
      <Box className={classes.flexContainer}>
        <EditableTitleWithActions
          title={props.lesson.title}
          onSave={(newTitle) => props.updateLessonTitle(newTitle)}
          onDelete={() => props.onLessonDeleted(props.lesson._id)}
          onEditModeChange={(isEditing) => setIsEditing(isEditing)}
        />
        {props.mergeIcon}
      </Box>
      <Typography className={classes.successRateText}>
        Success rate: 100%
      </Typography>
    </Box>
  );
};

export default LessonItem;
