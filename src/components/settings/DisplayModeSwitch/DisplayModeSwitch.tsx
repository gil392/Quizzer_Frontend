import { ShieldMoon, Sunny } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { QuizSettings } from "../../../api/quiz/types";
import { getOppositeDisplayMode } from "./utils";

interface DisplayModeSwitchProps {
  displayMode: QuizSettings["displayMode"];
  setDisplayMode: (displayMode: QuizSettings["displayMode"]) => void;
}

const DisplayModeSwtich: FunctionComponent<DisplayModeSwitchProps> = ({
  displayMode,
  setDisplayMode,
}) => {
  const switchDisplayMode = () => {
    const nextDisplayMode = getOppositeDisplayMode(displayMode);
    setDisplayMode(nextDisplayMode);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Display Mode
      </Typography>
      <Button
        onClick={switchDisplayMode}
        aria-label={`Switch to ${getOppositeDisplayMode(displayMode)} mode`}
      >
        {displayMode === "Dark" ? <ShieldMoon /> : <Sunny />}
      </Button>
    </>
  );
};

export default DisplayModeSwtich;
