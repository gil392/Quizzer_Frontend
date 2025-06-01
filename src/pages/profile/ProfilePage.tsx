import { FunctionComponent } from "react";
import Achievments from "./components/Achievments/Achievments";
import { useStyles } from "./styles";

const ProfilePage: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Achievments />
    </div>
  );
};

export default ProfilePage;
