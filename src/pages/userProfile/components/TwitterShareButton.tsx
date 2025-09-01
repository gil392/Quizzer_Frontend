import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton, Tooltip } from "@mui/material";

interface TwitterShareButtonProps {
  message: string;
}

const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({ message }) => (
  <Tooltip title="Share on Twitter" arrow>
    <IconButton
      component="a"
      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
        message
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      color="primary"
      aria-label="Share on Twitter"
      style={{ outline: "none" }}
      sx={{
        "&:hover": {
          color: "primary.main",
        },
      }}
    >
      <TwitterIcon />
    </IconButton>
  </Tooltip>
);

export default TwitterShareButton;
