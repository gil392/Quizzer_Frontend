import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { FunctionComponent, useState } from "react";
import { LessonData } from "../../../api/lesson/types";
import useStyles from "./LessonItem.styles";
import { GenericIconButton } from "../../../components/GenericIconButton";
import MergeIcon from "@mui/icons-material/Merge";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import UncheckedBoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import EditabletitleWithActions from "../../../components/EditabletitleWithActions";
import clsx from "clsx";

interface LessonItemProps {
  lesson: LessonData;
  onLessonDeleted: (lessonId: string) => void;
  updateLessonTitle: (newTitle: string) => void;
  openLesson: () => void;
  mergeIcon?: React.ReactNode;
  className?: string;
  mergingLessons: LessonData[];
  setMergingLessons: (lessons: LessonData[]) => void;
  isMergeLessonsMode: boolean;
  setIsMergeLessonsMode: (isMergeMode: boolean) => void;
  cancelMergingMode: () => void;
}

const LessonItem: FunctionComponent<LessonItemProps> = (
  props: LessonItemProps
) => {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();

  const isLessonMerging = () =>
    props.mergingLessons.some((l) => l._id === props.lesson._id);

  const isRelatedLesson = () =>
    props.mergingLessons.some(
      (l) => l.relatedLessonId === props.lesson.relatedLessonId
    );

  const handleToggleMergeLesson = () => {
    if (!isLessonMerging()) {
      props.setMergingLessons([...props.mergingLessons, props.lesson]);
      return;
    }
    const updated = props.mergingLessons.filter(
      (l) => l._id !== props.lesson._id
    );
    if (updated.length === 0) {
      props.cancelMergingMode();
    }
    props.setMergingLessons(updated);
  };

  return (
    <Box
      className={clsx(
        classes.lessonItem,
        !isEditing && classes.lessonItemHover,
        props.isMergeLessonsMode &&
          !isRelatedLesson() &&
          classes.unrelatedLesson
      )}
      onClick={() => !isEditing && props.openLesson()}
    >
      <Box className={classes.flexContainer}>
        <EditabletitleWithActions
          title={props.lesson.title}
          onSave={(newTitle) => props.updateLessonTitle(newTitle)}
          onDelete={() => props.onLessonDeleted(props.lesson._id)}
          onEditModeChange={(isEditing) => setIsEditing(isEditing)}
        />
        {props.isMergeLessonsMode ? (
          <GenericIconButton
            icon={isLessonMerging() ? <CheckBoxIcon /> : <UncheckedBoxIcon />}
            onClick={() => {
              isRelatedLesson() && handleToggleMergeLesson();
            }}
            title={isRelatedLesson() ? "Merge this lesson" : "Cannot be merged"}
          />
        ) : (
          <GenericIconButton
            icon={<MergeIcon />}
            title={"Merge Lessons"}
            onClick={() => {
              props.setIsMergeLessonsMode(true);
              props.setMergingLessons([props.lesson]);
            }}
          />
        )}
      </Box>
      <Typography className={classes.successRateText}>
        Success rate: 100%
      </Typography>
    </Box>
  );
};

export default LessonItem;
