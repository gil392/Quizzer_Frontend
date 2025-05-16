import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
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
import { DISPLAY_MODE_STORAGE } from "./constants";
import { getInitialDisplayMode } from "./utils";

export const DisplayModeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    getInitialDisplayMode()
  );

  const saveDisplayMode = (displayMode: DisplayMode) => {
    localStorage.setItem(DISPLAY_MODE_STORAGE, displayMode);
    setDisplayMode(displayMode);
  };

  const theme = useMemo(
    () => (displayMode === "Light" ? lightTheme : darkTheme),
    [displayMode]
  );

  return (
    <DisplayModeContext.Provider value={{ displayMode, saveDisplayMode }}>
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
  const context = useContext(DisplayModeContext);
  return (
    context ?? {
      displayMode: getInitialDisplayMode(),
      saveDisplayMode: (displayMode: DisplayMode) => {
        console.error("try to alert when display mode context is null:", {
          displayMode,
        });
      },
    }
  );
};
