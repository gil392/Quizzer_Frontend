import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
    },
    actions: {
      display: "flex",
      padding: theme.spacing(0.5, 1),
      position: "absolute",
      right: 0,
      top: 0,
    },
    acceptButton: {
      color: "green",
    },
    declienButton: {
      color: "red",
    },
  })
);
