import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getStudentList } from 'container/branchContainer/slice';

const ViewStudents = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudentList({}));
  }, []);

  const studentList = useSelector((state) => state.branch.studentList);
  console.log('%c [ studentList ]-13', 'font-size:13px; background:pink; color:#bf2c9f;', studentList)

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center">SI No</TableCell>
            <TableCell align="center">Student ID</TableCell>
            <TableCell align="center">Name</TableCell>
            {/* <TableCell align="center">Batch</TableCell> */}
            {/* <TableCell align="center">Division</TableCell> */}
            <TableCell align="center">Course</TableCell>
            {/* <TableCell align="center">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList?.length ? (
            studentList?.map((student, index) => (
              <TableRow key={student.student_id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{student.student_id}</TableCell>
                <TableCell align="center">{student.name}</TableCell>
                {/* <TableCell align="center">{student.batch || 'N/A'}</TableCell> */}
                {/* <TableCell align="center">{student.division || 'N/A'}</TableCell> */}
                <TableCell align="center">{student?.course?.course_code || 'N/A'}</TableCell>
                {/* <TableCell align="center">{student?.status || 'Active'}</TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No students found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewStudents;
