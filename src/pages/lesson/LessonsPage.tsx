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
import { Add } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { GenericIconButton } from "../../components/GenericIconButton";

const LessonsPage: React.FC = () => {
  const navigate = useNavigate();
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
      {selectedLesson !== null ? (
        <LessonInfo lesson={selectedLesson} onClose={closePopup} />
      ) : (
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
            {selectedLesson === null && (
              <GenericIconButton
                icon={<Add />}
                onClick={() => {
                  navigate("/home");
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
              style={{ marginBottom: "1rem" }}
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
