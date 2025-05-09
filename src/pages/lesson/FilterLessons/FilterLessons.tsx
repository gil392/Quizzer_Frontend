import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { FunctionComponent, useMemo } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { FilterOptions } from "./types";
import { INITIAL_FILTER_OPTIONS } from "./constants";
import useStyles from "./FilterLessons.styles";
import { isEqual } from "lodash";

export interface FilterLessonsProps {
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  filterOptions: FilterOptions;
}

const FilterLessons: FunctionComponent<FilterLessonsProps> = ({
  setFilterOptions,
  filterOptions,
}) => {
  const classes = useStyles();

  const onFilterChange = (
    filterName: keyof FilterOptions,
    filterValue: string
  ) => {
    setFilterOptions((prev) => ({
      ...prev,
      [filterName]: filterValue,
    }));
  };

  return (
    <Box className={classes.filterBody}>
      <Box className={classes.searchTextContainer}>
        <TextField
          className={classes.searchText}
          value={filterOptions.searchText}
          onChange={({ target }) => onFilterChange("searchText", target.value)}
          placeholder="Search titles and links"
          variant="outlined"
          size="medium"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default FilterLessons;
