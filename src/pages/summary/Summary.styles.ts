import { Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundColor: "green",
      width: "100%",
    },
    summary: {
      whiteSpace: "pre-line",
      maxHeight: "70vh",
      overflowY: "auto",
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
        backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
      },
    },
  })
);

export default useStyles;
