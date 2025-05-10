import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { Option } from "./types";
import clsx from "clsx";
import useStyles from "./styles";

interface GeneralOptionSelectProps {
  options: Option[];
  isOptionSelected: (option: Option) => boolean;
  onOptionSelectChange: (value: Option["value"]) => void;
}

const GeneralSelectOption: FunctionComponent<GeneralOptionSelectProps> = ({
  options,
  isOptionSelected,
  onOptionSelectChange,
}) => {
  const classes = useStyles();

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

export default GeneralSelectOption;
