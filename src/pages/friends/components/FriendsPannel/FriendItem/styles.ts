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
      borderRadius: "16px",
      transition: "0.3s",
      backgroundColor: theme.palette.background.paper,
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
      color: theme.palette.text.primary,
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
      color: theme.palette.primary.main + " !important",
    },
    deleteButton: {
      marginLeft: theme.spacing(1),
    },
    modalText: {
      fontSize: "0.875rem !important",
    },

  })
);