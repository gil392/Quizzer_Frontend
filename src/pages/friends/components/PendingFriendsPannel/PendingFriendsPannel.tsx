import { Divider, Typography } from "@mui/material";
import clsx from "clsx";
import { isEmpty } from "ramda";
import { FunctionComponent } from "react";
import { UserWithId } from "../../../../api/user/types";
import SkeletonList from "../../../../components/SkeletonList/SkeletonList";
import { useStyles as useFriendsPageStyles } from "../../styles";
import FriendRequestItem from "./FriendRequestItem/FriendRequestItem";
import UsersSearcher from "./UsersSearcher/UsersSearcher";
import { useStyles } from "./styles";

interface PendingFriendsPannelProps {
  pendingFriends: UserWithId[];
  loading?: boolean;
  excludedIdsFromSearch: string[];
  className?: string;
}

const PendingFriendsPannel: FunctionComponent<PendingFriendsPannelProps> = (
  props
) => {
  const {
    pendingFriends,
    loading,
    excludedIdsFromSearch,
    className,
  } = props;
  const classes = useStyles();
  const friendsPageClasses = useFriendsPageStyles();

  const pendingFriendsList = isEmpty(pendingFriends) ? (
    <Typography textAlign="center" variant="h6">
      No Pending Friend Requests
    </Typography>
  ) : (
    pendingFriends.map((user, index) => (
      <FriendRequestItem
        key={index}
        className={clsx({
          [friendsPageClasses.firstItem]: index === 0,
          [friendsPageClasses.lastItem]: index === pendingFriends.length - 1,
        })}
        user={user}
      />
    ))
  );

  return (
    <div className={clsx(classes.root, className)}>
      <UsersSearcher
        excludedIds={excludedIdsFromSearch}
        textFieldLabel="Search For New Friends"
      />
      <Divider className={classes.divider} />
      <div
        className={clsx(
          classes.pendingFriendsList,
          friendsPageClasses.scroller
        )}
      >
        {loading ? (
          <SkeletonList
            numberOfItems={3}
            itemClassName={friendsPageClasses.skeletonItem}
          />
        ) : (
          pendingFriendsList
        )}
      </div>
    </div>
  );
};

export default PendingFriendsPannel;
