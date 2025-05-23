import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Button,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import EditingActions from "../EditingActions/EditingActions";
import useStyles from "./styles";
import { User } from "../../../../api/user/types";
import { updateUser } from "../../../../api/user/api";

interface UserProfileProps {
  user?: User;
  setUser: (user: User) => void;
}

const UserProfile: FunctionComponent<UserProfileProps> = (props) => {
  const { user, setUser } = props;
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState<string>();
  // const [profileImageUrl, setProfileImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      // setProfileImageUrl(user.profileImage);
    }
  }, [user]);

  const stopEdit = () => {
    setImageFile(undefined);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      if (user && (username || imageFile)) {
        const { data: updatedUser } = await updateUser({
          username,
          // imageFile
        });
        setUser(updatedUser);
      }
    } finally {
      stopEdit();
    }
  };

  const handleCancel = () => {
    if (user) {
      setUsername(user.username);
      // setProfileImageUrl(user.profileImage);
    }
    stopEdit();
  };

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // setProfileImageUrl(imageUrl);
      setImageFile(file);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.profileImageDiv}>
        <Avatar
          // src={profileImageUrl}
          alt={user?.username ?? "Profile"}
          sx={{
            width: 150,
            height: 150,
            mb: 2,
            fontSize: "3em",
          }}
        />
        {isEditing && (
          <IconButton
            component="label"
            className={classes.imageEditIcon}
            sx={{ position: "absolute" }}
          >
            <EditIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfileImageChange}
            />
          </IconButton>
        )}
      </div>

      <Typography
        className={classes.userTextProperty}
        variant="subtitle1"
        color="textSecondary"
      >
        {user ? user.email : <Skeleton />}
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
  );
};

export default UserProfile;
