import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Achievments from "./components/Achievments/Achievments";
import UserProfileDetails from "./components/UserProfileDetails/UserProfileDetails";
import useStyles from "./styles";
import { UserWithId } from "../../api/user/types";
import { fetchFriendById } from "../../api/user/api";
import { toast } from "sonner";

const UserProfilePage: FunctionComponent = () => {
  const classes = useStyles();
  const { userId } = useParams(); 
  const [user, setUser] = useState<UserWithId | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchFriend = async () => {
      if (userId) {
        try {
          const fetchedFriend = await fetchFriendById(userId);
          setUser(fetchedFriend.data);
          setProfileImageUrl(fetchedFriend.data.profileImage);
        } catch (error) {
          toast.error("Failed to fetch user profile. Please try again later.");
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
          isEditing={isEditing}
          setImageFile={setImageFile}
          setProfileImageUrl={setProfileImageUrl}
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
