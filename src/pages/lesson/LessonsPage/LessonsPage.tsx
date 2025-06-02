import React, { useEffect, useMemo, useState } from "react";
import LessonItem from "../LessonItem/LessonItem";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLessons,
  updateLessonAsync,
  mergeLessonsAsync,
} from "../../../store/lessonReducer";
import { LessonData } from "../../../api/lesson/types";
import { GenericIconButton } from "../../../components/GenericIconButton";
import { usePopupNavigation } from "../../../hooks/usePopupNavigation";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import LessonInfo from "../LessonInfo/LessonInfo";
import useStyles from "./LessonsPage.styles";
import { FilterOptions } from "../FilterLessons/types";
import { INITIAL_FILTER_OPTIONS } from "../FilterLessons/constants";
import { getFilteredLessons } from "../FilterLessons/utils";
import FilterLessons from "../FilterLessons/FilterLessons";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { AppDispatch, RootState } from "../../../store/store";

const LessonsPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const lessons = useSelector((state: RootState) => state.lessons.lessons);

  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  const { openPopup, closePopup } = usePopupNavigation("/lesson", "info", () =>
    setSelectedLesson(null)
  );
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(
    INITIAL_FILTER_OPTIONS
  );
  const [mergingLessons, setMergingLessons] = useState<LessonData[]>([]);
  const [isMergeLessonsMode, setIsMergeLessonsMode] = useState(false);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  const filteredLessons = useMemo(
    () => getFilteredLessons(lessons, filterOptions),
    [lessons, filterOptions]
  );

  const handleUpdateLesson = async (lesson: LessonData) => {
    await dispatch(updateLessonAsync(lesson));
  };

  const openLesson = (lesson: LessonData) => {
    setSelectedLesson(lesson);
    openPopup();
  };

  const cancelMergingMode = () => {
    setIsMergeLessonsMode(false);
    setMergingLessons([]);
  };

  const createMergedLesson = () => async () => {
    const result = await dispatch(
      mergeLessonsAsync({
        lessonIds: mergingLessons.map((lesson) => lesson._id),
      })
    );

    if (!result.type.endsWith("rejected")) {
      setMergingLessons([]);
      setIsMergeLessonsMode(false);
    }
  };

  return (
    <>
      {selectedLesson !== null ? (
        <LessonInfo lesson={selectedLesson} onClose={closePopup} />
      ) : (
        <>
          <Box className={classes.headerContainer}>
            <Typography variant="h4" className={classes.title}>
              Lessons
            </Typography>
            {selectedLesson === null && (
              <GenericIconButton
                icon={<Add />}
                onClick={() => {
                  navigate(PAGES_ROUTES.GENERATE_LESSON);
                }}
                title="Create a new lesson"
              />
            )}
          </Box>

          <FilterLessons
            setFilterOptions={setFilterOptions}
            filterOptions={filterOptions}
          />

          {filteredLessons.length > 0 ? (
            filteredLessons.map((lesson) => (
              <LessonItem
                key={lesson._id}
                lesson={lesson}
                openLesson={() => openLesson(lesson)}
                updateLessonTitle={(newTitle: string) => {
                  handleUpdateLesson({ ...lesson, title: newTitle });
                }}
                mergingLessons={mergingLessons}
                setMergingLessons={setMergingLessons}
                isMergeLessonsMode={isMergeLessonsMode}
                setIsMergeLessonsMode={setIsMergeLessonsMode}
                cancelMergingMode={cancelMergingMode}
              />
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              className={classes.noLessonsText}
            >
              No existing lessons.
            </Typography>
          )}
          {isMergeLessonsMode && (
            <Box mt={2} display="flex" gap={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={cancelMergingMode}
              >
                Cancel Merging
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={mergingLessons.length < 2}
                onClick={createMergedLesson()}
              >
                Create Merged Lesson
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default LessonsPage;
