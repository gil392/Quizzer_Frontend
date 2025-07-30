import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      textAlign: "center",
      width: "100%",
      borderRadius: 2,
      maxWidth: '45%',
      minWidth: '20%',
      height: 'auto',
    },
    title: {
      color: theme.palette.primary.main,
      gutterBottom: "1rem",
      fontWeight: 600,
    },
    message: {
      color: theme.palette.text.secondary,
      fontWeight: 300,
    },
  })
);
