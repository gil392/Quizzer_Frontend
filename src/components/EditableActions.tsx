import { useState } from "react";
import { TextField, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { GenericIconButton } from "./GenericIconButton";

type EditableActionsProps = {
  title: string;
  onSave: (newTitle: string) => void;
  onDelete: () => void;
  onEditModeChange?: (isEditing: boolean) => void;
};

const EditableActions = ({
  title,
  onSave,
  onDelete,
  onEditModeChange,
}: EditableActionsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditing(true);
    onEditModeChange?.(true);
  };

  const handleSaveClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onSave(newTitle);
    setIsEditing(false);
    onEditModeChange?.(false);
  };

  const handleCancelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setNewTitle(title);
    setIsEditing(false);
    onEditModeChange?.(false);
  };

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexGrow: 1,
      }}
    >
      {isEditing ? (
        <TextField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          size="small"
          sx={{ marginRight: "1rem", flexGrow: 1 }}
        />
      ) : (
        <Typography
          variant="h6"
          sx={{
            paddingLeft: "0.5vw",
          }}
        >
          {title}
        </Typography>
      )}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isEditing ? (
          <>
            <GenericIconButton
              icon={<CheckIcon />}
              title={"Save"}
              onClick={handleSaveClick}
            />
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
              onClick={handleDeleteClick}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default EditableActions;
