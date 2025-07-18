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
  const userId = locationState?.userId;
  const [user, setUser] = useState<UserWithId | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    undefined
  );

  const cleanState = () => {
    setUser(null);
    setProfileImageUrl(undefined);
    setIsEditing(false);
    setImageFile(undefined);
  };

  useEffect(() => {
    cleanState();

    const fetchFriend = async () => {
      if (userId) {
        try {
          const fetchedFriend = await fetchFriendById(userId);
          setUser(fetchedFriend.data);
          setProfileImageUrl(fetchedFriend.data.profileImage);
        } catch (error) {
          toastError("Failed to fetch user profile. Please try again later.");
        }
      }
    };
    fetchFriend();
  }, [userId]);

  return (
    <div className={classes.root}>
      <section className={classes.pannel}>
        <Achievments
          className={classes.achievements}
          isEditing={isEditing && !userId}
          setImageFile={setImageFile}
          setProfileImageUrl={setProfileImageUrl}
          userId={userId}
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
          user={user}
        />
      </section>
    </div>
  );
};

export default UserProfilePage;
