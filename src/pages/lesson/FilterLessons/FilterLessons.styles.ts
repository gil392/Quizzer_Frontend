import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    searchText: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
      },
      width: "30vw",
    },
  })
);

export default useStyles;
