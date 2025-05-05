import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
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
    firstItem: {
      marginTop: "4px",
    },
    lastItem: {
      marginBottom: "4px",
    },
    pendingFriendsPannel: {
      width: '40%'
    },
    
  })
);
