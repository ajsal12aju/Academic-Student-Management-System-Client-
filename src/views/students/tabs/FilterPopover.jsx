import React from 'react';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Popover, Select, IconButton } from '@mui/material';
import { IconCircleMinus } from '@tabler/icons-react';

const FilterPopover = ({
  anchorEl,
  filters,
  columns,
  handleClose,
  handleFilterByChange,
  handleFilterValueChange,
  applyFilters,
  clearFilters,
  addNewFilter,
  removeFilter
}) => {
  const open = Boolean(anchorEl);

  return (
    <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
      <Box sx={{ paddingY: 2, paddingX: 2, margin: 2, maxWidth: '400px' }}>
        <Grid container gap={1}>
          {filters?.map((filter, index) => (
            <Grid key={index} container spacing={1} alignItems="center">
              <Grid item xs={5.5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Filter by</InputLabel>
                  <Select
                    value={filter.fieldName || ''}
                    onChange={(e) => {
                      const selectedColumn = columns.find((col) => col.fieldName === e.target.value);
                      handleFilterByChange(index, selectedColumn);
                    }}
                    sx={{ bgcolor: 'white' }}
                    label="Filter by"
                  >
                    {columns.map((column) => (
                      <MenuItem key={column.fieldName} value={column.fieldName}>
                        {column.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={5.5}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Value</InputLabel>
                  <Select
                    size="small"
                    value={filter.value || ''}
                    label="Value"
                    onChange={(e) => handleFilterValueChange(index, e.target.value)}
                    sx={{ bgcolor: 'white' }}
                  >
                    {filter.options?.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={0.5}>
                <IconButton size="small" onClick={() => removeFilter(index)}>
                  <IconCircleMinus stroke={1} />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Grid container justifyContent={'space-between'}>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <Button
                      size="small"
                      sx={{
                        borderRadius: '7px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                      onClick={addNewFilter}
                    >
                      + Add
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      sx={{
                        borderRadius: '7px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                      onClick={clearFilters}
                    >
                      Clear All
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid mr={4} item>
                <Button size='small' variant="outlined" color="secondary" onClick={applyFilters}>
                  Apply Filters
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Popover>
  );
};

export default FilterPopover;
