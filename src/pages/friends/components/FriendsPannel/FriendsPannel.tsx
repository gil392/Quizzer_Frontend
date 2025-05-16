import { Typography } from "@mui/material";
import clsx from "clsx";
import { isEmpty } from "ramda";
import { FunctionComponent } from "react";
import { UserWithId } from "../../../../api/user/types";
import SkeletonList from "../../../../components/SkeletonList/SkeletonList";
import { useStyles as useFriendsPageStyles } from "../../styles";
import FriendItem from "./FriendItem/FriendItem";
import { useStyles } from "./styles";

interface FriendsPannelProps {
  friends: UserWithId[];
  loading?: boolean;
  className?: string;
}

const FriendsPannel: FunctionComponent<FriendsPannelProps> = (props) => {
  const { friends, loading, className } = props;
  const classes = useStyles();
  const friendsPageClasses = useFriendsPageStyles();

  const friendsList = isEmpty(friends) ? (
    <span className={classes.emptyFriendsListSpan}>
      <Typography textAlign="center" variant="h4">
        Seems you new Here
        <br />
        Try searching new friends
      </Typography>
    </span>
  ) : (
    friends.map((user, index) => (
      <FriendItem
        key={index}
        className={clsx({
          [friendsPageClasses.firstItem]: index === 0,
          [friendsPageClasses.lastItem]: index === friends.length - 1,
        })}
        user={user}
      />
    ))
  );

  return (
    <div className={clsx(classes.root, className)}>
      <span className={clsx(classes.friendsList, friendsPageClasses.scroller)}>
        {loading ? (
          <SkeletonList
            numberOfItems={6}
            itemClassName={friendsPageClasses.skeletonItem}
          />
        ) : (
          friendsList
        )}
      </span>
    </div>
  );
};

export default FriendsPannel;
