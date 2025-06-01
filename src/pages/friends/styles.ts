import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { createScrollerStyleClass } from "../../styles/quizzer.styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      height: "100%",
    },
    friendsPannel: {
      height: "100%",
      width: "60%",
    },
    pendingFriendsPannel: {
      width: "40%",
      margin: theme.spacing(6, 0),
    },
    scroller: createScrollerStyleClass(theme),
    skeletonItem: {
      padding: "1.5em 0",
    },
    firstItem: {
      marginTop: "4px",
    },
    lastItem: {
      marginBottom: "4px",
    },
  })
);
