import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      gap: "2vw",
      maxWidth: "100%",
      overflowX: "hidden",
    },
    leftBox: {
      flex: 6,
      minWidth: 0, // allows box to shrink if needed, to let overflow work
    },
    rightBox: {
      flex: 4,
      minWidth: 0, // allows box to shrink if needed, to let overflow work
    },
    title: {
      "&.MuiTypography-root": {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "0.5vh",
      },
    },
    card: {
      width: "100%",
    },
    collapseContent: {
      width: "100%",
    },
    noQuizzesText: {
      marginBottom: "1rem",
      "&.MuiTypography-root": {
        marginBottom: "1rem",
      },
    },
    buttonsContainer: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
    },
  })
);

export default useStyles;
