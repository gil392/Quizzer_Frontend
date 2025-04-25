import { useEffect, useState } from "react";
import { LessonData } from "../../services/backend/types";
import LessonItem from "./LessonItem";
import {
  deleteLesson,
  getLessons,
  updateLesson,
} from "../../services/backend/service";
import LessonInfo from "./LessonInfo";
import Typography from "@mui/material/Typography";
import { usePopupNavigation } from "../../hooks/usePopupNavigation";
import IconButton from "@mui/material/IconButton";
import { Add } from "@mui/icons-material";
import Box from "@mui/material/Box";

const LessonsPage: React.FC = () => {
  const { openPopup: openCreateLesson } = usePopupNavigation("/home", "");
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<LessonData | null>(null);
  const { openPopup, closePopup } = usePopupNavigation("/lesson", "info", () =>
    setSelectedLesson(null)
  );

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getLessons();
        setLessons(response);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          Lessons
        </Typography>
        <IconButton
          onClick={() => {
            openCreateLesson();
          }}
          sx={{
            marginLeft: "auto",
          }}
        >
          <Add />
        </IconButton>
      </Box>
      {selectedLesson === null ? (
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
        <LessonInfo lesson={selectedLesson} onClose={closePopup} />
      )}
    </>
  );
};

export default LessonsPage;
