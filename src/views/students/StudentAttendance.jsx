import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  TablePagination
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { getStudentList } from 'container/branchContainer/slice';
import { useDispatch, useSelector } from 'react-redux';

const StudentAttendance = () => {
  const dispatch = useDispatch();

  // State variables
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [faculty, setFaculty] = useState('');
  const [batch, setBatch] = useState('');
  const [section, setSection] = useState('');
  const [absentees, setAbsentees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Selectors
  const studentData = useSelector((state) => state.branch?.studentData);
  const studentList = studentData?.data || [];
  const studentCount = studentData?.totalCount || 0;

  // Paginated student list
  const paginatedStudentList = studentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await dispatch(getStudentList({}));
      } catch (err) {
        setError('Failed to fetch student data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);



  const handleAttendanceChange = (studentId, status) => {
    if (status === 'absent') {
      setAbsentees((prev) => [...prev, studentId]); // Add student to absentees
    } else {
      setAbsentees((prev) => prev.filter((id) => id !== studentId)); // Remove student from absentees
    }
  };

  const getStats = () => {
    return {
      totalStudents: studentCount,
      presentToday: studentCount - absentees.length,
      absentToday: absentees.length
    };
  };

  const stats = useMemo(() => getStats(), [absentees, studentCount]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = () => {
    console.log('Attendance Submitted:', absentees);
    setIsDialogOpen(false);
    setSnackbarOpen(true);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFaculty('');
    setBatch('');
    setSection('');
    setSelectedDate(new Date());
  };

  // Check if form is valid
  const isFormValid = faculty && batch && section && selectedDate;

  return (
    <Box>
      {/* Filter Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select value={batch} label="BSCS" onChange={(e) => setBatch(e.target.value)}>
                <MenuItem value="fall22">DIPP</MenuItem>
                <MenuItem value="spring23">DLMP</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Batch</InputLabel>
              <Select value={section} label="Section" onChange={(e) => setSection(e.target.value)}>
                <MenuItem value="CSDM-A">2024-Jan</MenuItem>
                <MenuItem value="CSDM-A">2024-Feb</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Division</InputLabel>
              <Select value={batch} label="BSCS" onChange={(e) => setBatch(e.target.value)}>
                <MenuItem value="fall22">A</MenuItem>
                <MenuItem value="spring23">B</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" color="primary" fullWidth sx={{ height: '40px' }} disabled={!isFormValid}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Calendar and Stats Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar onChange={setSelectedDate} />
            </LocalizationProvider>
          </Paper>

          {/* Stats Cards */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#FFF9E6' }}>
                <CardContent>
                  <Typography variant="h4" component="div">
                    {stats.totalStudents}
                  </Typography>
                  <Typography color="text.secondary">Total Students</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#E8F5E9' }}>
                <CardContent>
                  <Typography variant="h4" component="div">
                    {stats.presentToday}
                  </Typography>
                  <Typography color="text.secondary">Present Today</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card sx={{ bgcolor: '#FFEBEE' }}>
                <CardContent>
                  <Typography variant="h4" component="div">
                    {stats.absentToday}
                  </Typography>
                  <Typography color="text.secondary">Absent Today</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Attendance Table Section */}
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: '#e8e8e8' }}>Roll No</TableCell>
                  <TableCell sx={{ backgroundColor: '#e8e8e8' }}>Name</TableCell>
                  <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                    Present
                  </TableCell>
                  <TableCell sx={{ backgroundColor: '#e8e8e8' }} align="center">
                    Absent
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedStudentList.map((student, index) => (
                  <TableRow key={student.id || index}>
                    <TableCell sx={{ padding: '8px', paddingX: '15px' }}>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell sx={{ padding: '8px' }}>{student.name}</TableCell>
                    <TableCell sx={{ padding: '8px' }} align="center">
                      <Radio
                        checked={!absentees.includes(student._id)} // Present if not in absentees
                        onChange={() => handleAttendanceChange(student._id, 'present')}
                        value="present"
                        name={`attendance-${student._id}`}
                        aria-label="Present"
                        color="success"
                      />
                    </TableCell>
                    <TableCell sx={{ padding: '8px' }} align="center">
                      <Radio
                        checked={absentees.includes(student._id)} // Absent if in absentees
                        onChange={() => handleAttendanceChange(student._id, 'absent')}
                        value="absent"
                        name={`attendance-${student._id}`}
                        aria-label="Absent"
                        color="error"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={studentCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>

      {/* Submit Attendance Button */}
      <Button disabled variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setIsDialogOpen(true)}>
        Submit Attendance
      </Button>

      {/* Clear Filters Button */}
      <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleClearFilters}>
        Clear Filters
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit the attendance?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Attendance submitted successfully!"
      />
    </Box>
  );
};

export default StudentAttendance;
