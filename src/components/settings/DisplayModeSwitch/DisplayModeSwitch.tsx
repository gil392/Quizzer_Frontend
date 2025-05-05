import { useEffect, useState } from "react";
import { DisplayMode } from "./constants";
import { getInitialDisplayMode, getOppositeDisplayMode } from "./utils";
import { Button, Typography } from "@mui/material";
import { ShieldMoon, Sunny } from "@mui/icons-material";

const DisplayModeSwtich: React.FC = () => {
  const displayModeProvider = document.documentElement.classList;
  const initalDisplayMode: DisplayMode = getInitialDisplayMode();

  const [displayMode, setDisplayMode] =
    useState<DisplayMode>(initalDisplayMode);

  useEffect(() => {
    if (!displayModeProvider.contains(displayMode)) {
      displayModeProvider.add(displayMode);
    }
  }, [displayMode]);

  const switchDisplayMode = () => {
    const currentDisplayMode = displayMode;
    const nextDisplayMode = getOppositeDisplayMode(currentDisplayMode);

    displayModeProvider.remove(currentDisplayMode);
    displayModeProvider.add(nextDisplayMode);

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
        {displayMode === DisplayMode.Dark ? <ShieldMoon /> : <Sunny />}
      </Button>
    </>
  );
};

export default DisplayModeSwtich;
