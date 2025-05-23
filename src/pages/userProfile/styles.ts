import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
    },
    profilePannel: {
      width: "50%",
      height: "100%",
    },
  })
);

export default useStyles;
