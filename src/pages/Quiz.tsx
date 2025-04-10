import { Box, Card, Typography, Button, FormControlLabel, Checkbox, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { QuizData, QuizResult } from '../services/backend/types';
import { generateQuiz, submitQuiz } from '../services/backend/service';

const QuizPage: React.FC = () => {
    const location = useLocation();
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string | null }>({});
    const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

    const lessonData = location.state?.lessonData;

    useEffect(() => {
        generateQuiz(lessonData._id, location.state?.quizSettings)
            .then((data: QuizData) => {
                setQuizData(data);
                setLoading(false);
            })
            .catch((error: any) => {
                console.error('Error loading quiz:', error);
                setLoading(false);
            });
  
    }, [location.state]);

    const handleOptionChange = (questionIndex: number, option: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: option,
        }));
    };

    const handleQuizSubmission = async () => {
        if (!quizData) {
            alert('Quiz data is not available.');
            return;
        }

        try {
            const submissionData = {
                quizId: quizData._id,
                questions: Object.entries(selectedAnswers)
                    .filter(([_, answer]) => answer !== null)
                    .map(([questionIndex, answer]) => ({
                        questionId: quizData.questions[parseInt(questionIndex)]._id,
                        selectedAnswer: answer as string,
                    })),
            };

            const result: QuizResult = await submitQuiz(submissionData); // Call the backend service
            setQuizResult(result); // Store the quiz result
            console.log('Quiz submission result:', result);

        } catch (error) {
            console.error('Error submitting quiz:', error);
            alert('Failed to submit quiz. Please try again.');
        }
    };

    const allQuestionsAnswered = quizData
        ? quizData.questions.every((_, index) => selectedAnswers[index] !== undefined && selectedAnswers[index] !== null)
        : false;

    const getAnswerOutlineColor = (questionId: string, option: string): string => {
        if (!quizResult) return 'default'; 

        const questionResult = quizResult.results.find((result) => result.questionId === questionId);

        if (!questionResult) return 'default'; 
        if (questionResult.correctAnswer === option) return 'green'; 
        if (questionResult.selectedAnswer === option && questionResult.correctAnswer !== option) return 'red'; 

        return 'default'; 
    };

    return (
        <Box sx={{ width: '50vw', margin: 'auto', padding: 2 }}>
            <Box
                sx={{
                    maxWidth: '50vw',
                    height: '85vh',
                    overflowY: 'auto',
                    backgroundColor: '#f5f5f5',
                    boxShadow: 5,
                    padding: 2,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#555',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: '#f1f1f1',
                    },
                }}
            >
                {loading ? (
                    <Box>
                        <Skeleton variant="text" width="80%" height={40} />
                        <Skeleton variant="rectangular" width="100%" height={200} sx={{ marginTop: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={50} sx={{ marginTop: 2 }} />
                        <Skeleton variant="text" width="80%" height={40} sx={{ marginTop: 6 }}/>
                        <Skeleton variant="rectangular" width="100%" height={200} sx={{ marginTop: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={50} sx={{ marginTop: 2 }} />
                    </Box>
                ) : quizData ? (
                    <Box>
                        {quizResult && (
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    marginBottom: 3,
                                    padding: 2,
                                    backgroundColor: quizResult.score >= 60 ? '#e8f5e9' : "#ffebee",  
                                    borderRadius: '8px',
                                    boxShadow: 2,
                                }}
                            >
                                <Typography variant="h5" color={ quizResult.score >= 60 ?  "green" : "red" } >
                                    Your Score: {quizResult.score} / 100 
                                </Typography>
                            </Box>
                        )}
                        <Typography variant="h5" component="div" gutterBottom>
                            {lessonData.lessonTitle}
                        </Typography>
                        {quizData.questions.map((question, index) => (
                            <Box
                                key={index}
                                sx={{
                                    padding: 3,
                                    backgroundColor: '#f5f5f5',
                                }}
                            >
                                <Card sx={{ boxShadow: 3, textAlign: 'left', borderRadius: 2, padding: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {index + 1}. {question.text}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {question.answers.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={selectedAnswers[index] === option}
                                                        onChange={() => handleOptionChange(index, option)}
                                                        disabled={!!quizResult}
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                border: `2px solid ${getAnswerOutlineColor(
                                                                    question._id,
                                                                    option
                                                                )}`, 
                                                                borderRadius: '4px',
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={option}
                                            />
                                        ))}
                                    </Box>
                                </Card>
                            </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleQuizSubmission}
                                disabled={!allQuestionsAnswered} 
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Typography variant="h6" color="error">
                        Failed to load quiz data.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default QuizPage;