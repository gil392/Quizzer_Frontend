import { Box, Button, OutlinedInput} from '@mui/material';
import './Home.css'
function HomePage() {
    return (
      <Box className='youtube-box'>
        <div className='youtube-label'>Insert youtube video</div>
        <Box className='youtube-form' >
          <OutlinedInput className='youtube-input' placeholder='youtube.com/watch?v=j0u7ub3m473' sx={{borderRadius: "1rem", width: "23rem", height: "3rem"}}/>
          <Button className='youtube-button' variant='contained' sx={{backgroundColor: 'black'}}>Generate Quiz</Button>          
        </Box>
      </Box>
      
    )
}

export default HomePage;