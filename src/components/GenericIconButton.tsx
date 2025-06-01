import React, { FunctionComponent } from "react";
import { IconButton, Tooltip } from "@mui/material";

interface GenericIconButtonProps {
  title: string;
  icon: React.ReactElement;
  onClick?: (event: React.MouseEvent) => void;
  component?: React.ElementType;
  className?: string;
}

export const GenericIconButton: FunctionComponent<GenericIconButtonProps> = ({
  title,
  icon,
  onClick,
  component,
  className,
}) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        component={component ?? "button"}
        className={className}
        aria-label={title}
        style={{ outline: "none" }}
        onClick={(event) => {
          event.stopPropagation();
          onClick?.(event);
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};
