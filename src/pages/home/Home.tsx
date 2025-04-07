import { Box, Button, OutlinedInput } from '@mui/material';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function HomePage() {
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState('');

    const handleSummaryNavigation = () => {
      navigate('/summary', { state: { videoUrl } });
  };

    return (
        <Box className="youtube-box">
            <div className="youtube-label">Insert YouTube video</div>
            <Box className="youtube-form">
                <OutlinedInput
                    className="youtube-input"
                    placeholder="youtube.com/watch?v=j0u7ub3m473"
                    sx={{ borderRadius: '1rem', width: '23rem', height: '3rem' }}
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button
                    className="youtube-button"
                    variant="contained"
                    sx={{ backgroundColor: 'black', marginTop: '1rem' }}
                    onClick={handleSummaryNavigation}
                >
                    Generate Lesson
                </Button>
            </Box>
        </Box>
    );
}

export default HomePage;