import { ThemeProvider } from '@mui/material';
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
import './App.css';
import QuizPage from './pages/Quiz';
import SummaryPage from './pages/Summary';
import HomePage from './pages/home/Home';
import RegisterPage from './pages/register/RegisterPage';
import quizzerTheme from './theme';

function App() {
  return (
    <ThemeProvider theme={quizzerTheme}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/summary' element={<SummaryPage />} />
          <Route path='/quiz' element={<QuizPage />} />
          <Route path='/signup' element={<RegisterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
