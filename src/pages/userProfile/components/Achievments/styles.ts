import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { createScrollerStyleClass } from "../../../../styles/quizzer.styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    achievementsList: {
      flexGrow: 1,
      overflowY: "auto",
      border: "solid 2px",
      borderColor: theme.palette.grey[200],
      borderRadius: "8px",
      width: "40em"
    },
    scroller: createScrollerStyleClass(theme),
    skeletonItem: {
      "&.MuiSkeleton-root": {
        height: "4em",
      },
    },
  })
);
