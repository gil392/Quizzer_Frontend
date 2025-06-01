import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "33%",
      //   flexGrow: 1,
      height: "65%",
      display: "flex",
      flexDirection: "column",
    },
    achievementsList: {
      flexGrow: 1,
      overflowY: "auto",
      border: "solid 2px",
      borderColor: theme.palette.grey[200],
      borderRadius: "8px",
    },
    scroller: {
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        border: "2px solid transparent",
        backgroundClip: "content-box",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
    },
    skeletonItem: {
      "&.MuiSkeleton-root": {
        height: "4em",
      },
    },
  })
);
