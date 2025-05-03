import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { Option } from "./types";

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
  return (
    <Box className="custom-radio-group">
      {options.map((option) => (
        <label
          key={option.value}
          className={`custom-radio ${
            isOptionSelected(option) ? "selected" : ""
          }`}
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
