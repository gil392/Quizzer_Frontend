import { createStyles } from "@mui/styles";

const styles = createStyles({
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
    backgroundColor: "#f9f9f9",
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
      color: "#424242",
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
});

export default styles;
