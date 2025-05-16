import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
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
    emptyFriendsListSpan: {
      display: "flex",
      height: "80%",
      alignItems: "center",
    },
  })
);
