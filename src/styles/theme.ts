import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#7564c8",       // buttons primary color
      light: "#e4e1f8",      // a lighter variant, derived from main
      dark: "#cdc7f0",       // a darker variant, derived from main
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#30286e",       // buttons secondary color
    },
    background: {
      default: "#fefdfE",    // background color
      paper: "#fefefe",      // secondary background color (cards/paper)
    },
    error: {
      main: "#B3261E",
    },
    text: {
      primary: "#000000",    // text primary color
      secondary: "#cacbcd",  // secondary text color
    },
    divider: "#cacbcd",      // match secondary text color for subtle divider
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
          boxShadow: "0 4px 20px rgba(117, 100, 200, 0.1)", // adjusted shadow to primary button color with transparency
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6053ce",       // buttons primary color
      light: "#847be0",      // lighter variant derived from main
      dark: "#3f36a7",       // darker variant derived from main
      contrastText: "#121212",
    },
    secondary: {
      main: "#35317b",       // buttons secondary color
    },
    background: {
      default: "#0f1117",    // background color
      paper: "#171A24",      // secondary background color (cards/paper)
    },
    error: {
      main: "#F2B8B5",
    },
    text: {
      primary: "#c1c1c2",    // text primary color
      secondary: "#737478",  // secondary text color
    },
    divider: "#35317b",      // matching secondary button color for subtle divider
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
          boxShadow: "0 4px 20px rgba(96, 83, 206, 0.1)", // primary button color shadow with transparency
        },
      },
    },
  },
});
