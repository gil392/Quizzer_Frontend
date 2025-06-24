import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: "100%",
        height: "fit-content",
        background: theme.palette.background.paper,
        borderRadius: 12,
        boxShadow: theme.shadows[1],
        padding: 16,
    },
    header: {
        marginBottom: 12,
        color: theme.palette.text.primary,
        fontWeight: 600,
    },
    list: {
        width: "100%",
    },
    listItem: {
        borderRadius: 8,
        marginBottom: 8,
        minHeight: 75,
        paddingLeft: 0,
        paddingRight: 0,
        transition: "background 0.2s",
        "&:hover": {
            background: theme.palette.action.hover,
        },
        alignItems: "flex-start",
    },
    itemBox: {
        display: "flex",
        alignItems: "stretch",
        gap: 8,
    },
    dataBox: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        cursor: "pointer",
        fontWeight: 600,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
        lineHeight: 1.134,
        maxHeight: "3em",
        marginBottom: 2,
        color: theme.palette.text.primary,
        fontSize: "1rem",
    },
    channel: {
        display: "block",
        fontSize: "0.8em",
        lineHeight: 1.134,
        color: theme.palette.text.secondary,
        marginBottom: 0,
    },
    meta: {
        display: "block",
        fontSize: "0.735em",
        lineHeight: 1.134,
        marginTop: 1.89,
        color: theme.palette.text.secondary,
        marginBottom: 0,
    },
    button: {
        marginTop: 8,
        alignSelf: "flex-start",
        whiteSpace: "nowrap",
        minWidth: 100,
        lineHeight: 1.25,
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        fontSize: "0.735rem",
        "&:hover": {
            borderColor: theme.palette.primary.dark,
            background: theme.palette.action.hover,
        },
    },
    noVideosBox: {
        padding: 16,
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    thumbnailSkeleton: {
        flexShrink: 0,
    },
    imageSize: {
        width: "100% !important",
        height: "100% !important"
    }
}));

export default useStyles;