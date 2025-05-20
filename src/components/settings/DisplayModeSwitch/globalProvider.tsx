import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { DisplayMode } from "../../../api/quiz/types";
import { darkTheme, lightTheme } from "../../../theme";
import { DisplayModeContext } from "./config";
import { getLoggedUser } from "../../../api/user/api";
import { getSavedDisplayMode, saveDisplayMode } from "./utils";

export const DisplayModeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true,
  });
  const defaultDisplayMode: DisplayMode = prefersDarkMode ? "Dark" : "Light";
  const savedDisplayMode = getSavedDisplayMode();

  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    savedDisplayMode ?? defaultDisplayMode
  );

  const theme = useMemo(
    () => (displayMode === "Light" ? lightTheme : darkTheme),
    [displayMode]
  );

  const setAndSaveDisplayMode = (displayMode: DisplayMode | null) => {
    setDisplayMode(displayMode ?? defaultDisplayMode);
    saveDisplayMode(displayMode);
  };

  return (
    <DisplayModeContext.Provider
      value={{ displayMode, setDisplayMode: setAndSaveDisplayMode }}
    >
      <MuiThemeProvider theme={theme}>
        <StylesThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </StylesThemeProvider>
      </MuiThemeProvider>
    </DisplayModeContext.Provider>
  );
};

export const useDisplayMode = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const defaultDisplayMode: DisplayMode = prefersDarkMode ? "Dark" : "Light";

  const context = useContext(DisplayModeContext);
  return (
    context ?? {
      displayMode: defaultDisplayMode,
      setDisplayMode: (displayMode: DisplayMode) => {
        console.error("try to alert when display mode context is null:", {
          displayMode,
        });
      },
    }
  );
};
