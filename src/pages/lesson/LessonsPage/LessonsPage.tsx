import { Add } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { withStyles, WithStyles } from "@mui/styles";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import LessonItem from "../LessonItem/LessonItem";
import styles from "./LessonsPage.styles";

interface LessonsPageProps extends WithStyles<typeof styles> {}

const LessonsPage: FunctionComponent<LessonsPageProps> = (
  props: LessonsPageProps
) => {
  const navigate = useNavigate();
  const { classes } = props;
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  const { openPopup, closePopup } = usePopupNavigation("/lesson", "info", () =>
    setSelectedLesson(null)
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

          {lessons.length > 0 ? (
            lessons.map((lesson) => (
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

export default withStyles(styles)(LessonsPage);
