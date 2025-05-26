import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Button,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { User } from "../../api/user/types";
import useStyles from "./styles";
import { useSetRecoilState } from "recoil";
import { profileImageState } from "../../recoil/profileImage";
import { getLoggedUser, updateUser } from "../../api/user/api";
import { PROFILE_IMAGE } from "../../components/appbar/const";
import EditingActions from "./components/EditingActions/EditingActions";

const UserProfilePage: FunctionComponent = () => {
  const [user, setUser] = useState<User>();

  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState<string>();
  const [profileImageUrl, setProfileImageUrl] = useState<string>();
  const [imageFile, setImageFile] = useState<File>();
  const setProfileImageState = useSetRecoilState(profileImageState);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getLoggedUser();
      setUser(data);
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
        const { data: updatedUser } = await updateUser({
          username,
          imageFile,
        });
        setUser(updatedUser);

        if (updatedUser?.profileImage) {
          localStorage.setItem(PROFILE_IMAGE, updatedUser.profileImage);
          setProfileImageState(updatedUser.profileImage);
        }
      }
    } finally {
      stopEdit();
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
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

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

export default UserProfilePage;
