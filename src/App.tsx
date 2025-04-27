import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import quizzerTheme from './theme';
import NavBar from './components/navBar/NavBar';

function App() {
    return (
        <ThemeProvider theme={quizzerTheme}>
            <Router>
                <NavBar />
                <Layout />
            </Router>
        </ThemeProvider>
    );
}

export default App;
