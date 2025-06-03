import { Avatar, Typography } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import { UserWithId } from "../../../../../api/user/types";
import { useStyles } from "./styles";

interface FriendItemProps {
  user: UserWithId;
  className?: string;
}

const FriendItem: FunctionComponent<FriendItemProps> = (props) => {
  const { user, className } = props;
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      <div className={classes.avatarBox}>
        <Avatar
          src={user.picture ?? "error"}
          alt={user.username.toUpperCase()}
        />
      </div>
      <div>
        <Typography>{user.username}</Typography>
        <Typography className={classes.statisticText} color="textSecondary">
          Streak: {user.streak}d
        </Typography>
        <Typography className={classes.statisticText} color="textSecondary">
          XP: {user.xp}
        </Typography>
      </div>
    </div>
  );
};

export default FriendItem;
