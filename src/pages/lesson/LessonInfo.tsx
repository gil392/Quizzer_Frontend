import Box from "@mui/material/Box";
import { LessonData, QuizData } from "../../services/backend/types";
import { useState, useEffect } from "react";
import { getQuizzesByLessonId } from "../../services/backend/service";
import QuizItem from "./QuizItem";

interface LessonInfoProps {
  lesson: LessonData;
  onClose: () => void;
}

const LessonInfo: React.FC<LessonInfoProps> = ({ lesson, onClose }) => {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);

  useEffect(() => {
    const fetchQuizzesByLessonId = async () => {
      try {
        const response = await getQuizzesByLessonId(lesson._id);
        setQuizzes(response);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchQuizzesByLessonId();
  }, []);
  return (
    <Box>
      <h2>{lesson.title}</h2>
      <p>{lesson.summary}</p>
      {quizzes.map((quiz) => (
        <QuizItem key={quiz._id} quiz={quiz} />
      ))}
      <button onClick={onClose}>Close</button>
    </Box>
  );
};

export default LessonInfo;
