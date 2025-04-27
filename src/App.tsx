import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import SummaryPage from "./pages/Summary";
import QuizPage from "./pages/Quiz";
import HomePage from "./pages/home/Home";
import LessonsPage from "./pages/lesson/LessonsPage/LessonsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/lesson" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/lesson/*" element={<LessonsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
