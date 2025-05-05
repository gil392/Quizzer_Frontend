import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    lessonItem: {
      padding: "2px",
      margin: "1px 0",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "2px",
      transition: "0.3s",
      width: "40vw",
      marginTop: "2vh",
      marginBottom: "2vh",
      backgroundColor: "#fae1e4",
    },
    lessonItemHover: {
      "&:hover": {
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
        backgroundColor: "#ffc0cb",
        cursor: "pointer",
      },
    },
    flexContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: "0.5vw",
    },
    successRateText: {
      marginTop: "0.5rem",
      paddingLeft: "0.5vw",
      textAlign: "left",
    },
  })
);

export default useStyles;
