import { Box, Typography } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import useStyles from "./styles";
import { Option } from "./types";

interface GeneralOptionSelectProps {
  title: string;
  options: Option[];
  isOptionSelected: (option: Option) => boolean;
  setSelectedOption: (selectedOption: string) => void;
}

const GeneralSelectOption: FunctionComponent<GeneralOptionSelectProps> = ({
  title,
  options,
  isOptionSelected,
  setSelectedOption,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
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
              onChange={({ target }) => setSelectedOption(target.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </Box>
    </>
  );
};

export default GeneralSelectOption;
