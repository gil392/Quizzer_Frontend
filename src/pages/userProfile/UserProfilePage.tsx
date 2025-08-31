import { FunctionComponent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Achievments from "./components/Achievments/Achievments";
import UserProfileDetails from "./components/UserProfileDetails/UserProfileDetails";
import useStyles from "./styles";
import { UserWithId } from "../../api/user/types";
import { fetchFriendById } from "../../api/user/api";
import { toastError } from "../../utils/utils";

type LocationProps = {
  userId: string;
};

const UserProfilePage: FunctionComponent = () => {
  const classes = useStyles();
  const location = useLocation();
  const locationState = (location.state as LocationProps) || undefined;
  const friendUserId = locationState?.userId;
  const [friendUser, setFriendUser] = useState<UserWithId | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    undefined
  );

  const cleanState = () => {
    setFriendUser(null);
    setProfileImageUrl(undefined);
    setIsEditing(false);
    setImageFile(undefined);
  };

  console.log('entered user profile page');

  useEffect(() => {
    cleanState();

    const fetchFriend = async () => {
      if (friendUserId) {
        try {
          const fetchedFriend = await fetchFriendById(friendUserId);
          setFriendUser(fetchedFriend.data);
          setProfileImageUrl(fetchedFriend.data.profileImage);
        } catch (error) {
          toastError("Failed to fetch user profile. Please try again later.");
        }
      }
    };
    fetchFriend();
  }, [friendUserId]);

  return (
    <div className={classes.root}>
      <section className={classes.pannel}>
        <Achievments
          className={classes.achievements}
          isEditing={isEditing && !friendUserId}
          setImageFile={setImageFile}
          setProfileImageUrl={setProfileImageUrl}
          friendUserId={friendUserId}
        />
      </section>
      <section className={classes.pannel}>
        <UserProfileDetails
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          setImageFile={setImageFile}
          imageFile={imageFile}
          profileImageUrl={profileImageUrl}
          setProfileImageUrl={setProfileImageUrl}
          user={friendUser}
        />
      </section>
    </div>
  );
};

export default UserProfilePage;
