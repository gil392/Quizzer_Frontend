import React, { FunctionComponent } from "react";
import { IconButton, Tooltip } from "@mui/material";

interface GenericIconButtonProps {
  title: string;
  icon: React.ReactElement;
  onClick?: (event: React.MouseEvent) => void;
}

export const GenericIconButton: FunctionComponent<GenericIconButtonProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        aria-label={title}
        style={{ outline: "none" }}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
