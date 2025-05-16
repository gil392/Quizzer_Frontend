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

export const DisplayModeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const defaultDisplayMode: DisplayMode = prefersDarkMode ? "Dark" : "Light";

  const [displayMode, setDisplayMode] =
    useState<DisplayMode>(defaultDisplayMode);

  const theme = useMemo(
    () => (displayMode === "Light" ? lightTheme : darkTheme),
    [displayMode]
  );

  return (
    <DisplayModeContext.Provider value={{ displayMode, setDisplayMode }}>
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
