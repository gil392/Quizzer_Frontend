import { useEffect, useState } from "react";
import { LessonData } from "../../services/backend/types";
import LessonItem from "./LessonItem";
import { deleteLesson, getLessons } from "../../services/backend/service";
import LessonInfo from "./LessonInfo";

const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<LessonData[]>([]);
  const [lessonToShow, setLessonToShow] = useState<LessonData | null>(null);

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

  return (
    <>
      {lessonToShow === null ? (
        lessons.map((lesson) => (
          <LessonItem
            key={lesson._id}
            lesson={lesson}
            onLessonDeleted={handleLessonDeleted}
            openLesson={() => {
              setLessonToShow(lesson);
            }}
          />
        ))
      ) : (
        <LessonInfo
          lesson={lessonToShow}
          onClose={() => {
            setLessonToShow(null);
          }}
        />
      )}
    </>
  );
};

export default LessonsPage;
