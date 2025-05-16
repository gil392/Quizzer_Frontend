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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    friendsList: {
      height: "100%",
      overflowY: "auto",
      width: "60%",
      padding: "0 8px",
    },
    firstItem: {
      marginTop: "4px",
    },
    lastItem: {
      marginBottom: "4px",
    },
    pendingFriendsPannel: {
      width: "40%",
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(6, 0),
    },
    pendingFriendsList: {
      flexGrow: 1,
      overflowY: "auto",
      marginTop: theme.spacing(1),
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
      padding: "1.5em 0",
    },
    emptyFriendsListSpan: {
      display: "flex",
      height: "80%",
      alignItems: "center",
    },
    divider: {
      "&.MuiDivider-root": {
        marginTop: theme.spacing(2),
      },
    },
  })
);
