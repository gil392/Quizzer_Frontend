import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    pannel: {
      width: "50%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
    },
    achievements: {
      width: "66%",
      paddingBottom: '2em'
    },
  })
);

export default useStyles;
