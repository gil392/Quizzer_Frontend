import { Box, Card, CardContent, Typography, Button, Skeleton } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LessonData, QuizSettings } from '../services/backend/types';
import { generateQuiz } from '../services/backend/service';

const SummaryPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [lessonData, setLessonData] = useState<LessonData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const lessonPromise = location.state?.lessonPromise;
        if (lessonPromise) {
            lessonPromise
                .then((data: LessonData) => {
                    setLessonData(data);
                    setLoading(false);
                })
                .catch((error: any) => {
                    console.error('Error loading lesson:', error);
                    setLessonData(null);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [location.state]);

    const handleQuizNavigation = () => {
        if (!lessonData) {
            alert('Lesson data is not available.');
            return;
        }

        const quizSettings: QuizSettings = {
            checkType: 'onSubmit', 
            isRandomOrder: true,
            maxQuestionCount: 10,
            solvingTimeMs: 60000,
        };

        const quizPromise = generateQuiz(lessonData._id, quizSettings);

        navigate('/quiz', { state: { quizPromise, lessonData } });
    };

    return (
        <Box sx={{ width: '50vw', margin: 'auto', padding: 2 }}>
            {loading ? (
                <Box>
                    <Skeleton variant="text" width="80%" height={40} />
                    <Skeleton variant="rectangular" width="100%" height={200} sx={{ marginTop: 2 }} />
                    <Skeleton variant="rectangular" width="100%" height={50} sx={{ marginTop: 2 }} />
                </Box>
            ) : lessonData ? (
                <Card
                    sx={{
                        maxWidth: '50vw',
                        boxShadow: 10,
                        paddingTop: 2,
                        maxHeight: '85vh',
                        overflowY: 'auto',
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
                    <CardContent sx={{ textAlign: 'left' }}>
                        <Typography variant="h5" component="div" gutterBottom>
                            {lessonData.title}
                        </Typography>
                        <Typography variant="body1">{lessonData.summary}</Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleQuizNavigation}>
                            Go to Quiz
                        </Button>
                    </Box>
                </Card>
            ) : (
                <Card
                    sx={{
                        maxWidth: '50vw',
                        boxShadow: 10,
                        padding: 2,
                        height: '85vh',
                        textAlign: 'center',
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" color="error">
                            Failed to load lesson data.
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default SummaryPage;