import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { toast } from 'react-toastify';

const BatchPicker = ({ value = {}, course = '', disabled, size = '', readOnly, onChange, onBlur, error, helperText }) => {

  const currentYear = dayjs().year();
  const batchYears = [`${currentYear - 1}`, `${currentYear}`, `${currentYear + 1}`];
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
  const types = ['Regular', 'Morning', 'Evening'];
  const user = JSON.parse(localStorage.getItem('user'));

  // const types = [
  //   { label: 'Regular', value: 'REG' },
  //   { label: 'Morning', value: 'MOR' },
  //   { label: 'Evening', value: 'EVE' }
  // ];

  const generateBatchCode = (batchDetails) => {
    if (!batchDetails || !batchDetails.batchYear || !batchDetails.batchMonth || !user?.branch?.branch_id || !course || course == '') {
      return { batch: '', batchCode: '' };
    }

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const monthIndex = months.indexOf(batchDetails.batchMonth);
    if (monthIndex === -1) {
      return { batch: '', batchCode: '' };
    }
    const monthNumber = (monthIndex + 1).toString().padStart(2, '0');
    const yearNumber = batchDetails.batchYear;
    const batch = `${batchDetails.batchYear}-${months[monthIndex].slice(0, 3)}-${batchDetails.batchType}`;
    const batchCode = `${user?.branch?.branch_id}${course}${batchDetails.batchYear}${monthNumber}${batchDetails?.batchType?.slice(0, 1)}`;
    const batchYM = `${batchDetails.batchYear}/${monthNumber}`;

    // ${batchYM}/${course}/${division}/
    return { batch, batchCode, batchYM, monthNumber, yearNumber };
  };

  // Handle changes for year and month
  const handleChange = (field, newValue) => {
    const updatedValue = { ...value, [field]: newValue };
    onChange(updatedValue);

    // If both year and month are selected, generate the batch information
    if (updatedValue.batchYear && updatedValue.batchMonth) {
      const batchDetails = generateBatchCode(updatedValue);
      onChange({ ...updatedValue, ...batchDetails });
    }
  };

  return (
    <Grid container>
      {/* Academic Year Selector */}
      <Grid item xs={3.45}>
        <Autocomplete
          size={size}
          readOnly={readOnly ? true : false}
          fullWidth
          disabled={disabled}
          options={batchYears}
          getOptionLabel={(option) => option}
          value={value?.batchYear || ''}
          onChange={(_, newValue) => handleChange('batchYear', newValue || '')}
          onBlur={onBlur}
          disableClearable
          sx={{
            '& .MuiAutocomplete-inputRoot': {
              paddingRight: '0px !important'
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Batch`}
              error={error && Boolean(helperText?.batchYear)}
              helperText={helperText?.batchYear}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  borderRight: '0px solid white',
                  paddingRight: '0px'
                },
                '& .MuiOutlinedInput-root': {
                  border: 'none',
                  paddingRight: '0px',
                  boxShadow: 'none'
                }
              }}
            />
          )}
        />
      </Grid>

      {/* Month Selector */}
      <Grid item xs={4.25}>
        <Autocomplete
          size={size}
          readOnly={readOnly ? true : false}
          fullWidth
          options={months}
          getOptionLabel={(option) => option}
          value={value?.batchMonth || ''}
          onChange={(_, newValue) => handleChange('batchMonth', newValue || '')}
          onBlur={onBlur}
          disableClearable
          disabled={disabled}
          sx={{
            '& .MuiAutocomplete-inputRoot': {
              paddingRight: '5px !important'
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={error && Boolean(helperText?.batchMonth)}
              helperText={helperText?.batchMonth}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  paddingRight: '8px'
                }
              }}
            />
          )}
        />
      </Grid>
      {/* Batch Type Selector */}
      <Grid item xs={4}>
        <Autocomplete
          size={size}
          readOnly={readOnly ? true : false}
          fullWidth
          options={types}
          getOptionLabel={(option) => option}
          value={value?.batchType || ''}
          onChange={(_, newValue) => handleChange('batchType', newValue || '')}
          onBlur={onBlur}
          disableClearable
          disabled={disabled}
          renderInput={(params) => (
            <TextField {...params} error={error && Boolean(helperText?.batchType)} helperText={helperText?.batchType} />
          )}
          sx={{
            '& .MuiAutocomplete-inputRoot': {
              paddingRight: '0px !important'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderTopLeftRadius: '0px',
              borderBottomLeftRadius: '0px',
              // borderTopRightRadius: '0px',
              // borderBottomRightRadius: '0px',
              paddingRight: '8px'
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

BatchPicker.propTypes = {
  value: PropTypes.shape({
    year: PropTypes.string,
    month: PropTypes.string,
    batch: PropTypes.string,
    batchCode: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.shape({
    year: PropTypes.string,
    month: PropTypes.string
  })
};

BatchPicker.defaultProps = {
  onBlur: () => {},
  error: false,
  helperText: {
    year: '',
    month: ''
    // type: ''
  }
};

export default BatchPicker;
