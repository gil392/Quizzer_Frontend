import { makeStyles } from "@mui/styles";
import { alpha, Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  checkbox: {
    "& .MuiSvgIcon-root": {
      border: "2px solid transparent",
      borderRadius: "16px",
    },
  },
  checkboxGreen: {
    "& .MuiSvgIcon-root": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  checkboxRed: {
    "& .MuiSvgIcon-root": {
      border: `1px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
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
