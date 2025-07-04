import { CSSProperties, Theme } from "@mui/material";

export const createScrollerStyleClass = (theme: Theme): CSSProperties => ({
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.2)"
        : "rgba(255, 255, 255, 0.8)",
    borderRadius: "16px",
    border: "2px solid transparent",
    backgroundClip: "content-box",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.4)"
        : "rgba(255, 255, 255, 0.6)",
  },
});
