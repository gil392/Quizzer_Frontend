export type QuizSettings = {
    checkType: 'multiple-choice' | 'true-false' | 'short-answer'; // TODO: replace with enum
    isRandomOrder: boolean;
    maxQuestionCount: number;
    solvingTimeMs: number;
};

export type LessonData = {
    lessonId: string;
    lessonTitle: string;
    summary: string;
};

export type QuizData = {
    quizId: string;
    questions: {
        questionId: string;
        text: string;
        answers: string[];
    }[];
};