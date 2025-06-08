import { Avatar } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import useStyles from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedUser } from "../../../store/userReducer";
import { AppDispatch, RootState } from "../../../store/store";

interface ProfileImageProps {
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

const getUserProfileImage = async (dispatch: AppDispatch) => {
  const data = await dispatch(fetchLoggedUser()).unwrap();
  return data?.profileImage;
};

const ProfileImage: FunctionComponent<ProfileImageProps> = (props) => {
  const classes = useStyles({});
  const dispatch = useDispatch<AppDispatch>();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  useEffect(() => {
    const initUserProfileImage = async () => {
      await getUserProfileImage(dispatch);
    };
    initUserProfileImage();
  }, []);

  return (
    <>
      <Avatar
        src={loggedUser?.profileImage}
        className={classes.avatar}
        onClick={props.handleMenu}
      />
    </>
  );
};

export default ProfileImage;
