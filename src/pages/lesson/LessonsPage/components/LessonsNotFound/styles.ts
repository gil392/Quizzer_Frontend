import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      borderRadius: 4,
      textAlign: "center",
      boxShadow: "0px 8px 30px",
      backgroundColor: "#fffdf7",
    },
    container: {
      width: "70%",
      borderRadius: 2,
    },
  })
);
