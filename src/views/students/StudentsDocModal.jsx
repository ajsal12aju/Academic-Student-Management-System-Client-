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
  FormHelperText,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography
} from '@mui/material';
import { clearDocData, getCourses, getDocStudentList } from 'container/branchContainer/slice';
import { IconFileTypePdf } from '@tabler/icons-react';
import { pdf } from '@react-pdf/renderer';
import GenarateTablePDF from 'utils/Documents/GenarateTablePDF';
import StudentIDPDF from 'utils/Documents/StudentIDPDF';
import { toast } from 'react-toastify';
import { formatDate } from 'utils/formateDate';
import BatchPicker from 'ui-component/BatchPicker';
import { formatCurrency } from 'utils/Documents/formateCurrency';

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

const StudentsDocModal = ({ open, handleClose }) => {
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
        { id: 'totalPaidFee', label: 'Paid Fees', align: 'center', format: 'currency' },
        { id: 'pendingFeeAmount', label: 'Balance', align: 'center', format: 'currency' },
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

  const handleGenerateDocument = async (formValues) => {
    if (!studentList?.length) {
      toast.error('No students found to generate document');
      return;
    }

    try {
      let blob;
      let fileName;

      if (formValues.documentType === DOC_TYPES.ID_CARD) {
        blob = await pdf(<StudentIDPDF students={studentList} />).toBlob();
        fileName = `ID_cards_${formValues.batchDetails.academicYear}_${formValues.course}_${formValues.division}_${formValues.batchType}.pdf`;
      } else {
        const documentTitle =
          formValues.documentType === DOC_TYPES.STUDENT_LIST
            ? `Students List ${formValues.batchDetails.academicYear} ${formValues.course}-${formValues.division} (${formValues.batchType})`
            : `Students Payment Sheet ${formValues.batchDetails.academicYear} ${formValues.course}-${formValues.division} (${formValues.batchType})`;

        blob = await pdf(
          <GenarateTablePDF haveIndex={false} data={studentList} fields={getPDFFields(formValues.documentType)} pageTitle={documentTitle} />
        ).toBlob();

        fileName = `${documentTitle.toLowerCase().replace(/\s+/g, '_')}.pdf`;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.open(url, '_blank');

      setTimeout(() => URL.revokeObjectURL(url), 100);
      toast.success('Document generated successfully');
    } catch (error) {
      console.error('Document generation error:', error);
      toast.error('Error generating document: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography mx={2} my={1} variant="h4">
          {' '}
          Generate Documents
        </Typography>
      </DialogTitle>
      <DialogContent style={{ padding: '12px 32px 16px 32px' }}>
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
                  batchMonth: ['eq', values.batchMonth]
                }
              })
            );
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, setFieldValue }) => (
            <>
              <Form>
                <Grid container spacing={2} alignItems="center">
                  <Grid item md={1.5} sm={6} xs={6}>
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

                  <Grid item md={4} sm={12} xs={12}>
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

                  <Grid item md={1.5} sm={6} xs={4}>
                    <FormControl size="small" fullWidth error={touched.division && Boolean(errors.division)}>
                      <InputLabel>Division</InputLabel>
                      <Select name="division" value={values.division} label="Division" onChange={handleChange} onBlur={handleBlur}>
                        {['A', 'B', 'C', 'D', 'E', 'F'].map((div) => (
                          <MenuItem key={div} value={div}>
                            {div}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.division && errors.division && <FormHelperText>{errors.division}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid item md={3} sm={6} xs={8}>
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

                  <Grid item md={1}>
                    <Button variant="text" fullWidth onClick={handleSubmit}>
                      Apply
                    </Button>
                  </Grid>
                </Grid>
              </Form>

              <TableContainer
                component={Paper}
                // sx={{ maxHeight: 500, mt: 2, border: '1px dashed #ededed' }}
                sx={{
                  maxHeight: 400,
                  overflow: 'auto',
                  '&::-webkit-scrollbar': {
                    width: '5px',
                    height: '5px'
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#f0f0f0 ',
                    borderRadius: '10px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#e3e1e1',
                    borderRadius: '10px'
                    // border: `2px solid red`
                  },
                  '&::-webkit-scrollbar-thumb:hover': {}
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {getTableColumns(values.documentType).map((column) => (
                        <TableCell key={column.id} align={column.align} sx={{ minWidth: 100, backgroundColor: '#ededed' }}>
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
                            <TableCell key={column.id} align={column.align} sx={{ minWidth: 100 }}>
                              {column.id === 'lastPaymentDate'
                                ? formatDate(student[column.id])
                                : column.format === 'currency'
                                  ? `₹ ${formatCurrency(student[column.id])}`
                                  : student[column.id] || 'N/A'}
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

              <DialogActions style={{ marginTop: '12px' }}>
                <Button
                  variant="outlined"
                  disabled={!studentList?.length}
                  onClick={() => handleGenerateDocument(values)}
                  startIcon={<IconFileTypePdf stroke={1} color="#d64242" />}
                >
                  Download
                </Button>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default StudentsDocModal;
