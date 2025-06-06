import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
        gap: 12,
        width: "75vw",
    },
    summaryBox: {
        flex: 2,
        minWidth: 0,
    },
    relatedBox: {
        flex: 1,
        minWidth: 340,
        [theme.breakpoints.down("md")]: {
            minWidth: 0,
        },
    },
}));

export default useStyles;