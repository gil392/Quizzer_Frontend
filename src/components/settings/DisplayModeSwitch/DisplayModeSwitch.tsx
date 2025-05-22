import { ShieldMoon, Sunny } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { DisplayMode, QuizSettings } from "../../../api/quiz/types";
import { getLoggedUser, updateUser } from "../../../api/user/api";
import { useDisplayMode } from "./globalProvider";
import {
  getOppositeDisplayMode,
  getUserDisplayMode,
  storeUserDisplayMode,
} from "./utils";

const DisplayModeSwitch: FunctionComponent = () => {
  const { displayMode, setDisplayMode } = useDisplayMode();

  useEffect(() => {
    const setUserDisplayMode = async () => {
      let userDisplayMode = getUserDisplayMode();
      if (!userDisplayMode) {
        const { data } = await getLoggedUser();
        userDisplayMode = data?.settings?.displayMode ?? null;
      }
      if (userDisplayMode) {
        storeUserDisplayMode(userDisplayMode);
        setDisplayMode(userDisplayMode);
      }
    };

    setUserDisplayMode();
  }, []);

  const changeDisplayMode = async (displayMode: DisplayMode) => {
    const settings: Partial<QuizSettings> = {
      displayMode,
    };
    try {
      setDisplayMode(displayMode);
      await updateUser({ settings });
      storeUserDisplayMode(displayMode);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => changeDisplayMode(getOppositeDisplayMode(displayMode))}
        aria-label={`Switch to ${getOppositeDisplayMode(displayMode)} mode`}
      >
        {displayMode === "Dark" ? <ShieldMoon /> : <Sunny />}
      </Button>
    </>
  );
};

export default DisplayModeSwitch;
