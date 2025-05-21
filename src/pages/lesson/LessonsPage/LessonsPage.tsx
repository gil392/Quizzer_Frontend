import React, { useEffect, useMemo, useState } from "react";
import LessonItem from "../LessonItem/LessonItem";
import {
  deleteLesson,
  getLessons,
  updateLesson,
} from "../../../api/lesson/api";
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
import { Box, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const LessonsPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  const { openPopup, closePopup } = usePopupNavigation("/lesson", "info", () =>
    setSelectedLesson(null)
  );
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(
    INITIAL_FILTER_OPTIONS
  );

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data } = await getLessons();
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  const filteredLessons = useMemo(
    () => getFilteredLessons(lessons, filterOptions),
    [lessons, filterOptions]
  );

  const handleLessonDeleted = async (lessonId: string) => {
    await deleteLesson(lessonId);
    setLessons((prevLessons) =>
      prevLessons.filter((lesson) => lesson._id !== lessonId)
    );
  };

  const handleUpdateLesson = async (lesson: LessonData) => {
    await updateLesson(lesson._id, lesson);
    setLessons((prevLessons) =>
      prevLessons.map((lessonToCheck) =>
        lessonToCheck._id === lesson._id ? lesson : lessonToCheck
      )
    );
  };

  const openLesson = (lesson: LessonData) => {
    setSelectedLesson(lesson);
    openPopup();
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
                onLessonDeleted={handleLessonDeleted}
                openLesson={() => openLesson(lesson)}
                updateLessonTitle={(newTitle: string) => {
                  handleUpdateLesson({ ...lesson, title: newTitle });
                }}
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
        </>
      )}
    </>
  );
};

export default LessonsPage;
