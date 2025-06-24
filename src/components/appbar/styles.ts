import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "flex-end",
    },
    avatar: {
      cursor: "pointer",
      margin: theme.spacing(0, 2),
    },
    notifications: {},
    badge: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    },
    menu: {
      marginTop: theme.spacing(1),
    },
  })
);

export default useStyles;
