import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      padding: "0.5em",
      margin: "1em 0",
      boxSizing: "border-box",
      width: "100%",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "2px",
      transition: "0.3s",
      backgroundColor: "#fae1e43b",
    },
    leftContent: {
      display: "flex",
      alignItems: "center",
      flex: 1, 
    },
    avatarBox: {
      padding: theme.spacing(0, 2, 0, 0),
    },
    detailsBox: {
      flex: 1, 
    },
    statisticText: {
      "&.MuiTypography-root": {
        fontSize: "0.7em",
      },
    },
    rightIcons: {
      display: "flex",
      alignItems: "center",
    },
    viewProfileButton: {
      marginRight: theme.spacing(1), 
    },
    deleteButton: {
      marginLeft: theme.spacing(1),
    },
    modalText: {
      fontSize: "0.875rem !important", 
    },
    
  })
);