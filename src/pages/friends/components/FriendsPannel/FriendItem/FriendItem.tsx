import {
  Avatar,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import clsx from "clsx";
import { FunctionComponent, useState } from "react";
import { UserWithId } from "../../../../../api/user/types";
import { useStyles } from "./styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { deleteFriend } from "../../../../../api/user/api";
import { toast } from "sonner";

interface FriendItemProps {
  user: UserWithId;
  className?: string;
  isPending?: boolean;
}

const FriendItem: FunctionComponent<FriendItemProps> = (props) => {
  const { user, className, isPending } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleViewProfile = () => {
    navigate(`/profile/${user._id}`);
  };

  const handleDeleteFriend = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDeleteFriend = async () => {
    try {
      await deleteFriend(user._id);
    } catch {
      toast.error("Failed to delete friend. Please try again later.");
    }

    setDeleteDialogOpen(false);
  };

  const cancelDeleteFriend = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.leftContent}>
        <div className={classes.avatarBox}>
          <Avatar
            src={user.picture ?? "error"}
            alt={user.username.toUpperCase()}
          />
        </div>
        <div className={classes.detailsBox}>
          <Typography>{user.username}</Typography>
          <Typography className={classes.statisticText} color="textSecondary">
            Streak: {user.streak} days
          </Typography>
          <Typography className={classes.statisticText} color="textSecondary">
            XP: {user.xp}
          </Typography>
        </div>
      </div>
      {!isPending && (
        <div className={classes.rightIcons}>
          <Tooltip title="View Profile" arrow>
            <IconButton
              className={classes.viewProfileButton}
              onClick={handleViewProfile}
              size="small"
            >
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Friend" arrow>
            <IconButton
              className={classes.deleteButton}
              onClick={handleDeleteFriend}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <Dialog open={deleteDialogOpen} onClose={cancelDeleteFriend}>
        <DialogContent>
          <DialogContentText className={classes.modalText}>
            Are you sure you want to delete {user.username} from your friends
            list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteFriend} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteFriend} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FriendItem;
