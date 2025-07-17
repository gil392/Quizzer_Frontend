import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: {
            width: "100%",
            height: "auto",
            borderRadius: 2,
            maxWidth: '600px',
            minWidth: '200px',
        },
        title: {
            color: theme.palette.primary.main,
            gutterBottom: "1rem",
            fontWeight: 600,
        },
        message: {
            color: theme.palette.text.secondary,
            fontWeight: 300,
        },
    })
);
