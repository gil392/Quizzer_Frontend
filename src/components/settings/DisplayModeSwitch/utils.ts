import { DisplayMode } from "../../../api/user/types";

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

export const getUserDisplayMode = (): DisplayMode | null => {
  const displayMode = localStorage.getItem("userDisplayMode");
  return displayMode === "Light" || displayMode === "Dark" ? displayMode : null;
};

export const storeUserDisplayMode = (displayMode: DisplayMode) => {
  localStorage.setItem("userDisplayMode", displayMode);
};

export const removeUserDisplayMode = () => {
  localStorage.removeItem("userDisplayMode");
};
