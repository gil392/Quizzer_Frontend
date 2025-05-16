import { ShieldMoon, Sunny } from "@mui/icons-material";
import { Button } from "@mui/material";
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
  return (
    <>
      <Button
        onClick={() => setDisplayMode(getOppositeDisplayMode(displayMode))}
        aria-label={`Switch to ${getOppositeDisplayMode(displayMode)} mode`}
      >
        {displayMode === "Dark" ? <ShieldMoon /> : <Sunny />}
      </Button>
    </>
  );
};

export default DisplayModeSwitch;
