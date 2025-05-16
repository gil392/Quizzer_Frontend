import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    oprionAvatar: {
      width: "1.5em",
      height: "1.5em",
      marginRight: theme.spacing(1),
    },
    optionEmail: {
      marginLeft: theme.spacing(1),
    },
  })
);
