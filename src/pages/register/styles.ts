import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "stretch",
      textAlign: "center",
      position: "relative",
      margin: 0,
    },
    left: {
      flex: "0 1 40%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      background: theme.palette.background.paper,
      position: "relative",

    },
    right: {
      flex: "0 1 60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      margin: "2rem 0",
    },
    image: {
      maxWidth: "85%",
      height: "auto",
      objectFit: "contain",
    },
    imageWrapper: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    logo: {
      maxWidth: "25%",
      height: "auto",
      alignSelf: "center",
      marginTop: theme.spacing(2),
    },
    displayModeSwitch: {
      position: "absolute",
      top: 4,
      right: 8,
      zIndex: 10,
    },
    formSection: { width: "70%" },
    textField: {
      "&.MuiTextField-root": {
        margin: "0.5em 0",
      },
    },
    submitButton: {
      "&.MuiButton-root": {
        margin: "1em 0",
      },
    },
    link: {
      cursor: "pointer",
    },
    orText: {
      marginTop: "1em !important", 
    }
  })
);

export default useStyles;