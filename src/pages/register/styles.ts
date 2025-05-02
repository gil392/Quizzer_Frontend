import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    formSection: { marginTop: "0.5em", width: "33%" },
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
  })
);

export default useStyles;
