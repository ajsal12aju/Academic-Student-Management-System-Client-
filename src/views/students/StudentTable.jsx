// StudentTable.js

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
import { getCourses, getStudentList } from 'container/branchContainer/slice';
import StudentDrawer from './StudentDrawer';
import { IconFileTypePdf, IconFilterDown } from '@tabler/icons-react';
import StudentsDocModal from './StudentsDocModal';
import FilterPopover from './tabs/FilterPopover';
import { useTheme } from '@emotion/react';
import { formatDate } from 'utils/formateDate';

const StudentTable = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [filters, setFilters] = useState([{ field: '', value: null }]);
  const [filterBadgeCount, setFilterBadgeCount] = useState(null);

  useEffect(() => {
    dispatch(getStudentList({}));
  }, [dispatch]);

  const studentListData = useSelector((state) => state.branch?.studentData || null);
  const studentList = studentListData?.data;

  // const multiplyArrayToTen = (array) => {
  //   if (!array || array.length === 0) {
  //     console.warn('The array is empty or undefined.');
  //     return [];
  //   }

  //   const result = [];
  //   const targetLength = 25;

  //   while (result.length < targetLength) {
  //     for (const item of array) {
  //       if (result.length >= targetLength) break;
  //       result.push({ ...item });
  //     }
  //   }

  //   return result;
  // };

  // const multipliedStudentList = multiplyArrayToTen(studentList);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    document.title = `Diat -Admin`;
    setDrawerOpen(false);
    setSelectedStudent(null);
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

  const filteredStudents = studentList?.filter((student) => {
    const value = student[searchField]?.toString().toLowerCase() || '';
    return value.includes(searchQuery.toLowerCase());
  });

  const paginatedStudents = filteredStudents?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handlePDFClick = () => {
    setDocModalOpen(true);
  };
  const handlePDFClose = () => {
    setDocModalOpen(false);
  };

  // --------------------filter logic ----------------------

  const handleOpenFilterPopover = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilterPopover = () => {
    setAnchorElFilter(null);
  };

  const handleFilterByChange = (index, item) => {
    setFilters((prev) =>
      prev.map((filter, i) =>
        i === index
          ? {
              ...item, // Spread the column properties first
              value: null, // Reset the value
              fieldName: item.fieldName, // Ensure fieldName is set
              label: item.label // Ensure label is set
            }
          : filter
      )
    );
  };

  const handleOperatorChange = (index, operator) => {
    setFilters((prev) => prev.map((filter, i) => (i === index ? { ...filter, operator } : filter)));
  };

  const handleFilterValueChange = (index, value) => {
    setFilters((prev) => prev.map((filter, i) => (i === index ? { ...filter, value } : filter)));
  };

  const addNewFilter = () => {
    setFilters((prev) => [...prev, { field: '', operator: '', value: '' }]);
  };

  const applyFilters = () => {
    setFilterBadgeCount(filters?.length);
    const filterPayload = filters.reduce((acc, filter) => {
      if (filter.fieldName && filter.value) {
        acc[filter.fieldName] = ['eq', filter.value];
      }
      return acc;
    }, {});

    dispatch(
      getStudentList({
        size: 10,
        filters: filterPayload
      })
    );
  };
  const removeFilter = (index) => {
    setFilters((prev) => {
      const updatedFilters = prev.filter((_, i) => i !== index);
      return updatedFilters.length > 0 ? updatedFilters : [{ field: '', operator: '', value: '' }];
    });
  };
  const clearFilters = () => {
    setFilters([{ field: '', value: null }]);
    dispatch(getStudentList({}));
    handleCloseFilterPopover();
    setFilterBadgeCount(0);
  };
  const courses = useSelector((state) => state.branch.courseList);

  useEffect(() => {
    if (!courses || courses == []) {
      dispatch(getCourses());
    }
  }, []);

  const filterItem = [
    {
      label: 'Course',
      fieldName: 'course',
      type: 'dropdown',
      isFilterable: true,
      options: courses?.map((course) => course.course_code)
    },
    {
      label: 'Batch Year',
      fieldName: 'batchYear',
      type: 'dropdown',
      isFilterable: true,
      options: ['2024', '2025', '2026']
    },
    {
      label: 'Batch Month',
      fieldName: 'batchMonth',
      type: 'dropdown',
      isFilterable: true,
      options: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    {
      label: 'Batch Type',
      fieldName: 'batchType',
      type: 'dropdown',
      isFilterable: true,
      options: ['Regular', 'Morning', 'Evening']
    },
    {
      label: 'Division',
      fieldName: 'division',
      type: 'dropdown',
      isFilterable: true,
      options: ['A', 'B', 'C', 'D']
    }
  ];

  return (
    <>
      {/* <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> */}
      <Grid container justifyContent="space-between" alignItems="center" flexDirection="row" mb={2} mt={1}>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={5} sm={2}   display={'flex'} justifyContent={'start'}>
              <FormControl
                fullWidth
                size="small"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderTopRightRadius: '0px',
                    borderBottomRightRadius: '0px',
                    borderRight: '0px solid white'
                  },
                  '& .MuiOutlinedInput-root': {
                    border: 'none',
                    paddingRight: '0px',
                    boxShadow: 'none'
                  }
                }}
              >
                <InputLabel>Search</InputLabel>
                <Select value={searchField} onChange={handleSearchFieldChange} label="Search By">
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="admissionNo">Admission No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={3} xs={7}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderTopLeftRadius: '0px',
                    borderBottomLeftRadius: '0px',
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
        </Grid>
        <Grid item xs={3}>
          <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
            <Grid item>
              <Badge color="primary" badgeContent={filterBadgeCount} invisible={filterBadgeCount === 0}>
                <IconButton onClick={handleOpenFilterPopover}>
                  <IconFilterDown color="#4183c4" stroke={1.5} />
                </IconButton>
              </Badge>
              <FilterPopover
                anchorEl={anchorElFilter}
                filters={filters}
                columns={filterItem}
                handleClose={handleCloseFilterPopover}
                handleFilterByChange={handleFilterByChange}
                handleOperatorChange={handleOperatorChange}
                handleFilterValueChange={handleFilterValueChange}
                addNewFilter={addNewFilter}
                removeFilter={removeFilter}
                clearFilters={clearFilters}
                applyFilters={applyFilters}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={() => handlePDFClick()}>
                <IconFileTypePdf stroke={1} color="#d64242" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* </div> */}

      <TableContainer
        component={Paper}
        sx={{
          height: 'calc(70vh - 40px)',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '10px' 
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme.palette.grey[100], 
            borderRadius: '10px' 
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cfcccc', 
            borderRadius: '10px', 
            border: `2px solid ${theme.palette.grey[100]}`
          },
          '&::-webkit-scrollbar-thumb:hover': {
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
              <TableCell align="center" sx={{ minWidth: 130 }}>
                Admission No.
              </TableCell>
              <TableCell align="center" sx={{ minWidth: 120 }}>
                Course
              </TableCell>
              <TableCell align="center" sx={{ minWidth: 150 }}>
                Batch
              </TableCell>
              <TableCell align="center" sx={{ minWidth: 120 }}>
                Division
              </TableCell>
              <TableCell align="center" sx={{ minWidth: 120 }}>
                Admission Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStudents?.length ? (
              paginatedStudents.map((student, index) => (
                <TableRow key={student.student_id} hover onClick={() => handleRowClick(student)} style={{ cursor: 'pointer' }}>
                  <TableCell align="center" sx={{ minWidth: 80 }}>
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 150 }}>
                    {student.name}
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 130 }}>
                    {student.admissionNo}
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 120 }}>
                    {student?.course || 'N/A'}
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 120 }}>
                    {(student?.batchMonth &&
                      student.batchType &&
                      `${student?.batchYear} - ${student?.batchMonth.slice(0, 3).toUpperCase()} (${student?.batchType})`) ||
                      'N/A'}
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 120 }}>
                    {student?.division || 'N/A'}
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 120 }}>
                    {formatDate(student?.admissionDate) || 'N/A'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container display={'flex'} direction={'row'} justifyContent={'space-between'}>
        <Grid item>
          {' '}
          <Typography p={3}> showing data from {studentListData?.totalCount || 0} entries</Typography>
        </Grid>
        <Grid item>
          {' '}
          {/* Pagination */}
          <Pagination
            count={Math.ceil((filteredStudents?.length || 0) / rowsPerPage)}
            page={page + 1}
            onChange={handleChangePage}
            color="secondary"
            sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
          />
        </Grid>
      </Grid>

      {/* Drawer for Student Details */}
      {isDrawerOpen && <StudentDrawer open={isDrawerOpen} student={selectedStudent} onClose={closeDrawer} />}
      {docModalOpen && <StudentsDocModal open={docModalOpen} handleClose={handlePDFClose} />}
    </>
  );
};

export default StudentTable;
