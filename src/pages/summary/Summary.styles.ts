import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: "100%",
        height: "100%",
        background: theme.palette.background.paper,
        borderRadius: 12,
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
            borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
        },
    },
    header: {
        marginBottom: 12,
        color: theme.palette.text.primary,
        fontWeight: 600,
    },
    skeletonContainer: {
        width: "100%",
        padding: 16,
    },
    cardContent: {
        textAlign: "left",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        padding: 16,
    },
}));

export default useStyles;