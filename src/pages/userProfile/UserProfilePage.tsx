import { FunctionComponent } from "react";
import Achievments from "./components/Achievments/Achievments";
import UserProfileDetails from "./components/UserProfileDetails/UserProfileDetails";
import useStyles from "./styles";

const UserProfilePage: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <section className={classes.pannel}>
        <Achievments className={classes.achievements} />
      </section>
      <section className={classes.pannel}>
        <UserProfileDetails />
      </section>
    </div>
  );
};

export default UserProfilePage;
