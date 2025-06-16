import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import { useStyles } from "./styles";
import { UserWithId } from "../../../../../api/user/types";
import FriendItem from "../../FriendsPannel/FriendItem/FriendItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store/store";
import { acceptFriend, declineFriend } from "../../../../../store/userReducer";

interface FriendRequestItemProps {
  user: UserWithId;
  className?: string;
}

const FriendRequestItem: FunctionComponent<FriendRequestItemProps> = (
  props
) => {
  const { user, className } = props;
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const onAcceptClick = async () => {
    await dispatch(acceptFriend(user._id));
  };

  const onDeclineClick = async () => {
    await dispatch(declineFriend(user._id));
  };

  return (
    <div className={clsx(className, classes.root)}>
      <FriendItem user={user} isPending={true} />

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
