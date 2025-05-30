import { concat, prop, remove } from "ramda";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { getFriends, getPendingFriends } from "../../api/user/api";
import { UserWithId } from "../../api/user/types";
import FriendsPannel from "./components/FriendsPannel/FriendsPannel";
import { FriendRequestItemAction } from "./components/PendingFriendsPannel/FriendRequestItem/types";
import PendingFriendsPannel from "./components/PendingFriendsPannel/PendingFriendsPannel";
import { useStyles } from "./styles";

const FriendsPage: FunctionComponent = () => {
  const classes = useStyles();
  const [excludedIdsFromSearch, setExcludedIdsFromSearch] = useState<string[]>(
    []
  );
  const [friends, setFriends] = useState<UserWithId[]>([]);
  const [pendingFriends, setPendingFriends] = useState<UserWithId[]>([]);
  const [isFriendsLoading, setIsFriendsLoading] = useState(false);
  const [isPendingFriendsLoading, setIsPendingFriendsLoading] = useState(false);

  const fetchFriends = useCallback(async (abortController: AbortController) => {
    setIsFriendsLoading(true);
    const { data: friends } = await getFriends(abortController);
    setFriends(friends);
    setIsFriendsLoading(false);
  }, []);

  const fetchPendingFriends = useCallback(
    async (abortController: AbortController) => {
      setIsPendingFriendsLoading(true);
      const { data: pendingFriends } = await getPendingFriends(abortController);
      setPendingFriends(pendingFriends);
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
    setExcludedIdsFromSearch(
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
        excludedIdsFromSearch={excludedIdsFromSearch}
        removePendingFriend={removeFriendRequest}
        loading={isPendingFriendsLoading}
        className={classes.pendingFriendsPannel}
      />
    </div>
  );
};

export default FriendsPage;
