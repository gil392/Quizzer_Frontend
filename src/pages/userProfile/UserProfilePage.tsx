import { FunctionComponent, useEffect, useState } from "react";
import UserProfile from "./components/UserProfile/UserProfile";
import useStyles from "./styles";
import { User } from "../../api/user/types";
import { getLoggedUser } from "../../api/user/api";
import { Typography } from "@mui/material";

const UserProfilePage: FunctionComponent = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getLoggedUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <div className={classes.root}>
      <section className={classes.profilePannel}>
        <UserProfile user={user} setUser={setUser} />
      </section>
    </div>
  );
};

export default UserProfilePage;
