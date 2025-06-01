import { FunctionComponent } from "react";
import Achievments from "./components/Achievments/Achievments";

const ProfilePage: FunctionComponent = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Achievments />
    </div>
  );
};

export default ProfilePage;
