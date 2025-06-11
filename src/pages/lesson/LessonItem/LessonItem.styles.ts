import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => {
  const lessonItemBgColor = theme.palette.primary.dark;
  const lessonItemHoverBgColor = theme.palette.primary.light;

  return createStyles({
    lessonItem: {
      padding: "2px",
      margin: "1px 0",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "2px",
      transition: "0.3s",
      width: "60vw",
      marginTop: "2vh",
      marginBottom: "2vh",
      backgroundColor: lessonItemBgColor,
    },
    lessonItemHover: {
      "&:hover": {
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
        backgroundColor: lessonItemHoverBgColor,
        cursor: "pointer",
      },
    },
    flexContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: "0.5vw",
    },
    successRateText: {
      marginTop: "0.5rem",
      paddingLeft: "0.5vw",
      textAlign: "left",
    },
    unrelatedLesson: {
      backgroundColor: "#b1aaaa",
      "&:hover": {
        backgroundColor: "#a1a1a0",
      },
    },
  });
});

export default useStyles;
