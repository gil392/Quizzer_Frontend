import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "0.5em",
      margin: "1em 0",
      boxSizing: "border-box",
      display: "flex",
      width: "100%",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "2px",
      transition: "0.3s",
      backgroundColor: "#fae1e43b",
    },
    avatarBox: {
      padding: theme.spacing(0, 2, 0, 0),
    },
    statisticText: {
      "&.MuiTypography-root": {
        fontSize: "0.7em",
      },
    },
  })
);
