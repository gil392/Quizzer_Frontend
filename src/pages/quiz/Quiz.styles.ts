import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "75vw",
    margin: "auto",
    padding: 16,
  },
  quizBox: {
    maxWidth: "75vw",
    height: "85vh",
    overflowY: "auto",
    backgroundColor: theme.palette.background.default,
    padding: 16,
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
    },
  },
  resultBox: {
    textAlign: "center",
    marginBottom: 24,
    padding: 16,
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  card: {
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    borderRadius: 8,
    padding: 16,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    padding: 16,
    gap: 16,
  },
  settingsTitle: {
    display: "flex",
    justifyContent: "center",

    "&.MuiTypography-root": {
      marginBottom: "2rem",
    },
  },
  submitSettingsButton: {
    width: "100%",
    height: "3rem",
    borderRadius: "8px",
  },
}));

export default useStyles;
