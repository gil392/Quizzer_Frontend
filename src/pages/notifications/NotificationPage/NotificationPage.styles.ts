import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "1px 0",
        width: "60vw",
    },
    title: {
        textAlign: "center",
        flexGrow: 1,
    },
    empty: {
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

export default useStyles;