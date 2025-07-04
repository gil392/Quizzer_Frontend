import { concat, prop } from "ramda";
import { FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import FriendsPannel from "./components/FriendsPannel/FriendsPannel";
import PendingFriendsPannel from "./components/PendingFriendsPannel/PendingFriendsPannel";
import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchFriends, fetchPendingFriends } from "../../store/userReducer";

const FriendsPage: FunctionComponent = () => {
  const classes = useStyles();
  const { loggedUser } = useSelector((state: RootState) => state.user);
  const { pendingFriends, friends } = useSelector(
    (state: RootState) => state.user
  );
  const excludedIdsFromSearch = useMemo<string[]>(
    () => 
      [loggedUser?._id || "",
      ...concat(friends.map(prop("_id")), pendingFriends.map(prop("_id"))),
    ], [loggedUser, friends, pendingFriends]
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isFriendsLoading, setIsFriendsLoading] = useState(false);
  const [isPendingFriendsLoading, setIsPendingFriendsLoading] = useState(false);

  const getFriends = useCallback(async (abortController: AbortController) => {
    setIsFriendsLoading(true);
    await dispatch(fetchFriends(abortController)).unwrap();
    setIsFriendsLoading(false);
  }, []);

  const getPendingFriends = useCallback(
    async (abortController: AbortController) => {
      setIsPendingFriendsLoading(true);
      await dispatch(fetchPendingFriends(abortController)).unwrap();
      setIsPendingFriendsLoading(false);
    },
    []
  );

  useEffect(() => {
    const abortController = new AbortController();
    getFriends(abortController);
    getPendingFriends(abortController);

    return () => abortController.abort();
  }, []);

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
        loading={isPendingFriendsLoading}
        className={classes.pendingFriendsPannel}
      />
    </div>
  );
};

export default FriendsPage;
