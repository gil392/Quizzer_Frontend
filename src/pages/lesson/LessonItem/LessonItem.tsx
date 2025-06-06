import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { FunctionComponent, useState } from "react";
import { LessonData } from "../../../api/lesson/types";
import useStyles from "./LessonItem.styles";
import { GenericIconButton } from "../../../components/GenericIconButton";
import MergeIcon from "@mui/icons-material/Merge";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import UncheckedBoxIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditabletitleWithActions from "../../../components/EditabletitleWithActions";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  deleteLessonAsync,
  updateLessonAsync,
} from "../../../store/lessonReducer";

interface LessonItemProps {
  lesson: LessonData;
  updateLessonTitle: (newTitle: string) => void;
  openLesson: () => void;
  className?: string;
  mergingLessons: LessonData[];
  setMergingLessons: (lessons: LessonData[]) => void;
  isMergeLessonsMode: boolean;
  setIsMergeLessonsMode: (isMergeMode: boolean) => void;
  cancelMergingMode: () => void;
}

const LessonItem: FunctionComponent<LessonItemProps> = ({
  lesson,
  openLesson,
  className,
  mergingLessons,
  setMergingLessons,
  isMergeLessonsMode,
  setIsMergeLessonsMode,
  cancelMergingMode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const isLessonMerging = () =>
    mergingLessons.some((lessonToCheck) => lessonToCheck._id === lesson._id);

  const isRelatedLesson = () =>
    mergingLessons.some(
      (lessonToCheck) =>
        lessonToCheck.relatedLessonGroupId === lesson.relatedLessonGroupId
    );

  const handleUpdateTitle = async (title: string, lesson: LessonData) => {
    await dispatch(updateLessonAsync({ ...lesson, title }));
  };

  const changeIsFavorite = async (lesson: LessonData) => {
    await dispatch(
      updateLessonAsync({ ...lesson, isFavorite: !lesson.isFavorite })
    );
  };

  const handleLessonDeleted = async (lessonId: string) => {
    await dispatch(deleteLessonAsync(lessonId));
  };

  const handleToggleMergeLesson = () => {
    if (!isLessonMerging()) {
      setMergingLessons([...mergingLessons, lesson]);
      return;
    }
    const updated = mergingLessons.filter(
      (lessonToCheck) => lessonToCheck._id !== lesson._id
    );
    if (updated.length === 0) {
      cancelMergingMode();
    }
    setMergingLessons(updated);
  };

  return (
    <Box
      className={clsx(
        classes.lessonItem,
        !isEditing && classes.lessonItemHover,
        isMergeLessonsMode && !isRelatedLesson() && classes.unrelatedLesson,
        className
      )}
      onClick={() => !isEditing && openLesson()}
    >
      <Box className={classes.flexContainer}>
        <EditabletitleWithActions
          title={lesson.title}
          onSave={(title: string) => handleUpdateTitle(title, lesson)}
          onDelete={() => handleLessonDeleted(lesson._id)}
          onEditModeChange={setIsEditing}
        />
        <GenericIconButton
          icon={lesson.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          title={"Favorite"}
          onClick={() => changeIsFavorite(lesson)}
        />
        {isMergeLessonsMode ? (
          <GenericIconButton
            icon={isLessonMerging() ? <CheckBoxIcon /> : <UncheckedBoxIcon />}
            onClick={() => {
              if (isRelatedLesson()) {
                handleToggleMergeLesson();
              }
            }}
            title={isRelatedLesson() ? "Merge this lesson" : "Cannot be merged"}
          />
        ) : (
          <GenericIconButton
            icon={<MergeIcon />}
            title={"Merge Lessons"}
            onClick={() => {
              setIsMergeLessonsMode(true);
              setMergingLessons([lesson]);
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
