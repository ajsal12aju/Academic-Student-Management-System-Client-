// StaffTable.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  IconButton,
  Badge,
  Button,
  Typography
} from '@mui/material';
import { getCourses, getStaffList } from 'container/branchContainer/slice';
import StaffDrawer from './StaffDrawer';
import { IconFileTypePdf, IconFilterDown } from '@tabler/icons-react';
import { useTheme } from '@emotion/react';
import { formatDate } from 'utils/formateDate';

const StaffTable = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('name');

  useEffect(() => {
    dispatch(getStaffList({}));
  }, []);

  const staffListData = useSelector((state) => state.branch?.staffList || null);
  const staffList = staffListData?.data;

  const handleRowClick = (staff) => {
    setSelectedStaff(staff);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    document.title = `Diat -Admin`;
    setDrawerOpen(false);
    setSelectedStaff(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredStaffs = staffList?.filter((staff) => {
    const value = staff[searchField]?.toString().toLowerCase() || '';
    return value.includes(searchQuery.toLowerCase());
  });

  const paginatedStaffs = filteredStaffs?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const courses = useSelector((state) => state.branch.courseList);

  useEffect(() => {
    if (!courses || courses == []) {
      dispatch(getCourses());
    }
  }, []);

  return (
    <>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid container justifyContent={'space-between'}>
          <Grid item sx={4}>
            <FormControl
              size="small"
              variant="outlined"
              sx={{
                width: '120px',
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
            >
              <InputLabel>Search</InputLabel>
              <Select value={searchField} onChange={handleSearchFieldChange} label="Search By" fullWidth>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="admissionNo">Admission No</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              // label="Search"
              placeholder="Search"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderTopLeftRadius: '0px',
                  borderBottomLeftRadius: '0px',
                  // borderRight: '0px solid white',
                  paddingRight: '0px'
                },
                '& .MuiOutlinedInput-root': {
                  border: 'none',
                  paddingRight: '0px',
                  boxShadow: 'none'
                }
              }}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>
      </div>

      {/* Table for displaying staffs */}
      <TableContainer
        component={Paper}
        sx={{
          height: 'calc(70vh - 40px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '10px' // Scrollbar width
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[100], // Scrollbar track color
            borderRadius: '10px' // Rounded track
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cfcccc', // Thumb color
            borderRadius: '10px', // Rounded thumb
            border: `2px solid ${theme.palette.grey[100]}` // Adds a gap effect around the thumb
          },
          '&::-webkit-scrollbar-thumb:hover': {
            // backgroundColor: theme.palette.primary.main, // Thumb color on hover
          }
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ minWidth: 80 }}>
                SI No
              </TableCell>
              <TableCell align="center" sx={{ minWidth: 150 }}>
                Name
              </TableCell>
              {/* <TableCell align="center" sx={{ minWidth: 150 }}>
                Staff ID
              </TableCell> */}
              <TableCell align="center" sx={{ minWidth: 120 }}>
                Joining Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaffs?.length ? (
              paginatedStaffs.map((staff, index) => (
                <TableRow key={staff.staff_id} hover onClick={() => handleRowClick(staff)} style={{ cursor: 'pointer' }}>
                  <TableCell align="center" sx={{ minWidth: 80 }}>
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 150 }}>
                    {staff.name}
                  </TableCell>
                  {/* <TableCell align="center" sx={{ minWidth: 130 }}>
                    {staff.staffId}
                  </TableCell> */}
                  <TableCell align="center" sx={{ minWidth: 120 }}>
                    {formatDate(staff?.joiningDate) || 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No staffs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container display={'flex'} direction={'row'} justifyContent={'space-between'}>
        <Grid item>
          {' '}
          <Typography p={3}> showing data from {staffListData?.totalCount || 0} entries</Typography>
        </Grid>
        <Grid item>
          {' '}
          {/* Pagination */}
          <Pagination
            count={Math.ceil((filteredStaffs?.length || 0) / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
            color="secondary"
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        </Grid>
      </Grid>

      {/* Drawer for Staff Details */}
      {isDrawerOpen && <StaffDrawer open={isDrawerOpen} staff={selectedStaff} onClose={closeDrawer} />}
    </>
  );
};

export default StaffTable;
