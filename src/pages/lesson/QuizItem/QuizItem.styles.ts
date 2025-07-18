import { Theme } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginBottom: "1rem",
      border: "1px solid #ccc",
      borderRadius: "16px",
      padding: "1rem",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    accordionDetails: {
      marginBottom: "0.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    AttemptContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
    },
    ratingContainer: {
      marginTop: "1rem",
    },
    rating: {
      "& .MuiRating-iconFilled": {
        color: theme.palette.primary.main,
      },
      "& .MuiRating-iconHover": {
        color: theme.palette.primary.main,
      },
    },
  })
);

export default useStyles;
