import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7F55DAff",
      light: "#7F55DAff",
      dark: "#7F55DAff",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#573c91",
    },
    background: {
      default: "#FAFAFAff",
      paper: "#FFFFFFff",
    },
    error: {
      main: "#B3261E",
    },
    text: {
      primary: "#1E1F23ff",
      secondary: "#5F6368",
    },
    divider: "#cacbcd",
    action: {
      hover: "#F5F5F5",
    }
  },
  shape: {
    borderRadius: 16,
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
          color: "#FFFFFFff",
          boxShadow: "0 4px 20px rgba(117, 100, 200, 0.06)",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(117, 100, 200, 0.10)",
          },
          "&:active": {
            boxShadow: "0 2px 8px rgba(117, 100, 200, 0.12)",
          },
          "&.MuiButton-contained": {
            color: "#FFFFFF",
          },
          "&.MuiButton-outlined": {
            color: "#1E1F23ff",
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
      main: "#8058DEff",
      light: "#8058DEff",
      dark: "#8058DEff",
      contrastText: "#FFFFFF",
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
      primary: "#F8FAFCff",
      secondary: "#94A3B8",
    },
    divider: "#35317b",
    action: {
      hover: "#111318",
    }
  },
  shape: {
    borderRadius: 16,
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
          color: "#FFFFFFff",
          boxShadow: "0 4px 20px rgba(96, 83, 206, 0.06)",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(96, 83, 206, 0.10)",
          },
          "&:active": {
            boxShadow: "0 2px 8px rgba(96, 83, 206, 0.12)",
          },
          "&.MuiButton-contained": {
            color: "#FFFFFF",
          },
          "&.MuiButton-outlined": {
            color: "#FFFFFF",
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
