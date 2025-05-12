import clsx from "clsx";
import { FunctionComponent, useEffect, useState } from "react";
import { getFriends, getFriendsRequest } from "../../api/user/api";
import { UserWithId } from "../../api/user/types";
import FriendItem from "./components/FriendItem/FriendItem";
import FriendRequestItem from "./components/FriendRequestItem/FriendRequestItem";
import UsersSearcher from "./components/UsersSearcher/UsersSearcher";
import { useStyles } from "./styles";

const FriendsPage: FunctionComponent = () => {
  const classes = useStyles();
  const [friends, setFriends] = useState<UserWithId[]>([]);
  const [pendingFriendsRequest, setPendingFriendsRequest] = useState<
    UserWithId[]
  >([]);

  useEffect(() => {
    const { request: fetchFriends, abort: abortFetchFriends } = getFriends();
    const {
      request: fetchPendingFriendsRequest,
      abort: abortFetchPendingFriendsRequest,
    } = getFriendsRequest();

    fetchFriends.then(({ data }) => setFriends(data));
    fetchPendingFriendsRequest.then(({ data }) =>
      setPendingFriendsRequest(data)
    );

    return () => {
      abortFetchFriends();
      abortFetchPendingFriendsRequest();
    };
  }, []);

  const friendsList = friends.map((user, index) => (
    <FriendItem
      key={index}
      className={clsx({
        [classes.firstItem]: index === 0,
        [classes.lastItem]: index === friends.length - 1,
      })}
      user={user}
    />
  ));

  const pendingFriendsList = pendingFriendsRequest.map((user, index) => (
    <FriendRequestItem
      key={index}
      className={clsx({
        [classes.firstItem]: index === 0,
        [classes.lastItem]: index === friends.length - 1,
      })}
      user={user}
    />
  ));

  return (
    <div className={classes.root}>
      <div className={classes.friendsPannel}>
        <span className={clsx(classes.friendsList, classes.scroller)}>
          {friendsList}
        </span>
      </div>
      <div className={classes.pendingFriendsPannel}>
        <UsersSearcher />
        <div className={clsx(classes.pendingFriendsList, classes.scroller)}>
          {pendingFriendsList}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
