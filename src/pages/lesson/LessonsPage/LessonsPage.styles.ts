import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    headerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      width: "40vw",
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    noLessonsText: {
      marginBottom: "1rem",
    },
    unrelatedLesson: {
      backgroundColor: "#b1aaaa",
      "&:hover": {
        backgroundColor: "#a1a1a0",
      },
    },
  })
);

export default useStyles;
