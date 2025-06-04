import { ShieldMoon, Sunny } from "@mui/icons-material";
import { Button } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { useDisplayMode } from "./globalProvider";
import {
  getOppositeDisplayMode,
  getUserDisplayMode,
  storeUserDisplayMode,
} from "./utils";
import { DisplayMode, UserSettings } from "../../../api/user/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { updateUserAsync } from "../../../store/userReducer";

const DisplayModeSwitch: FunctionComponent = () => {
  const { displayMode, setDisplayMode } = useDisplayMode();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const dispatch = useDispatch<AppDispatch>();

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
      await dispatch(updateUserAsync({ settings }));
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
