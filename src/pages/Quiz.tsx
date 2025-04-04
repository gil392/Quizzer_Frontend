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
        <Box>
            <Typography variant="h5" component="div" gutterBottom>
                {videoTitle}
            </Typography>
            <Card
                sx={{
                    maxWidth: '1000px',
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
               <CardContent>
                    {questions.map((question, index) => (
                        <Box key={index} sx={{ marginBottom: 5, textAlign: 'left' }}>
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
                        </Box>
                    ))}
                </CardContent>
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