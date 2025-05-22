import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6750A4",
      light: "#E8DEF8",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#625B71",
    },
    background: {
      default: "#FFFBFE",
      paper: "#FFFFFF",
    },
    error: {
      main: "#B3261E",
    },
    text: {
      primary: "#1C1B1F",
      secondary: "#49454F",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: { textTransform: "none" },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D0BCFF",
      light: "#EADDFF",
      contrastText: "#1C1B1F",
    },
    secondary: {
      main: "#CCC2DC",
    },
    background: {
      default: "#1C1B1F",
      paper: "#2C2C2E",
    },
    error: {
      main: "#F2B8B5",
    },
    text: {
      primary: "#E6E1E5",
      secondary: "#CAC4D0",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: { textTransform: "none" },
      },
    },
  },
});
