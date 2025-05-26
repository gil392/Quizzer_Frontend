import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    container: {
        width: "75vw",
        margin: "auto",
        padding: 16,
    },
    card: {
        maxWidth: "75vw",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        paddingTop: 16,
        height: "85vh",
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
    skeletonContainer: {
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