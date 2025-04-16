import Box from "@mui/material/Box";
import { LessonData } from "../../services/backend/types";

interface LessonInfoProps {
  lesson: LessonData;
  onClose: () => void;
}

const LessonInfo: React.FC<LessonInfoProps> = ({ lesson, onClose }) => {
    return (
        <Box>
            <h2>{lesson.title}</h2>
            <p>{lesson.summary}</p>
            <button onClick={onClose}>Close</button>
        </Box>
    )
  // Component implementation
};

export default LessonInfo