import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      padding: "0.5em 1em",
      boxSizing: "border-box",
      overflow: "hidden",
      wordBreak: "normal",
    },
    rewardSection: {
      padding: "0 12px 0 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    rewardIcon: {
      width: "4em",
      height: "5em",
      borderRadius: "16px",
    },
    rewardXp: {
      fontWeight: "bold",
      fontSize: "0.8em",
    },
    progress: {
      width: "100%",
    },
    progressLabel: {
      width: "100%",
      textAlign: "end",
    },
    progressBarRoot: {
      "&.MuiLinearProgress-root": {
        backgroundColor: "#e5e5e5",
        height: "0.6em",
        borderRadius: "4px",
      },
    },
    progressBar: {
      backgroundColor: "#ffc800 !important",
    },
    detailsSection: {
      width: "100%",
      paddingBottom: "0.2em",
    },
  })
);
