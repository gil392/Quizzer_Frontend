import { createContext } from "react";
import { QuizSettings } from "../../../api/quiz/types";

interface DisplayModeContextType {
  displayMode: QuizSettings["displayMode"];
  setDisplayMode: (displayMode: QuizSettings["displayMode"]) => void;
}

export const DisplayModeContext = createContext<DisplayModeContextType | null>(
  null
);
