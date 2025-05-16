import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider as StylesThemeProvider } from "@mui/styles";
import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { DisplayModeContext } from "./config";
import { DisplayMode } from "../../../api/quiz/types";
import { INITIAL_DISPLAY_MODE } from "./constants";
import { darkTheme, lightTheme } from "../../../theme";

export const DisplayModeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const initialDisplayMode: string =
    localStorage.getItem("displayMode") ?? INITIAL_DISPLAY_MODE;
  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    initialDisplayMode as DisplayMode
  );

  const saveDisplayMode = (displayMode: DisplayMode) => {
    localStorage.setItem("displayMode", displayMode);
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
      displayMode: INITIAL_DISPLAY_MODE,
      saveDisplayMode: (displayMode: DisplayMode) => {
        console.error("try to alert when display mode context is null:", {
          displayMode,
        });
      },
    }
  );
};
