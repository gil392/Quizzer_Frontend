
import { Box } from '@mui/material';
import './App.css'
import DisplayModeSwtich from './components/settings/DisplayModeSwitch/DisplayModeSwitch';
import Router from './Router/Router';

function App() {
  return (
  <>
  <Box className='header'>
    <DisplayModeSwtich />
  </Box>
  <Router/>  
  </>)
}

export default App
