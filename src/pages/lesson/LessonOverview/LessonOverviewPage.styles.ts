import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    gap: 12,
    width: "85vw",
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
    paddingLeft: 10,
  },
  summaryBox: {
    height: "100%",
    flex: 2,
    minWidth: 0,
    borderRadius: 1.5,
    p: 3,
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  relatedBox: {
    flex: 1,
    minWidth: 340,
    [theme.breakpoints.down("md")]: {
      minWidth: 0,
    },
  },
  summaryCard: {
    maxHeight: "100%",
    borderRadius: 16,
    padding: 16,
  },
}));

export default useStyles;
