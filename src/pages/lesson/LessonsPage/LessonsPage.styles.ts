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
    noLessonsText: {
      marginBottom: "1rem",
    },
  })
);

export default useStyles;
