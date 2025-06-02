import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Skeleton, TextField, Typography } from "@mui/material";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { getLoggedUser } from "../../api/user/api";
import { User } from "../../api/user/types";
import { GenericIconButton } from "../../components/GenericIconButton";
import { toastSuccess, toastWarning } from "../../utils/utils";
import EditingActions from "./components/EditingActions/EditingActions";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateUserAsync } from "../../store/userReducer";

const UserProfilePage: FunctionComponent = () => {
  const { loggedUser: user } = useSelector((state: RootState) => state.user);

  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState<string>();
  const [profileImageUrl, setProfileImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchUser = async () => {
      await getLoggedUser();
    };
    fetchUser();
  }, []);

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

  const handleSave = async () => {
    try {
      if (user && (username || imageFile)) {
        await dispatch(
          updateUserAsync({
            username,
            imageFile,
          })
        ).unwrap();

        toastSuccess("Update user successfuly");
        stopEdit();
      }
    } catch (error) {
      console.error("Failed updating user: ", error);
      toastWarning("Failed to update user. Please try again");
    }
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
      setProfileImageUrl(imageUrl);
      setImageFile(file);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
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
          {isEditing && (
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
        {isEditing ? (
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
        {isEditing ? (
          <EditingActions saveEdit={handleSave} cancelEditing={handleCancel} />
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(true)}
            sx={{ mt: 3 }}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </>
  );
};

export default UserProfilePage;
