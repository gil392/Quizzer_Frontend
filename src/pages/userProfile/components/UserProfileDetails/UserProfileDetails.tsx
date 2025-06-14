import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Skeleton, TextField, Typography } from "@mui/material";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { GenericIconButton } from "../../../../components/GenericIconButton";
import EditingActions from "../EditingActions/EditingActions";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  fetchLoggedUser,
} from "../../../../store/userReducer";
import { UserWithId } from "../../../../api/user/types";

interface UserProfileDetailsProps {
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  imageFile?: File;
  setImageFile: (file: File | undefined) => void;
  profileImageUrl: string | undefined;
  setProfileImageUrl: (url: string | undefined) => void;
  user?: UserWithId | null;
}

const UserProfileDetails: FunctionComponent<UserProfileDetailsProps> = (props) => {
  const {
    user: passedUser,
    setIsEditing,
    isEditing,
    imageFile,
    setImageFile,
    profileImageUrl,
    setProfileImageUrl,
  } = props;
  const classes = useStyles();

  const [username, setUsername] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();
  const { loggedUser } = useSelector((state: RootState) => state.user);

  const user = passedUser || loggedUser;

  useEffect(() => {
    if (!passedUser) {
      const fetchUser = async () => {
        await dispatch(fetchLoggedUser()).unwrap();
      };
      fetchUser();
    }
  }, [passedUser, dispatch]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setProfileImageUrl(user.profileImage);
    }
  }, [user]);

  const stopEdit = () => {
    setImageFile(undefined);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setUsername(user.username);
      setProfileImageUrl(user.profileImage);
    }
    stopEdit();
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      console.log("Image URL:", imageUrl);
      setProfileImageUrl(imageUrl);
      setImageFile(file);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.profileImageDiv}>
        <Avatar
          src={profileImageUrl}
          alt={user?.username ?? "Profile"}
          sx={{
            width: 150,
            height: 150,
            mb: 2,
            fontSize: "3em",
          }}
        />
        {isEditing && !passedUser && (
          <GenericIconButton
            component={"label"}
            title={"Upload image"}
            className={classes.imageEditIcon}
            icon={
              <>
                <EditIcon />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfileImageChange}
                />
              </>
            }
          />
        )}
      </div>

      <Typography
        className={classes.userTextProperty}
        variant="subtitle1"
        color="textSecondary"
      >
        {user ? user.email : <Skeleton />}
      </Typography>
      <Typography
        className={classes.userTextProperty}
        variant="subtitle1"
        color="textSecondary"
      >
        streak: {user ? user.streak : <Skeleton />}
      </Typography>
      {isEditing && !passedUser ? (
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mt: 2 }}
        />
      ) : (
        <Typography className={classes.userTextProperty} variant="h6">
          {user ? user.username : <Skeleton />}
        </Typography>
      )}
      {!passedUser && (
        isEditing ? (
          <EditingActions
            user={user}
            username={username}
            imageFile={imageFile}
            cancelEditing={handleCancel}
            stopEdit={stopEdit}
          />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            sx={{ mt: 3 }}
          >
            Edit Profile
          </Button>
        )
      )}
    </div>
  );
};

export default UserProfileDetails;
