import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import SummaryPage from './pages/Summary'
import QuizPage from './pages/Quiz';
import HomePage from './pages/home/Home'
import DisplayModeSwtich from './components/settings/DisplayModeSwitch/DisplayModeSwitch';


function App() {
  
  return (<>
    <Router>
      <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/quiz" element={<QuizPage />}
          />
      </Routes>
    </Router>
    <DisplayModeSwtich />
  </>
    
    
  )
}

export default App
