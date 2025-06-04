import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Skeleton, TextField, Typography } from "@mui/material";
import { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { GenericIconButton } from "../../components/GenericIconButton";
import { toastSuccess, toastWarning } from "../../utils/utils";
import EditingActions from "./components/EditingActions/EditingActions";
import { FunctionComponent } from "react";
import Achievments from "./components/Achievments/Achievments";
import UserProfileDetails from "./components/UserProfileDetails/UserProfileDetails";
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
    <div className={classes.root}>
      <section className={classes.pannel}>
        <Achievments className={classes.achievements} />
      </section>
      <section className={classes.pannel}>
        <UserProfileDetails />
      </section>
    </div>
  );
};

export default UserProfilePage;
