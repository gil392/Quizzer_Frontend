import { ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import quizzerTheme from './theme';
import NavBar from './components/navBar/NavBar';

function App() {
    return (
        <ThemeProvider theme={quizzerTheme}>
            <div
                style={
                    {
                        width: '100%',
                        height: '100%',
                        '--primary-main': quizzerTheme.palette.primary.main,
                        '--primary-light': quizzerTheme.palette.primary.light,
                        '--primary-contrastText':
                            quizzerTheme.palette.primary.contrastText
                    } as React.CSSProperties
                }
            >
                <Router>
                    <NavBar />
                    <Layout />
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
