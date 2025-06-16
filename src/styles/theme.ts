import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7564c8",
      light: "#e4e1f8",
      dark: "#cdc7f0",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#30286e",
    },
    background: {
      default: "#fefdfE",
      paper: "#fefefe",
    },
    error: {
      main: "#B3261E",
    },
    text: {
      primary: "#000000",
      secondary: "#cacbcd",
    },
    divider: "#cacbcd",
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: ['"Poppins"', 'sans-serif'].join(","),
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: { textTransform: "none" },
      },
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(117, 100, 200, 0.06)",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(117, 100, 200, 0.10)",
          },
          "&:active": {
            boxShadow: "0 2px 8px rgba(117, 100, 200, 0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(117, 100, 200, 0.1)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6053ce",
      light: "#847be0",
      dark: "#3f36a7",
      contrastText: "#121212",
    },
    secondary: {
      main: "#35317b",
    },
    background: {
      default: "#0f1117",
      paper: "#171A24",
    },
    error: {
      main: "#F2B8B5",
    },
    text: {
      primary: "#c1c1c2",
      secondary: "#737478",
    },
    divider: "#35317b",
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: ['"Poppins"', 'sans-serif'].join(","),
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: { textTransform: "none" },
      },
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(96, 83, 206, 0.06)",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(96, 83, 206, 0.10)",
          },
          "&:active": {
            boxShadow: "0 2px 8px rgba(96, 83, 206, 0.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 4px 20px rgba(96, 83, 206, 0.1)",
        },
      },
    },
  },
});
