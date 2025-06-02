import { ShieldMoon, Sunny } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { updateUser } from "../../../api/user/api";
import { useDisplayMode } from "./globalProvider";
import {
  getOppositeDisplayMode,
  getUserDisplayMode,
  storeUserDisplayMode,
} from "./utils";
import { DisplayMode, UserSettings } from "../../../api/user/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const DisplayModeSwitch: FunctionComponent = () => {
  const { displayMode, setDisplayMode } = useDisplayMode();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  useEffect(() => {
    const setUserDisplayMode = async () => {
      let userDisplayMode = getUserDisplayMode();
      if (!userDisplayMode) {
        userDisplayMode = loggedUser?.settings?.displayMode ?? null;
      }
      if (userDisplayMode) {
        storeUserDisplayMode(userDisplayMode);
        setDisplayMode(userDisplayMode);
      }
    };

    setUserDisplayMode();
  }, []);

  const changeDisplayMode = async (displayMode: DisplayMode) => {
    const settings: Partial<UserSettings> = {
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
