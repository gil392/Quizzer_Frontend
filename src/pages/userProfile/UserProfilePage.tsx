import { FunctionComponent, useState } from "react";
import Achievments from "./components/Achievments/Achievments";
import UserProfileDetails from "./components/UserProfileDetails/UserProfileDetails";
import useStyles from "./styles";

const UserProfilePage: FunctionComponent = () => {
  const classes = useStyles();
  const [imageFile, setImageFile] = useState<File>();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(undefined);

  return (
    <div className={classes.root}>
      <section className={classes.pannel}>
        <Achievments
          className={classes.achievements}
          isEditing={isEditing}
          setImageFile={setImageFile}
          setProfileImageUrl={setProfileImageUrl}/>
      </section>
      <section className={classes.pannel}>
        <UserProfileDetails
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          setImageFile={setImageFile}
          imageFile={imageFile}
          profileImageUrl={profileImageUrl}
          setProfileImageUrl={setProfileImageUrl}
          />
      </section>
    </div>
  );
};

export default UserProfilePage;
