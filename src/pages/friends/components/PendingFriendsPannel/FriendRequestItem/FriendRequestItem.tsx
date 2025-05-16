import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import { useStyles } from "./styles";
import { FriendRequestItemAction } from "./types";
import { UserWithId } from "../../../../../api/user/types";
import { acceptFriendRequest, declineFriendRequest } from "../../../../../api/user/api";
import FriendItem from "../../FriendsPannel/FriendItem/FriendItem";

interface FriendRequestItemProps {
  user: UserWithId;
  className?: string;
  onAction: (action: FriendRequestItemAction) => void;
}

const FriendRequestItem: FunctionComponent<FriendRequestItemProps> = (
  props
) => {
  const { user, className, onAction } = props;
  const classes = useStyles();

  const onAcceptClick = () => {
    acceptFriendRequest(user._id);
    onAction("accept");
  };

  const onDeclineClick = () => {
    declineFriendRequest(user._id);
    onAction("decline");
  };

  return (
    <div className={clsx(className, classes.root)}>
      <FriendItem user={user} />

      <div className={classes.actions}>
        <IconButton size="small" onClick={onAcceptClick}>
          <CheckCircleOutline
            className={classes.acceptButton}
            fontSize="inherit"
          />
        </IconButton>
        <IconButton size="small" onClick={onDeclineClick}>
          <HighlightOff className={classes.declienButton} fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
};

export default FriendRequestItem;
