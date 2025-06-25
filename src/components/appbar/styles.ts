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
    badge: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      fontWeight: 600,
      fontSize: "0.75rem !important",
      minWidth: "18px !important",
      height: "18px !important",
      borderRadius: "16px !important",
      boxShadow: `${theme.shadows[1]} !important`,
    },
    notificaion: {
      fontSize: 28,
      color: (props: { unreadCount?: number }) =>
        props.unreadCount && props.unreadCount > 0
          ? theme.palette.primary.main
          : theme.palette.text.secondary,
      transition: "color 0.2s",
    },
    menu: {
      marginTop: theme.spacing(1),
    },
  })
);

export default useStyles;
