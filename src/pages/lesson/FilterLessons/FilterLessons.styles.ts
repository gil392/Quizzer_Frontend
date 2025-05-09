import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    filterContainer: {},
    filterHeader: {},
    filterBody: {
      marginTop: "1rem",
      marginBottom: "1rem",
    },
    searchTextContainer: {
      flex: "1 1 200px",
      minWidth: "200px",
    },
    searchText: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
      },
      width: "40vw",
    },
  })
);

export default useStyles;
