import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

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
    scroller: {
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.2)"
            : "rgba(255, 255, 255, 0.8)",
        borderRadius: "4px",
        border: "2px solid transparent",
        backgroundClip: "content-box",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.4)"
            : "rgba(255, 255, 255, 0.6)",
      },
    },
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
