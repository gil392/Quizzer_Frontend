import { createContext } from "react";
import { DisplayMode } from "../../../api/quiz/types";

interface DisplayModeContextType {
  displayMode: DisplayMode;
  saveDisplayMode: (displayMode: DisplayMode) => void;
}

export const DisplayModeContext = createContext<DisplayModeContextType | null>(
  null
);
