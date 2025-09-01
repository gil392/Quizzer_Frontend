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
      position: "relative",
    },
    rewardSection: {
      padding: "0 12px 0 0",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5em",
    },
    rewardInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.2em",
    },
    rewardIcon: {
      width: "5em",
      height: "5em",
      borderRadius: "16px",
      transition: "0.3s ease",
      "&:hover": {
        filter: "grayscale(100%)",
      },
    },
    iconWrapper: {
      position: "relative",
      display: "inline-block",
    },
    iconOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "5em",
      height: "5em",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: "16px",
      opacity: 0,
      transition: "opacity 0.3s ease",
      "&:hover": {
        opacity: 1,
      },
    },
    overlayText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: "0.8em",
      textAlign: "center",
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
        borderRadius: "16px",
      },
    },
    detailsSection: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    detailsHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      width: "100%",
      marginBottom: "0.5em",
    },
    shareButton: {
      alignSelf: "flex-start",
      marginLeft: "8px",
    },
  })
);
