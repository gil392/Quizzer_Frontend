import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  thumbnailBox: {
    minWidth: "10vw",
    position: "relative",
    cursor: "pointer",
    flexShrink: 0,
    "&:hover": {
      opacity: 0.8,
    },
  },
  thumbnail: {
    width: "100% !important",
    height: "100% !important",
    objectFit: "cover",
    borderRadius: 8,
  },
  durationOverlay: {
    position: "absolute",
    bottom: 3.675,
    right: 7.35,
    background: "rgba(0,0,0,0.8)",
    color: "#fff",
    padding: "0px 5.25px",
    borderRadius: 3.675,
    fontSize: "0.71rem",
    fontWeight: 600,
    pointerEvents: "none",
  },
}));

export default useStyles;
