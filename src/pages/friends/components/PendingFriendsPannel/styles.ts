import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    pendingFriendsList: {
      flexGrow: 1,
      overflowY: "auto",
      marginTop: theme.spacing(1),
    },
    divider: {
      "&.MuiDivider-root": {
        marginTop: theme.spacing(2),
      },
    },
    noPendingFriendsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    noPendingFriendsPage: {
      width: "99%",
      padding: 16,
      textAlign: "center",
      borderRadius: 12,
    },
  })
);
