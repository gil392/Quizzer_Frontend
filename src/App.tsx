import { ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import quizzerTheme from './theme';

function App() {
    return (
        <ThemeProvider theme={quizzerTheme}>
            <Router>
                <Layout />
            </Router>
        </ThemeProvider>
    );
}

export default App;
