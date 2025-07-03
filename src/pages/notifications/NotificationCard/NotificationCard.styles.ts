import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

interface StyleProps {
    isRead: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
    card: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        margin: "1rem",
        marginBottom: "1rem",
        opacity: (props) => (props.isRead ? 0.6 : 1),
        transition: "opacity 0.2s",
        width: "100%",
    },
    iconBox: {
        padding: theme.spacing(2),
    },
    content: {
        flex: 1,
    },
    buttonBox: {
        paddingRight: theme.spacing(4),
        display: "flex",
        gap: theme.spacing(2),
    },
}));

export default useStyles;