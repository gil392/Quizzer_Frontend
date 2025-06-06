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
      width: "40vw",
      marginTop: "1rem",
      marginBottom: "1rem",
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
    noLessonsText: {
      marginBottom: "1rem",
    },
  })
);

export default useStyles;
