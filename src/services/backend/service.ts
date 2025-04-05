import { LessonData, QuizData, QuizSettings } from "./types";

export async function generateLesson(videoUrl: string): Promise<LessonData> {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL; 
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


export async function generateQuiz(lessonId: string, settings: QuizSettings): Promise<QuizData> {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL; 
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