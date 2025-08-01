import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

interface Friend {
  _id: string;
  username: string;
  wasSentTo: boolean;
}

interface ShareDialogProps {
  open: boolean;
  dialogType: string;
  onClose: () => void;
  friends: Friend[];
  onShare: (selected: string[]) => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({
  open,
  dialogType,
  onClose,
  friends,
  onShare,
}) => {
  const [selected, setSelected] = useState<string[]>(
    friends.filter((friend) => friend.wasSentTo).map((friend) => friend._id)
  );
  const theme = useTheme();

  const handleToggle = (id: string) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleShare = () => {
    onShare(selected);
    setSelected([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share {dialogType} With Friends</DialogTitle>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <List>
          {friends.map((friend) => (
            <ListItem key={friend._id} disablePadding>
              <ListItemButton
                onClick={(e) => {
                  e.stopPropagation();
                  !friend.wasSentTo && handleToggle(friend._id);
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selected.includes(friend._id)}
                    disabled={friend.wasSentTo}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={friend.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions onClick={(e) => e.stopPropagation()}>
        <Button
          color="primary"
          onClick={onClose}
          sx={{ color: theme.palette.text.secondary }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleShare}
          disabled={selected.length === 0}
          variant="contained"
        >
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareDialog;
