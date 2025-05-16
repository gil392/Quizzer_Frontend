import { DisplayMode } from "../../../api/quiz/types";

export const getOppositeDisplayMode = (
  displayMode: DisplayMode
): DisplayMode => {
  switch (displayMode) {
    case "Light":
      return "Dark";
    case "Dark":
      return "Light";
  }
};
