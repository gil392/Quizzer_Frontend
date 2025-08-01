import { createStyles, makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => {
  const customRadioBgColor = theme.palette.background.paper;
  const customRadioTextColor = theme.palette.text.primary;
  const customRadioBorderColor = theme.palette.divider;
  const selectedRadioBgColor = theme.palette.primary.light;
  const selectedRadioTextColor = theme.palette.primary.contrastText;

  return createStyles({
    image: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
      borderRadius: 2,
      maxWidth: '25%',
      minWidth: '10%',
      textAlign: "center",
    },

    typography: {
      display: "flex",
      marginBottom: 20,
      border: `1px solid ${customRadioBorderColor}`,
      borderRadius: theme.shape.borderRadius,
      height: "3rem",
      width: "100%",
    },

    customRadioGroup: {
      display: "flex",
      marginBottom: "1.5rem",
      border: `1px solid ${customRadioBorderColor}`,
      borderRadius: theme.shape.borderRadius,
      overflow: "hidden",
    },

    customRadio: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem 1rem",
      borderRight: `1px solid ${customRadioBorderColor}`,
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
      backgroundColor: selectedRadioBgColor,
      color: selectedRadioTextColor,
      fontWeight: "bold",
      "& span": {
        color: selectedRadioTextColor,
      },
    },

    button: {
      width: "100%",
      height: "3rem",
      borderRadius: "16px",
      marginTop: 3,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.primary,
    },

    manualSelection: {
      color: theme.palette.primary.main,
      height: 8,
      "& .MuiSlider-thumb": {
        height: 16,
        width: 16,
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.primary.main}`,
        "&:hover": {
          boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}22`,
        },
        "&.Mui-active": {
          boxShadow: `0px 0px 0px 14px ${theme.palette.primary.main}22`,
        },
      },
      "& .MuiSlider-rail": {
        backgroundColor: theme.palette.divider,
      },
      "& .MuiSlider-mark": {
        backgroundColor: theme.palette.divider,
        height: 8,
        width: 8,
        borderRadius: "50%",
      },
      "& .MuiSlider-markActive": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  });
});

export default useStyles;