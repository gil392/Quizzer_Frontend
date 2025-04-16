import { useEffect, useState } from "react";
import { LessonData } from "../../services/backend/types";
import LessonItem from "./LessonItem";
import { getLessons } from "../../services/backend/service";

const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<LessonData[]>([]);
  async function fetchLessons() {
    try {
      const response = await getLessons();
      setLessons(response);
      return response;
    } catch (error) {
      console.error("Error fetching lessons:", error);
      throw error;
    }
  }
  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <>
      {lessons.map((lesson) => (
        <LessonItem key={lesson._id} lesson={lesson} />
      ))}
    </>
  );
};

export default LessonsPage;
