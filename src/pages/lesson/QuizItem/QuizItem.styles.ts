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
    retakeButton: {
      marginLeft: "8px !important", 
      color: "#311b92 !important", 
      "&:hover": {
        color: "#1a0d66 !important", 
      },
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
  })
);

export default useStyles;
