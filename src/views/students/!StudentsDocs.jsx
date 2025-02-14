import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Button,
  FormHelperText
} from '@mui/material';
import { clearDocData, getCourses, getDocStudentList } from 'container/branchContainer/slice';
import { IconFileTypePdf } from '@tabler/icons-react';
import { pdf } from '@react-pdf/renderer';
import GenarateTablePDF from 'utils/Documents/GenarateTablePDF';
import StudentIDPDF from 'utils/Documents/StudentIDPDF';
import { toast } from 'react-toastify';
import { formatDate } from 'utils/formateDate';
import BatchPicker from 'ui-component/BatchPicker';

const DOC_TYPES = {
  STUDENT_LIST: 'studentList',
  STUDENT_PAYMENT_SHEET: 'studentListWithPayments',
  ID_CARD: 'idCard'
};

const validationSchema = Yup.object({
  course: Yup.string().required('Course is required'),
  documentType: Yup.string().required('Document type is required'),
  division: Yup.string().required('Division is required'),

  batchYear: Yup.string().required('Batch year is required'),
  batchMonth: Yup.string().required('Batch month is required'),
  batchType: Yup.string().required('Batch type is required'),
  batchCode: Yup.string().required('Batch code is required')
});

const initialValues = {
  academicYear: '',
  course: '',
  documentType: '',
  division: '',
  batchDetails: {
    academicYear: '',
    month: '',
    batch: ''
  },
  batchYear: '',
  batchMonth: '',
  batchType: '',
  batchCode: ''
};

const StudentsDocs = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.branch.courseList);
  const studentList = useSelector((state) => state.branch.studentDocList?.data);

  useEffect(() => {
    dispatch(clearDocData());
    if (!courses || courses.length === 0) {
      dispatch(getCourses());
    }
  }, []);

  const getTableColumns = (documentType) => {
    const baseColumns = [
      { id: 'rollNo', label: 'Roll No.', align: 'center' },
      { id: 'name', label: 'Name', align: 'center' },
      { id: 'admissionNo', label: 'Admission No', align: 'center' }
    ];

    if (documentType === DOC_TYPES.STUDENT_PAYMENT_SHEET) {
      return [
        ...baseColumns,
        { id: 'totalPaidFee', label: 'Paid Fees', align: 'center' },
        { id: 'pendingFeeAmount', label: 'Balance', align: 'center' },
        { id: 'lastPaymentDate', label: 'Last Paid On', align: 'center' }
      ];
    }

    return baseColumns;
  };

  const getPDFFields = (documentType) => {
    const baseFields = [
      { label: 'Roll No.', key: 'rollNo' },
      { label: 'Name', key: 'name' },
      { label: 'Admission No.', key: 'admissionNo' }
    ];

    if (documentType === DOC_TYPES.STUDENT_PAYMENT_SHEET) {
      return [
        ...baseFields,
        { label: 'Total Paid', key: 'totalPaidFee', format: 'currency' },
        { label: 'Balance', key: 'pendingFeeAmount', format: 'currency' },
        { label: 'Last Paid Date', key: 'lastPaymentDate', format: 'date' }
      ];
    }

    return baseFields;
  };

  const handleGenerateDocument = async (values) => {
    if (!studentList?.length) return;

    try {
      let blob;
      let fileName;

      if (values.documentType === DOC_TYPES.ID_CARD) {
        blob = await pdf(<StudentIDPDF students={studentList} />).toBlob();
        fileName = `ID_cards_${values.batchDetails.academicYear}_${values.course}_${values.division}_${values.batchType}.pdf`;
      } else {
        const documentTitle =
          values.documentType === DOC_TYPES.STUDENT_LIST
            ? `Students List ${values.batchDetails.academicYear} ${values.course}-${values.division} (${values.batchType})`
            : `Students Payment Sheet ${values.batchDetails.academicYear} ${values.course}-${values.division} (${values.batchType})`;

        blob = await pdf(
          <GenarateTablePDF haveIndex={false} data={studentList} fields={getPDFFields(values.documentType)} pageTitle={documentTitle} />
        ).toBlob();

        fileName = `${documentTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`;
      }

      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error('Document generation error:', error);
      toast.error('Error generating document');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(
          getDocStudentList({
            filters: {
              course: ['eq', values.course],
              batchType: ['eq', values.batchType],
              division: ['eq', values.division],
              batchYear: ['eq', values.batchYear],
              batchMonth: ['eq', values.batchMonth],
            }
          })
        );
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, setFieldValue }) => (
        <>
          <Paper elevation={0.5} sx={{ p: 2, mb: 2 }}>
            <Form>
              <Grid container spacing={2} alignItems="center">
                <Grid item md={2} sm={3} xs={6}>
                  <FormControl size="small" fullWidth error={touched.course && Boolean(errors.course)}>
                    <InputLabel>Course</InputLabel>
                    <Select name="course" value={values.course} label="Course" onChange={handleChange} onBlur={handleBlur}>
                      {courses?.map((course) => (
                        <MenuItem key={course.course_code} value={course.course_code}>
                          {course.course_code}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.course && errors.course && <FormHelperText>{errors.course}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <BatchPicker
                    value={values.batchDetails}
                    course={values.course}
                    size="small"
                    onChange={(value) => {
                      setFieldValue('batchDetails', value);
                      setFieldValue('batchYear', value.batchYear);
                      setFieldValue('batchMonth', value.batchMonth);
                      setFieldValue('batchType', value.batchType);
                      setFieldValue('batchCode', value.batchCode);
                    }}
                    onBlur={handleBlur}
                    error={touched.batchDetails && Boolean(errors.batchDetails)}
                    helperText={{
                      academicYear: touched.batchDetails?.academicYear && errors.batchDetails?.academicYear,
                      month: touched.batchDetails?.month && errors.batchDetails?.month,
                      batch: touched.batchDetails?.batch && errors.batchDetails?.batch
                    }}
                    disabled={!values.course}
                  />
                </Grid>

                <Grid item md={2} sm={3} xs={6}>
                  <FormControl size="small" fullWidth error={touched.division && Boolean(errors.division)}>
                    <InputLabel>Division</InputLabel>
                    <Select name="division" value={values.division} label="Division" onChange={handleChange} onBlur={handleBlur}>
                      {['A', 'B', 'C', 'D'].map((div) => (
                        <MenuItem key={div} value={div}>
                          {div}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.division && errors.division && <FormHelperText>{errors.division}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item md={2} sm={3} xs={6}>
                  <FormControl size="small" fullWidth error={touched.documentType && Boolean(errors.documentType)}>
                    <InputLabel>Document Type</InputLabel>
                    <Select
                      name="documentType"
                      value={values.documentType}
                      label="Document Type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value={DOC_TYPES.STUDENT_LIST}>Student List</MenuItem>
                      <MenuItem value={DOC_TYPES.STUDENT_PAYMENT_SHEET}>Student Payment Sheet</MenuItem>
                      <MenuItem value={DOC_TYPES.ID_CARD}>ID Card</MenuItem>
                    </Select>
                    {touched.documentType && errors.documentType && <FormHelperText>{errors.documentType}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item md={2} sm={3} xs={6}>
                  <Button variant="outlined" fullWidth onClick={handleSubmit}>
                    Apply
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Paper>
          

          <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {getTableColumns(values.documentType).map((column) => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: 120 }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {studentList?.length ? (
                  studentList.map((student) => (
                    <TableRow key={student.student_id} hover>
                      {getTableColumns(values.documentType).map((column) => (
                        <TableCell key={column.id} align={column.align} sx={{ minWidth: 120 }}>
                          {column.id === 'lastPaymentDate' ? formatDate(student[column.id]) : student[column.id] || 'N/A'}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={getTableColumns(values.documentType).length} align="center">
                      No students found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Paper
            elevation={0.5}
            sx={{
              position: 'absolute',
              bottom: '20px',
              right: '0px',
              transform: 'translateX(-50%)',
              p: 2
            }}
          >
            <Button
              variant="contained"
              disabled={!studentList?.length || !isValid}
              onClick={() => handleGenerateDocument(values)}
              startIcon={<IconFileTypePdf />}
            >
              Download Document
            </Button>
          </Paper>
        </>
      )}
    </Formik>
  );
};

export default StudentsDocs;
