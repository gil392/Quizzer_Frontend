import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "1rem",
        width: "60vw",
        margin: "1rem",
        transition: "opacity 0.2s",
    },
    iconBox: {
        padding: theme.spacing(2),
    },
    content: {
        flex: 1,
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row",
        gap: theme.spacing(2),
        alignItems: "center",
        paddingRight: theme.spacing(2),
    },
}));

export default useStyles;