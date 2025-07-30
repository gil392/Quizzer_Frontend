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
      maxWidth: '25%',
      minWidth: '10%',
      textAlign: "center",
    },
  })
);

export default useStyles;
