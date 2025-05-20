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

export const getSavedDisplayMode = (): DisplayMode | null => {
  const displayMode = localStorage.getItem("displayMode");
  return displayMode === "Light" || displayMode === "Dark" ? displayMode : null;
};

export const saveDisplayMode = (displayMode: DisplayMode | null) => {
  localStorage.setItem("displayMode", displayMode ?? "");
};
