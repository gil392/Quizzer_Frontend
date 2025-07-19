import { Box, Button } from "@mui/material";
import { FunctionComponent } from "react";
import { User } from "../../../../api/user/types";
import { updateUserAsync } from "../../../../store/userReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { toast } from "sonner";
import { toastError, toastSuccess } from "../../../../utils/utils";

interface EditingActionsProps {
  user: User | null;
  username?: string;
  imageFile?: File;
  stopEdit: () => void;
  cancelEditing: () => void;
}

const EditingActions: FunctionComponent<EditingActionsProps> = (props) => {
  const { user, username, imageFile, cancelEditing, stopEdit } = props;
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async () => {
    try {
      if (user && (username || imageFile)) {
        await dispatch(
          updateUserAsync({
            username,
            imageFile,
          })
        ).unwrap();
        stopEdit();
        toastSuccess("Successfully updated user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toastError("Failed to update user");
    }
  };

  return (
    <Box display="flex" gap={2} mt={3}>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="outlined" color="secondary" onClick={cancelEditing}>
        Cancel
      </Button>
    </Box>
  );
};

export default EditingActions;
