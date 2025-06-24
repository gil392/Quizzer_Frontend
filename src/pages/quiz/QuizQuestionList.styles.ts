import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  checkbox: {
    "& .MuiSvgIcon-root": {
      border: "2px solid transparent",
      borderRadius: "16px",
    },
  },
  checkboxGreen: {
    "& .MuiSvgIcon-root": {
      border: "2px solid green",
      borderRadius: "16px",
    },
  },
  checkboxRed: {
    "& .MuiSvgIcon-root": {
      border: "2px solid red",
      borderRadius: "16px",
    },
  },
  questionBox: {
    pageBreakInside: "avoid",
    padding: 24,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    paddingLeft: "1rem",
  },
}));

export default useStyles;
