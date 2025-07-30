import TwitterIcon from "@mui/icons-material/Twitter";
import { IconButton } from "@mui/material";

interface TwitterShareButtonProps {
  message: string;
}

const TwitterShareButton: React.FC<TwitterShareButtonProps> = ({ message }) => (
  <IconButton
    component="a"
    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
      message
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    color="primary"
    title="Share on Twitter"
    sx={{
      "&:hover": {
        color: "primary.main",
      },
    }}
  >
    <TwitterIcon />
  </IconButton>
);
export default TwitterShareButton;
