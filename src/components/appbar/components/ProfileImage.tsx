import { Avatar } from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import { PROFILE_IMAGE } from "../const";
import useStyles from "../styles";
import { useRecoilState } from "recoil";
import { profileImageState } from "../../../recoil/profileImage";
import { getLoggedUser } from "../../../api/user/api";

interface ProfileImageProps {
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
}

const getUserProfileImage = async () => {
  let userProfileImage: string | null | undefined =
    localStorage.getItem(PROFILE_IMAGE);
  if (!userProfileImage) {
    const { data } = await getLoggedUser();
    userProfileImage = data?.profileImage;
  }
  return userProfileImage;
};

const ProfileImage: FunctionComponent<ProfileImageProps> = (props) => {
  const classes = useStyles();
  const [profileImage, setProfileImage] = useRecoilState(profileImageState);

  useEffect(() => {
    const initUserProfileImage = async () => {
      let userProfileImage: string | null | undefined =
        await getUserProfileImage();
      if (userProfileImage) {
        setProfileImage(userProfileImage);
        localStorage.setItem(PROFILE_IMAGE, userProfileImage);
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
