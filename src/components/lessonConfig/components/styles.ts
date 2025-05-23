import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => {
  const isDarkMode = theme.palette.mode === "dark";
  const customRadioBgColor = isDarkMode ? "#2C2C2E" : "#f9f9f9";
  const customRadioTextColor = isDarkMode ? "var(--primary-main)" : "#424242";
  return createStyles({
    customRadioGroup: {
      display: "flex",
      marginBottom: "1.5rem",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      overflow: "hidden",
    },

    customRadio: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem 1rem",
      borderRight: "1px solid #e0e0e0",
      backgroundColor: customRadioBgColor,
      cursor: "pointer",
      transition: "all 0.3s ease",
      "&:last-child": {
        borderRight: "none",
      },
      "& input": {
        display: "none",
      },
      "& span": {
        fontSize: "0.9rem",
        fontWeight: 500,
        color: customRadioTextColor,
      },
    },

    selectedRadio: {
      backgroundColor: "var(--primary-light)",
      color: "var(--primary-main)",
      fontWeight: "bold",
      "& span": {
        color: "var(--primary-main)",
      },
    },

    manualSelection: {
      color: "primary.main",
      height: 8,
      "& .MuiSlider-thumb": {
        height: 16,
        width: 16,
        backgroundColor: "#fff",
        border: "2px solid currentColor",
        "&:hover": {
          boxShadow: "0px 0px 0px 8px rgba(25, 118, 210, 0.16)",
        },
        "&.Mui-active": {
          boxShadow: "0px 0px 0px 14px rgba(25, 118, 210, 0.16)",
        },
      },
      "& .MuiSlider-rail": {
        backgroundColor: "#bdbdbd",
      },
      "& .MuiSlider-mark": {
        backgroundColor: "#bdbdbd",
        height: 8,
        width: 8,
        borderRadius: "50%",
      },
      "& .MuiSlider-markActive": {
        backgroundColor: "primary.main",
      },
    },
  });
});

export default useStyles;
