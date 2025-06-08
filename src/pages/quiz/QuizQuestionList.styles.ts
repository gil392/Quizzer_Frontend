import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
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
    backgroundColor: "#f5f5f5",
  },
}));

export default useStyles;
