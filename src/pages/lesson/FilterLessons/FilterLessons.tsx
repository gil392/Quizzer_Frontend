import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { FunctionComponent, useMemo } from "react";
import { Clear as ClearIcon } from "@mui/icons-material";
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

  const resetFilters = () => {
    setFilterOptions(INITIAL_FILTER_OPTIONS);
  };

  const isFilterActive = useMemo(
    () => !isEqual(filterOptions, INITIAL_FILTER_OPTIONS),
    [filterOptions]
  );

  return (
    <Container maxWidth="lg" className={classes.filterContainer}>
      <Paper elevation={1} className={classes.filterPaper}>
        <Box className={classes.filterHeader}>
          <Typography variant="h6" component="h2" color="text.primary">
            Filter Lessons
          </Typography>

          {isFilterActive && (
            <Button
              startIcon={<ClearIcon />}
              onClick={resetFilters}
              color="primary"
              size="small"
            >
              Reset all filters
            </Button>
          )}
        </Box>

        <Box className={classes.filterBody}>
          <Box className={classes.searchTextContainer}>
            <TextField
              fullWidth
              label="Search"
              value={filterOptions.searchText}
              onChange={({ target }) =>
                onFilterChange("searchText", target.value)
              }
              placeholder="Search titles"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default FilterLessons;
