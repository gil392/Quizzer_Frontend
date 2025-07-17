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
      padding: theme.spacing(4),
    },
    noPendingFriendsImage: {
      maxWidth: "400px",
      height: "auto",
      marginTop: theme.spacing(1),
      display: "block",
      mx: "auto",
    },
  })
);
