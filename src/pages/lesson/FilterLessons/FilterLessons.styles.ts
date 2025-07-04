import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    searchText: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "16px",
      },
      width: "45vw",
    },
  })
);

export default useStyles;
