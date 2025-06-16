import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    gap: 12,
    width: "75vw",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 16,
  },
  header: {
    paddingLeft: 10,
    marginBottom: 12,
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  title: {
    paddingLeft: 10
  },
  summaryBox: {
    height: "90%",
    flex: 2,
    minWidth: 0,
  },
  relatedBox: {
    flex: 1,
    minWidth: 340,
    [theme.breakpoints.down("md")]: {
      minWidth: 0,
    },
  },
}));

export default useStyles;
