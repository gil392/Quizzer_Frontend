import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  timer: {
    display: "flex",
    alignItems: "center",
    px: 2,
    py: 1,
    borderRadius: 3,
    minWidth: 120,
    maxWidth: 200,
  },
  enoughTime: {
    bgcolor: "background.paper",
    color: "primary.main",
  },
  runningOutOfTime: {
    bgcolor: "error.lighter",
    color: "error.main",
  },
  icon: { fontSize: 24, marginRight: 8 },
  timeDisplay: {
    "&.MuiTypography-root": {
      fontWeight: 700,
      color: "inherit",
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "0.08em",
    },
  },
}));

export default useStyles;
