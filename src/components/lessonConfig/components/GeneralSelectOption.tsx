import { Box } from "@mui/material";
import { withStyles, WithStyles } from "@mui/styles";
import { FunctionComponent } from "react";
import styles from "./styles";
import { Option } from "./types";
import clsx from "clsx";

interface GeneralOptionSelectProps extends WithStyles<typeof styles> {
  options: Option[];
  isOptionSelected: (option: Option) => boolean;
  onOptionSelectChange: (value: Option["value"]) => void;
}

const GeneralSelectOption: FunctionComponent<GeneralOptionSelectProps> = ({
  options,
  isOptionSelected,
  onOptionSelectChange,
  classes,
}) => {
  return (
    <Box className={classes.customRadioGroup}>
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(classes.customRadio, {
            [classes.selectedRadio]: isOptionSelected(option),
          })}
        >
          <input
            type="radio"
            name="questionCount"
            value={option.value}
            checked={isOptionSelected(option)}
            onChange={({ target }) => onOptionSelectChange(target.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </Box>
  );
};

export default withStyles(styles)(GeneralSelectOption);
