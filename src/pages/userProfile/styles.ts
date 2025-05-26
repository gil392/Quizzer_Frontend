import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "80%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    editUsername: {
      marginTop: "8px",
    },
    profileImageDiv: {
      position: "relative",
      display: "inline-block",
    },
    userTextProperty: {
      width: "100%",
      marginTop: "1em",
      textAlign: "center",
    },
    imageEditIcon: {
      bottom: 0,
      right: 0,
    },
  })
);

export default useStyles;
