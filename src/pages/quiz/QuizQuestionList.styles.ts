import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  checkbox: {
    "& .MuiSvgIcon-root": {
      border: "2px solid transparent",
      borderRadius: "4px",
    },
  },
  checkboxGreen: {
    "& .MuiSvgIcon-root": {
      border: "2px solid green",
      borderRadius: "4px",
    },
  },
  checkboxRed: {
    "& .MuiSvgIcon-root": {
      border: "2px solid red",
      borderRadius: "4px",
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
