import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import React, { FunctionComponent, useMemo } from "react"
import { Clear as ClearIcon } from '@mui/icons-material';
import { FilterOptions, FilterOptionsName } from "./types";
import { INITIAL_FILTER_OPTIONS } from "./constants";
import styles from "./FilterLessons.styles";
import withStyles, { WithStyles } from "@mui/styles/withStyles/withStyles";

export interface FilterLessonsProps extends WithStyles<typeof styles> {
    setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>
    filterOptions: FilterOptions;
}

const FilterLessons : FunctionComponent<FilterLessonsProps> = ({setFilterOptions, filterOptions, classes}) => {

    const onFilterChange = (filterName: string, filterValue: any) => {
        setFilterOptions((prev) => ({
            ...prev,
            filterName: filterValue
        }))
    } 

  const resetFilters = () => {
    setFilterOptions(INITIAL_FILTER_OPTIONS);
  };

  const isFilterActive = useMemo(() => 
    filterOptions !== INITIAL_FILTER_OPTIONS, [filterOptions]);

  
return (
    <Container maxWidth="lg" className={classes.filterContainer}>
      <Paper
        elevation={1}
        className={classes.filterPaper}
      >
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
              onChange={({target}) => onFilterChange(FilterOptionsName.searchText, target.value)}
              placeholder="Search titles & descriptions"
              variant="outlined"
              size="small"
            />
            </Box>
          </Box>
        </Paper>
    </Container>
  );
};

export default withStyles(styles)(FilterLessons);
