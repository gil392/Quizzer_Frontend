import { Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
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
        borderRadius: "16px",
      },
      width: "7rem",
    },
    lessonsNotFoundContainer: {
      width: "55vw",
    },
    createLessonButton: {
      color: theme.palette.primary.main + " !important",
    },
  })
);

export default useStyles;
