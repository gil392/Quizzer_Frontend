import { FunctionComponent, useState } from "react";
import Achievments from "./components/Achievments/Achievments";
import UserProfileDetails from "./components/UserProfileDetails/UserProfileDetails";
import useStyles from "./styles";

const UserProfilePage: FunctionComponent = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={classes.root}>
      <section className={classes.pannel}>
        <Achievments className={classes.achievements} isEditing={isEditing} />
      </section>
      <section className={classes.pannel}>
        <UserProfileDetails setIsEditing={setIsEditing} isEditing={isEditing} />
      </section>
    </div>
  );
};

export default UserProfilePage;
