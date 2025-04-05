export type QuizSettings = {
    checkType: 'onSubmit' | 'onSelectAnswer';
    isRandomOrder: boolean;
    maxQuestionCount: number;
    solvingTimeMs: number;
};

export type LessonData = {
    _id: string;
    title: string;
    summary: string;
};

export type QuizData = {
    _id: string;
    questions: {
        _id: string;
        text: string;
        answers: string[];
    }[];
};

export type QuizAnswerSubmittion = {
    quizId: string;
    questions: QuestionAnswerSubmittion[];
};

export type QuestionAnswerSubmittion = {
    questionId: string;
    selectedAnswer: string;
};

export type QuizResult = {
    quizId: string;
    question: QuestionResult[];
    score: number;
};

export type QuestionResult = {
    questionId: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
};
