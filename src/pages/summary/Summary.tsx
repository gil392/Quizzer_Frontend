import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

interface SummaryPageProps {
    videoTitle: string;
    videoSummary: string;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ videoTitle, videoSummary }) => {
    return (
        <Box>
            <Typography variant="h5" component="div" gutterBottom>
                {videoTitle}

            </Typography>
            <Card sx={{
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
                }}>
                
                <CardContent> 
                    {videoSummary}
                </CardContent>
            </Card>
        </Box>
    );
};

export default SummaryPage;