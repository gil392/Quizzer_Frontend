import { FunctionComponent, useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { GenericIconButton } from "./GenericIconButton";
import styles from "./EditableTitleWithActions.styles";
import { withStyles, WithStyles } from "@mui/styles";
import TwitterShareButton from "./SocialMedia/TwitterShareButton";

interface EditableTitleWithActionsProps extends WithStyles<typeof styles> {
  title: string;
  onSave: (newTitle: string) => void;
  onDelete: () => void;
  onEditModeChange?: (isEditing: boolean) => void;
}

const EditableTitleWithActions: FunctionComponent<
  EditableTitleWithActionsProps
> = ({
  title,
  // onSave,
  onDelete,
  onEditModeChange,
  classes,
}: EditableTitleWithActionsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditClick = () => {
    setIsEditing(true);
    onEditModeChange?.(true);
  };

  const shareToTwitter = () => {
    const text = "Check out this data: 42 apples!";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const handleSaveClick = () => {
    onSave(newTitle);
    setIsEditing(false);
    onEditModeChange?.(false);
  };

  const handleCancelClick = () => {
    setNewTitle(title);
    setIsEditing(false);
    onEditModeChange?.(false);
  };

  return (
    <Box className={classes.root}>
      {isEditing ? (
        <TextField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          size="small"
          className={classes.textField}
        />
      ) : (
        <Typography variant="h6" className={classes.typography}>
          {title}
        </Typography>
      )}
      <Box className={classes.iconsContainer}>
        {isEditing ? (
          <>
            <GenericIconButton
              icon={<CheckIcon />}
              title={"Save"}
              onClick={handleSaveClick}
            />
            <TwitterShareButton />
            <GenericIconButton
              icon={<CloseIcon />}
              title={"Cancel"}
              onClick={handleCancelClick}
            />
          </>
        ) : (
          <>
            <GenericIconButton
              icon={<EditIcon />}
              title={"Edit"}
              onClick={handleEditClick}
            />
            <GenericIconButton
              icon={<DeleteIcon />}
              title={"Delete"}
              onClick={onDelete}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default withStyles(styles)(EditableTitleWithActions);
