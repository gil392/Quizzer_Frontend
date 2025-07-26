import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { IconButton } from "@mui/material";

interface WhatsAppShareButtonProps {
  message: string;
}

const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({
  message,
}) => (
  <IconButton
    component="a"
    href={`https://wa.me/?text=${encodeURIComponent(message)}`}
    target="_blank"
    rel="noopener noreferrer"
    color="success"
    title="Share on WhatsApp"
    sx={{
      "&:hover": {
        color: "success.main", // keep the WhatsApp green color on hover
      },
    }}
  >
    <WhatsAppIcon />
  </IconButton>
);

export default WhatsAppShareButton;
