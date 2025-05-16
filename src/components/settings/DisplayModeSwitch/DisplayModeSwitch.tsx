import { ShieldMoon, Sunny } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { DisplayMode } from "../../../api/quiz/types";
import { getOppositeDisplayMode } from "./utils";

interface DisplayModeSwitchProps {
  displayMode: DisplayMode;
  setDisplayMode: (displayMode: DisplayMode) => void;
}

const DisplayModeSwitch: FunctionComponent<DisplayModeSwitchProps> = ({
  displayMode,
  setDisplayMode,
}) => {
  const switchDisplayMode = () => {
    const newDisplayMode = getOppositeDisplayMode(displayMode);
    setDisplayMode(newDisplayMode);
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

export default DisplayModeSwitch;
