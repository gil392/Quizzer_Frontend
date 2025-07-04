import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => {
  const lessonItemBgColor = theme.palette.background.paper;
  const lessonItemHoverBgColor = theme.palette.action.hover;

  return createStyles({
    lessonItem: {
      padding: "2px",
      margin: "1px 0",
      borderRadius: "16px",
      transition: "0.3s",
      width: "60vw",
      marginTop: "2vh",
      marginBottom: "2vh",
      backgroundColor: lessonItemBgColor,
    },
    lessonItemHover: {
      "&:hover": {
        backgroundColor: lessonItemHoverBgColor,
        cursor: "pointer",
      },
    },
    flexContainer: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      paddingLeft: "0.5vw",
    },
    editableActionsColumn: {
      marginLeft: "0.5vw",
      display: "flex",
      flexDirection: "column",
      width: "82%",
    },
    actions: { display: "flex" },
    image: {
      marginTop: "1vh",
      marginBottom: "1vh",
    },
    imageSize: {
      height: "10vh !important",
      width: "7vw !important",
    },
    successRateText: {
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
