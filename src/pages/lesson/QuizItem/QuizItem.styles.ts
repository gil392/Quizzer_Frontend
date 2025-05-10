import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      marginBottom: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
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
    ratingContainer: {
      marginTop: "1rem",
    },
  })
);

export default useStyles;
