import clsx from "clsx";
import { FunctionComponent, useEffect, useState } from "react";
import { User } from "../../api/user/types";
import FriendItem from "./components/FriendItem/FriendItem";
import { useStyles } from "./styles";

const fetchFriends = (): Promise<{ data: User[] }> =>
  Promise.resolve({
    data: [
      {
        email: "tomercpc01@gmail.com",
        username: "Lilia Hazan",
        statistics: {
          streak: 5,
          xp: 10,
        },
      },
      {
        email: "tomercpc01@gmail.com",
        username: "Or Malawi",
        statistics: {
          streak: 5,
          xp: 12345,
        },
      },
    ],
  });
const fetchPendingFriendsRequest = (): Promise<{ data: User[] }> =>
  Promise.resolve({ data: [] });

const FriendsPage: FunctionComponent = () => {
  const classes = useStyles();
  const [friends, setFriends] = useState<User[]>([]);
  const [pendingFriendsRequest, setPendingFriendsRequest] = useState<User[]>(
    []
  );

  useEffect(() => {
    fetchFriends().then(({ data }) => setFriends(data));
    fetchPendingFriendsRequest().then(({ data }) =>
      setPendingFriendsRequest(data)
    );
  }, []);

  const friendsList = friends.map((user, index) => (
    <FriendItem
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
        <span className={classes.friendsList}>{friendsList}</span>
      </div>
      <div className={classes.pendingFriendsPannel}></div>
    </div>
  );
};

export default FriendsPage;
