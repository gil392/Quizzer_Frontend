import { LessonData, QuizData, QuizSettings, QuizAnswerSubmittion, QuizResult } from "./types";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export async function getQuizById(quizId: string): Promise<QuizData> {
    try {
        const response = await fetch(`${backendUrl}/quiz/${quizId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch quiz");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw error;
    }
}

export async function generateLesson(videoUrl: string): Promise<LessonData> {
    try {
        const response = await fetch(`${backendUrl}/lesson`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                videoUrl,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate lesson');
        }

        const data = await response.json();
        console.log('Lesson generated:', data);

        return data;

    } catch (error) {
        console.error('Error generating lesson:', error);

        throw error;
    }
}


export async function generateQuiz(lessonId: string, settings?: QuizSettings): Promise<QuizData> {
    try {
        const response = await fetch(`${backendUrl}/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lessonId,
                settings,
            }),
        });

        console.log('response', response);

        if (!response.ok) {
            throw new Error('Failed to generate quiz');
        }

        const data = await response.json();
        console.log('Quiz generated:', data);

        return data;

    } catch (error) {
        console.error('Error generating quiz:', error);

        throw error;
    }
}

export async function submitQuiz(data: QuizAnswerSubmittion): Promise<QuizResult> {
    try {
        const response = await fetch(`${backendUrl}/quiz/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to submit quiz');
        }

        const result = await response.json();
        console.log('Quiz submitted:', result);

        return result;

    } catch (error) {
        console.error('Error submitting quiz:', error);

        throw error;
    }

}
