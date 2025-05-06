import { ThemeProvider } from "@mui/material";
import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { DisplayModeContext } from "./config";
import { QuizSettings } from "../../../api/quiz/types";
import { INITIAL_DISPLAY_MODE } from "./constants";
import { darkTheme, lightTheme } from "../../../theme";

export const DisplayModeProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [displayMode, setDisplayMode] =
    useState<QuizSettings["displayMode"]>(INITIAL_DISPLAY_MODE);

  const theme = useMemo(
    () => (displayMode === "Light" ? lightTheme : darkTheme),
    [displayMode]
  );

  return (
    <DisplayModeContext.Provider value={{ displayMode, setDisplayMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DisplayModeContext.Provider>
  );
};

export const useDisplayMode = () => {
  const context = useContext(DisplayModeContext);
  return (
    context ?? {
      displayMode: INITIAL_DISPLAY_MODE,
      setDisplayMode: (displayMode: QuizSettings["displayMode"]) => {
        console.error("try to alert when display mode context is null:", {
          displayMode,
        });
      },
    }
  );
};
