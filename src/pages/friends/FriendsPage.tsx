import { concat, prop, remove } from "ramda";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { getFriends, getPendingFriends } from "../../api/user/api";
import { UserWithId } from "../../api/user/types";
import { FriendRequestItemAction } from "./components/FriendRequestItem/types";
import FriendsPannel from "./components/FriendsPannel/FriendsPannel";
import PendingFriendsPannel from "./components/PendingFriendsPannel/PendingFriendsPannel";
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

  const removeFriendRequest = (
    user: UserWithId,
    requestIndex: number,
    action: FriendRequestItemAction
  ) => {
    setPendingFriends(remove(requestIndex, 1));
    if (action === "accept") {
      setFriends(concat([user]));
    }
  };

  return (
    <div className={classes.root}>
      <FriendsPannel
        friends={friends}
        loading={isFriendsLoading}
        className={classes.friendsPannel}
      />
      <PendingFriendsPannel
        pendingFriends={pendingFriends}
        exludeIdsFromSearch={exludeIdsFromSearch}
        removePendingFriend={removeFriendRequest}
        loading={isPendingFriendsLoading}
        className={classes.pendingFriendsPannel}
      />
    </div>
  );
};

export default FriendsPage;
