import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { IconButton, Tooltip } from "@mui/material";

interface WhatsAppShareButtonProps {
  message: string;
}

const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({
  message,
}) => (
  <Tooltip title="Share on WhatsApp" arrow>
    <IconButton
      component="a"
      href={`https://wa.me/?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      color="success"
      aria-label="Share on WhatsApp"
      style={{ outline: "none" }}
      sx={{
        "&:hover": {
          color: "success.main",
        },
      }}
    >
      <WhatsAppIcon />
    </IconButton>
  </Tooltip>
);

export default WhatsAppShareButton;
