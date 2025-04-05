import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SummaryPageProps {
    videoTitle: string;
    videoSummary: string;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ videoTitle, videoSummary }) => {
    const navigate = useNavigate(); 

    const handleQuizNavigation = () => {
        navigate('/quiz'); 
    };

    return (
        <Box sx= {{ width: '50vw', margin: 'auto', padding: 2 }}>
            <Typography variant="h5" component="div" gutterBottom>
                {videoTitle}
            </Typography>
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
                <CardContent sx={{ textAlign: 'left'}}>
                    {videoSummary}
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleQuizNavigation}
                    >
                        Go to Quiz
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default SummaryPage;