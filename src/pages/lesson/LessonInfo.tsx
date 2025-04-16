import Box from "@mui/material/Box";
import { LessonData, QuizData } from "../../services/backend/types";
import { useState, useEffect } from "react";
import {
  deleteQuiz,
  getQuizzesByLessonId,
  updateQuiz,
} from "../../services/backend/service";
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

  const handleDeleteQuiz = async (quizId: string) => {
    await deleteQuiz(quizId);
    setQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => quiz._id !== quizId)
    );
  };

  const handleUpdateQuiz = async (quiz: QuizData) => {
    await updateQuiz(quiz._id, quiz);
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((q) => (q._id === quiz._id ? quiz : q))
    );
  };

  return (
    <Box>
      <h2>{lesson.title}</h2>
      <p>{lesson.summary}</p>
      {quizzes.map((quiz) => (
        <QuizItem
          key={quiz._id}
          quiz={quiz}
          deleteQuiz={() => handleDeleteQuiz(quiz._id)}
          updateQuizTitle={(newTitle: string) => {
            handleUpdateQuiz({ ...quiz, title: newTitle });
          }}
        />
      ))}
      <button onClick={onClose}>Close</button>
    </Box>
  );
};

export default LessonInfo;
