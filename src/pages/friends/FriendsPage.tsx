import { Divider, Typography } from "@mui/material";
import clsx from "clsx";
import { concat, isEmpty, prop, remove } from "ramda";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { getFriends, getPendingFriends } from "../../api/user/api";
import { UserWithId } from "../../api/user/types";
import SkeletonList from "../../components/SkeletonList/SkeletonList";
import FriendItem from "./components/FriendItem/FriendItem";
import FriendRequestItem from "./components/FriendRequestItem/FriendRequestItem";
import { FriendRequestItemAction } from "./components/FriendRequestItem/types";
import UsersSearcher from "./components/UsersSearcher/UsersSearcher";
import { useStyles } from "./styles";

const FriendsPage: FunctionComponent = () => {
  const classes = useStyles();
  const [exludeIdsFromSearch, setExludeIdsFromSearch] = useState<string[]>([]);
  const [friends, setFriends] = useState<UserWithId[]>([]);
  const [pendingFriends, setPendingFriends] = useState<UserWithId[]>([]);
  const [isFriendsLoading, setIsFriendsLoading] = useState(false);
  const [isPendingFriendsLoading, setIsPendingFriendsLoading] = useState(false);

  const fetchFriends = useCallback(async (abortController: AbortController) => {
    setIsFriendsLoading(true);
    const { data: friends } = await getFriends(abortController);
    setFriends(friends);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setIsFriendsLoading(false);
  }, []);

  const fetchPendingFriends = useCallback(
    async (abortController: AbortController) => {
      setIsPendingFriendsLoading(true);
      const { data: pendingFriends } = await getPendingFriends(abortController);
      setPendingFriends(pendingFriends);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setIsPendingFriendsLoading(false);
    },

    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    fetchFriends(abortController);
    fetchPendingFriends(abortController);

    return () => abortController.abort();
  }, []);

  useEffect(() => {
    setExludeIdsFromSearch(
      concat(friends.map(prop("_id")), pendingFriends.map(prop("_id")))
    );
  }, [friends, pendingFriends]);

  const friendsList = true ? (
    <span className={classes.emptyFriendsListSpan}>
      <Typography textAlign="center" variant="h4">
        Seems you new Here, try searching new friends
      </Typography>
    </span>
  ) : (
    friends.map((user, index) => (
      <FriendItem
        key={index}
        className={clsx({
          [classes.firstItem]: index === 0,
          [classes.lastItem]: index === friends.length - 1,
        })}
        user={user}
      />
    ))
  );

  const removeFriendRequest =
    (user: UserWithId, requestIndex: number) =>
    (action: FriendRequestItemAction) => {
      setPendingFriends(remove(requestIndex, 1));
      if (action === "accept") {
        setFriends(concat([user]));
      }
    };

  const pendingFriendsList = isEmpty(pendingFriends) ? (
    <Typography textAlign="center" variant="h6">
      No Pending Friend Requests
    </Typography>
  ) : (
    pendingFriends.map((user, index) => (
      <FriendRequestItem
        key={index}
        className={clsx({
          [classes.firstItem]: index === 0,
          [classes.lastItem]: index === friends.length - 1,
        })}
        user={user}
        onAction={removeFriendRequest(user, index)}
      />
    ))
  );

  return (
    <div className={classes.root}>
      <div className={classes.friendsPannel}>
        <span className={clsx(classes.friendsList, classes.scroller)}>
          {isFriendsLoading ? (
            <SkeletonList
              numberOfItems={6}
              itemClassName={classes.skeletonItem}
            />
          ) : (
            friendsList
          )}
        </span>
      </div>
      <div className={classes.pendingFriendsPannel}>
        <UsersSearcher
          exludeIds={exludeIdsFromSearch}
          textFieldLabel="Search For New Friends"
        />
        <Divider className={classes.divider} />
        <div className={clsx(classes.pendingFriendsList, classes.scroller)}>
          {isPendingFriendsLoading ? (
            <SkeletonList
              numberOfItems={3}
              itemClassName={classes.skeletonItem}
            />
          ) : (
            pendingFriendsList
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
