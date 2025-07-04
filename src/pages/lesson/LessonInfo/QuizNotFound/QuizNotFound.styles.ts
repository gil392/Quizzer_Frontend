import { Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        image: {
            height: "auto",
            maxWidth: 200,
            minWidth: 50,
            borderRadius: 2,
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
