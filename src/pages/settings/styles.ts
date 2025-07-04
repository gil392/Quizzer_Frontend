import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "60vw",
    },
    image: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      maxWidth: '250px',
      minWidth: '100px',
      textAlign: "center",
    },
  })
);

export default useStyles;
