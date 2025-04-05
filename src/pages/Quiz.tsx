import { Box, Card, CardContent, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuizPageProps {
    videoTitle: string;
    questions: Question[];
}

interface Question {
    question: string;
    options: { text: string; number: number }[];
    correctAnswer: number;
  }

const QuizPage: React.FC<QuizPageProps> = ({ videoTitle, questions }) => {
    const navigate = useNavigate(); 
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | null }>({});


    const handleOptionChange = (questionIndex: number, optionNumber: number) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: optionNumber,
        }));
    };

    const handleQuizSubmission = () => {
        console.log('Selected Answers:', selectedAnswers);
        alert('Quiz submitted!');
    };

    return (
        <Box sx={{ width: '50vw'}}>
            <Typography variant="h5" component="div" gutterBottom>
                {videoTitle}
            </Typography>
            <Card
                sx={{
                    maxWidth: '50vw',
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
               <Box>
                    {questions.map((question, index) => (
                        <Box
                            key={index}
                            sx={{
                                padding: 3, 
                                backgroundColor: '#f5f5f5', 
                            }}
                        >
                            <Card sx={{ boxShadow: 3, textAlign: 'left', borderRadius: 2, padding: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    {index + 1}. {question.question}
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {question.options.map((option) => (
                                        <FormControlLabel 
                                            key={option.number}
                                            control={
                                                <Checkbox 
                                                    checked={selectedAnswers[index] === option.number}
                                                    onChange={() => handleOptionChange(index, option.number)}
                                                />
                                            }
                                            label={option.text}
                                        />
                                    ))}
                                </Box>
                            </Card>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleQuizSubmission}
                    >
                        Submit
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default QuizPage;