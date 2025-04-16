import {
  LessonData,
  QuizData,
  QuizSettings,
  QuizAnswerSubmittion,
  QuizResult,
} from "./types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function generateLesson(videoUrl: string): Promise<LessonData> {
  try {
    const response = await fetch(`${backendUrl}/lesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate lesson");
    }

    const data = await response.json();
    console.log("Lesson generated:", data);

    return data;
  } catch (error) {
    console.error("Error generating lesson:", error);

    throw error;
  }
}

export async function generateQuiz(
  lessonId: string,
  settings: QuizSettings
): Promise<QuizData> {
  try {
    const response = await fetch(`${backendUrl}/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lessonId,
        settings,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate quiz");
    }

    const data = await response.json();
    console.log("Quiz generated:", data);

    return data;
  } catch (error) {
    console.error("Error generating quiz:", error);

    throw error;
  }
}

export async function submitQuiz(
  data: QuizAnswerSubmittion
): Promise<QuizResult> {
  try {
    const response = await fetch(`${backendUrl}/quiz/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to submit quiz");
    }

    const result = await response.json();
    console.log("Quiz submitted:", result);

    return result;
  } catch (error) {
    console.error("Error submitting quiz:", error);

    throw error;
  }
}

export async function getLessons(): Promise<LessonData[]> {
  try {
    const response = await fetch(`${backendUrl}/lesson/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch lessons");
    }

    const data = await response.json();
    console.log("Lessons fetched:", data);

    return data;
  } catch (error) {
    console.error("Error fetching lessons:", error);

    throw error;
  }
}

export async function updateLesson(
  lessonId: string,
  updatedData: Partial<LessonData>
): Promise<LessonData> {
  return updateItem<LessonData>(
    lessonId,
    updatedData,
    "lesson/update",
    "lesson"
  );
}

export async function getQuizzesByLessonId(
  lessonId: string
): Promise<QuizData[]> {
  try {
    const response = await fetch(`${backendUrl}/quiz/lesson/${lessonId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quizzes");
    }

    const data = await response.json();
    console.log("Quizzes fetched:", data);

    return data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}

export async function deleteItem(
  itemId: string,
  path: string,
  itemType: String
): Promise<void> {
  try {
    const response = await fetch(`${backendUrl}/${path}/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete ${itemType}`);
    }

    console.log(`${itemType} with ID ${itemId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting ${itemType}:`, error);
    throw error;
  }
}

export async function deleteLesson(lessonId: string): Promise<void> {
  return deleteItem(lessonId, "lesson/delete", "lesson");
}

export async function deleteQuiz(quizId: string): Promise<void> {
  return deleteItem(quizId, "quiz/delete", "quiz");
}

export async function updateItem<T>(
  itemId: string,
  updatedData: Partial<T>,
  path: string,
  itemType: string
): Promise<T> {
  try {
    const response = await fetch(`${backendUrl}/${path}/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ${itemType}`);
    }

    const data = await response.json();
    console.log(`${itemType} with ID ${itemId} updated successfully:`, data);

    return data;
  } catch (error) {
    console.error(`Error updating ${itemType}:`, error);
    throw error;
  }
}

export async function updateQuiz(
  quizId: string,
  updatedData: Partial<QuizData>
): Promise<QuizData> {
  return updateItem<QuizData>(quizId, updatedData, "quiz/update", "quiz");
}
