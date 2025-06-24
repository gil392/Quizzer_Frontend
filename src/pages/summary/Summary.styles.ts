import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: "100%",
        height: "100%",
        background: theme.palette.background.paper,
        borderRadius: 16,
        boxShadow: theme.shadows[1],
        padding: 24,
    },
    card: {
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        paddingTop: 16,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "16px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
        },
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
