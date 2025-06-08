import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LessonData } from "../../../api/lesson/types";
import { GenericIconButton } from "../../../components/GenericIconButton";
import { usePopupNavigation } from "../../../hooks/usePopupNavigation";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import {
  fetchLessons,
  mergeLessonsAsync,
  updateLessonAsync,
} from "../../../store/lessonReducer";
import { AppDispatch, RootState } from "../../../store/store";
import { INITIAL_FILTER_OPTIONS } from "../FilterLessons/constants";
import FilterLessons from "../FilterLessons/FilterLessons";
import { FilterOptions } from "../FilterLessons/types";
import { getFilteredLessons } from "../FilterLessons/utils";
import LessonInfo from "../LessonInfo/LessonInfo";
import LessonItem from "../LessonItem/LessonItem";
import { DEFAULT_SORT_OPTION, SORT_OPTIONS } from "./components/constants";
import { sortLessons } from "./components/utils";
import useStyles from "./LessonsPage.styles";

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
  const [sortByField, setSortByField] = useState(
    DEFAULT_SORT_OPTION.sortableField
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

  const displayLessons = useMemo(
    () => sortLessons(filteredLessons, sortByField),
    [filteredLessons, sortByField]
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
          <Box className={classes.headerActionsContainer}>
            <FilterLessons
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
            />
            <Stack className={classes.sortContainer}>
              <Typography variant="h6" gutterBottom>
                Sort By
              </Typography>

              <Select
                value={sortByField}
                className={classes.sortOption}
                onChange={({ target }) => {
                  setSortByField(
                    target.value as
                      | "_id"
                      | "summary"
                      | "title"
                      | "videoUrl"
                      | "relatedLessonGroupId"
                      | "isFavorite"
                  );
                }}
              >
                {SORT_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.sortableField}
                    value={option.sortableField}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>

          {displayLessons.length > 0 ? (
            displayLessons.map((lesson) => (
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
