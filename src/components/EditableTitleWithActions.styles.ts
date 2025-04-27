import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexGrow: 1,
      overflow: "hidden",
    },
    textField: {
      marginRight: "1rem",
      flexGrow: 1,
    },
    typography: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      marginRight: "1rem",
    },
    iconsContainer: {
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
      gap: "0.5rem",
    },
  })
);

export default useStyles;
