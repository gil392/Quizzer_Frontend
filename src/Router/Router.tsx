import { Navigate, Route, BrowserRouter, Routes } from 'react-router-dom'
import HomePage from '../pages/home/Home';
import SummaryPage from '../pages/Summary';
import QuizPage from '../pages/Quiz';


const Router : React.FC = () => {
    return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/quiz" element={<QuizPage />}
          />
        </Routes>
    </BrowserRouter>)
}

export default Router;