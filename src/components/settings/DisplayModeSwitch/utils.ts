import { QuizSettings } from "../../../api/quiz/types";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DisplayMode } from "../../../api/quiz/types";
import { DISPLAY_MODE_STORAGE } from "./constants";

export const getOppositeDisplayMode = (
  displayMode: QuizSettings["displayMode"]
): QuizSettings["displayMode"] => {
  switch (displayMode) {
    case "Light":
      return "Dark";
    case "Dark":
      return "Light";
  }
};

export const getInitialDisplayMode = (): DisplayMode => {
  const displayModeStorage: string | null =
    localStorage.getItem(DISPLAY_MODE_STORAGE);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const defaultDisplayMode: DisplayMode = prefersDarkMode ? "Dark" : "Light";

  const initialDisplayMode =
    (displayModeStorage as DisplayMode) ?? defaultDisplayMode;

  localStorage.setItem(DISPLAY_MODE_STORAGE, initialDisplayMode);
  return initialDisplayMode;
};
