import { Avatar } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import useStyles from "../styles";
import { useRecoilState } from "recoil";
import { profileImageState } from "../../../recoil/profileImage";
import { useDispatch } from "react-redux";
import { fetchLoggedUser } from "../../../store/userReducer";
import { AppDispatch } from "../../../store/store";

interface ProfileImageProps {
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

const getUserProfileImage = async (dispatch: AppDispatch) => {
  const data = await dispatch(fetchLoggedUser()).unwrap();
  return data?.profileImage;
};

const ProfileImage: FunctionComponent<ProfileImageProps> = (props) => {
  const classes = useStyles();
  const [profileImage, setProfileImage] = useRecoilState(profileImageState);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const initUserProfileImage = async () => {
      let userProfileImage: string | null | undefined =
        await getUserProfileImage(dispatch);
      if (userProfileImage) {
        setProfileImage(userProfileImage);
      }
    };
    initUserProfileImage();
  }, []);

  return (
    <>
      <Avatar
        src={profileImage}
        className={classes.avatar}
        onClick={props.handleMenu}
      />
    </>
  );
};

export default ProfileImage;
