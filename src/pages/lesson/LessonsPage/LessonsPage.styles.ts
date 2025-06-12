import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      width: "60vw",
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    headerActionsContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      width: "60vw",
      marginTop: "1rem",
      marginBottom: "2rem",
    },
    sortContainer: {
      display: "flex",
      alignItems: "center",
    },
    sortOption: {
      "&.MuiSelect-root": {
        borderRadius: "10px",
      },
      width: "7rem",
    },
    lessonsNotFoundContainer: {
      width: "55vw",
    },
  })
);

export default useStyles;
