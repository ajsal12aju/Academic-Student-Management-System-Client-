import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Checkbox,
  FormHelperText,
  Autocomplete
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudentById, getCourses, getStudentById } from 'container/branchContainer/slice';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import BatchPicker from 'ui-component/BatchPicker';
import { useNavigate, useParams } from 'react-router-dom';
import states from 'utils/masterData/indianStateDisdata.json';
import config from 'config';

const StudentsEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const courses = useSelector((state) => state.branch.courseList);
  const studentData = useSelector((state) => state.branch.studentDetails?.student);
  const loading = useSelector((state) => state.branch.loading);
  const updateSuccess = useSelector((state) => state.branch.updateSuccess);
  const divisions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const [stateNames, setStateNames] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (!courses || courses.length === 0) {
      dispatch(getCourses());
    }
    setStateNames(states.states.map((stateObj) => stateObj.state));
  }, []);

  useEffect(() => {
    if (studentData?.state) {
      const stateData = states.states.find((data) => data.state === studentData.state);
      if (stateData) {
        setDistricts(stateData.districts);
      }
    }
  }, [studentData]);

  useEffect(() => {
    if (studentData?.photoURL) {
      setPhotoPreview(`${config.ip}/${studentData?.photoURL}`);
      // setPhotoPreview(studentData.photoURL);
    }
  }, [studentData]);

  // useEffect(() => {
  //   if (updateSuccess) {
  //     toast.success('Student updated successfully');
  //     navigate('/students/view');
  //   }
  // }, [updateSuccess, navigate]);

  const currentYear = dayjs().year();
  const academicYears = [`${currentYear - 1}-${currentYear}`, `${currentYear}-${currentYear}`, `${currentYear}-${currentYear + 1}`];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      admissionDate: studentData?.admissionDate || new Date(),
      course: studentData?.course || '',
      academicYear: studentData?.academicYear || '',
      classCode: studentData?.classCode || null,
      division: studentData?.division || null,
      admissionNo: studentData?.admissionNo || '',
      rollNo: studentData?.rollNo || '',
      name: studentData?.name || '',
      mobile: studentData?.mobile || '',
      email: studentData?.email || '',
      dob: studentData?.dob || '',
      gender: studentData?.gender || 'male',
      uid: studentData?.uid || '',
      photoURL: studentData?.photoURL || null,
      qualification: studentData?.qualification || '',
      state: studentData?.state || 'Kerala',
      district: studentData?.district || '',
      pinCode: studentData?.pinCode || '',
      address: studentData?.address || '',
      guardianName: studentData?.guardianName || '',
      guardianMobile: studentData?.guardianMobile || '',
      placement: studentData?.placement || false,
      discount: studentData?.discount || '',
      bloodGroup: studentData?.bloodGroup || '',
      healthCondition: studentData?.healthCondition || '',
      identificationMarks: studentData?.identificationMarks || '',
      batchDetails: studentData?.batchDetails || null,
      batch: studentData?.batch || '',
      batchCode: studentData?.batchCode || '',
      batchType: studentData?.batchType || ''
    },
    validationSchema: Yup.object({
      admissionDate: Yup.string().required('Admission date is required '),
      academicYear: Yup.string().required('academicYear  is required'),
      division: Yup.string().required('Division is required'),
      course: Yup.string().required('course is required'),
      batch: Yup.string().required('batch is required'),
      batchCode: Yup.string().required('batchCode is required'),
      classCode: Yup.string().required('classCode is required'),
      batchType: Yup.string().required('batchType is required'),
      admissionNo: Yup.string().required('Admission No is required'),
      rollNo: Yup.number().required('Roll No is required'),
      name: Yup.string().required('Name is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      dob: Yup.date().required('Date of Birth is required').max(new Date(), 'Date of Birth cannot be in the future'),
      gender: Yup.string().required('Gender is required'),
      uid: Yup.string()
        .matches(/^\d{12}$/, 'UID number must be exactly 12 digits')
        .required('UID number is required'),
      qualification: Yup.string().required('Qualification is required'),
      district: Yup.string().required('District is required'),
      pinCode: Yup.number()
        .test('len', 'Pin Code must be 6 digits', (val) => val && val.toString().length === 6)
        .required('Pin Code is required'),
      address: Yup.string().required('Address is required'),
      guardianName: Yup.string().required('Guardian Name is required'),
      guardianMobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Guardian mobile number must be 10 digits')
        .required('Guardian Mobile is required'),
      placement: Yup.boolean().required('Placement is required'),
      bloodGroup: Yup.string().required('Blood Group is required')
    }),
    onSubmit: (values) => {
      dispatch(updateStudentById({ id, ...values }));
    }
  });

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, JPG)');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      toast.error('File size must not exceed 1MB');
      return;
    }

    formik.setFieldValue('photo', file);

    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    formik.setFieldValue('photo', null);
  };

  return (
    <div>
      <Typography py={2} px={1} variant="h4" gutterBottom>
        Edit Student Details
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider sx={{ fontSize: '12px' }} textAlign="left">
              Academic Info
            </Divider>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                fullWidth
                readOnly
                label="Admission Date"
                value={formik.values.admissionDate ? dayjs(formik.values.admissionDate) : null}
                onChange={(newValue) => {
                  formik.setFieldValue('admissionDate', newValue ? newValue.toDate() : null);
                }}
                maxDate={dayjs()}
                renderInput={(params) => (
                  <TextField {...params} size="small" label="Date" variant="filled" InputProps={{ disableUnderline: true }} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Autocomplete
              readOnly
              fullWidth
              id="course"
              name="course"
              options={courses || []}
              getOptionLabel={(option) => option || ''}
              value={formik.values.course || null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Course"
                  error={formik.touched.course && Boolean(formik.errors.course)}
                  helperText={formik.touched.course && formik.errors.course}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2.25}>
            <Autocomplete
              fullWidth
              readOnly
              id="academicYear"
              name="academicYear"
              options={academicYears}
              getOptionLabel={(option) => option}
              value={formik.values.academicYear}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Academic Year"
                  error={formik.touched.academicYear && Boolean(formik.errors.academicYear)}
                  helperText={formik.touched.academicYear && formik.errors.academicYear}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3.75}>
            <BatchPicker
              readOnly
              value={{
                batchYear: studentData.batchYear,
                batchMonth: studentData.batchMonth,
                batchType: studentData.batchType
              }}
              course={formik.values.course}
              onBlur={formik.handleBlur}
              error={formik.touched.batchDetails && Boolean(formik.errors.batchDetails)}
              helperText={{
                academicYear: formik.touched.batchDetails?.academicYear && formik.errors.batchDetails?.academicYear,
                month: formik.touched.batchDetails?.month && formik.errors.batchDetails?.month,
                batch: formik.touched.batchDetails?.batch && formik.errors.batchDetails?.batch
              }}
            />
          </Grid>

          <Grid item xs={4} sm={6} md={2} lg={1.5}>
            <Autocomplete
              fullWidth
              id="division"
              name="division"
              options={divisions}
              getOptionLabel={(option) => option}
              value={formik.values.division}
              onChange={(_, newValue) => {
                formik.setFieldValue('division', newValue || '');
              }}
              onBlur={formik.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Division"
                  error={formik.touched.division && Boolean(formik.errors.division)}
                  helperText={formik.touched.division && formik.errors.division}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ fontSize: '12px' }} textAlign="left">
              Basic Info
            </Divider>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent={'center'} direction={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12} lg={12} xl={10.5}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formik.values.name}
                      onChange={(e) => {
                        const value = e.target.value
                          .split(' ')
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                          .join(' ');
                        formik.setFieldValue('name', value);
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Mobile"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                      helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        fullWidth
                        label="Date of Birth"
                        value={formik.values.dob ? dayjs(formik.values.dob) : null}
                        onChange={(newValue) => {
                          formik.setFieldValue('dob', newValue ? newValue.toDate() : null);
                        }}
                        maxDate={dayjs()}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Date of Birth"
                            variant="filled"
                            InputProps={{ disableUnderline: true }}
                            error={formik.touched.dob && Boolean(formik.errors.dob)}
                            helperText={formik.touched.dob && formik.errors.dob}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="gender" name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                      {formik.touched.gender && formik.errors.gender && <FormHelperText error>{formik.errors.gender}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="UID (Aadhar)"
                      name="uid"
                      value={formik.values.uid}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.uid && Boolean(formik.errors.uid)}
                      helperText={formik.touched.uid && formik.errors.uid}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Qualification"
                      name="qualification"
                      value={formik.values.qualification}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                      helperText={formik.touched.qualification && formik.errors.qualification}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Blood Group"
                      name="bloodGroup"
                      value={formik.values.bloodGroup}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                      helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      label="Health Condition"
                      name="healthCondition"
                      value={formik.values.healthCondition}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.healthCondition && Boolean(formik.errors.healthCondition)}
                      helperText={formik.touched.healthCondition && formik.errors.healthCondition}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      label="Identification Marks"
                      name="identificationMarks"
                      value={formik.values.identificationMarks}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.identificationMarks && Boolean(formik.errors.identificationMarks)}
                      helperText={formik.touched.identificationMarks && formik.errors.identificationMarks}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ fontSize: '12px' }} textAlign="left">
                      Address Info
                    </Divider>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Autocomplete
                      fullWidth
                      id="state"
                      name="state"
                      options={stateNames}
                      getOptionLabel={(option) => option}
                      value={formik.values.state}
                      onChange={(_, newValue) => {
                        formik.setFieldValue('state', newValue || '');
                        const stateData = states.states.find((data) => data.state === newValue);
                        if (stateData) {
                          setDistricts(stateData.districts);
                        }
                      }}
                      onBlur={formik.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="State"
                          error={formik.touched.state && Boolean(formik.errors.state)}
                          helperText={formik.touched.state && formik.errors.state}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Autocomplete
                      fullWidth
                      id="district"
                      name="district"
                      options={districts}
                      getOptionLabel={(option) => option}
                      value={formik.values.district}
                      onChange={(_, newValue) => formik.setFieldValue('district', newValue || '')}
                      onBlur={formik.handleBlur}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="District"
                          error={formik.touched.district && Boolean(formik.errors.district)}
                          helperText={formik.touched.district && formik.errors.district}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Pin Code"
                      name="pinCode"
                      value={formik.values.pinCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                      helperText={formik.touched.pinCode && formik.errors.pinCode}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ fontSize: '12px' }} textAlign="left">
                      Relational Info
                    </Divider>
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Guardian Name"
                      name="guardianName"
                      value={formik.values.guardianName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.guardianName && Boolean(formik.errors.guardianName)}
                      helperText={formik.touched.guardianName && formik.errors.guardianName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Guardian Mobile"
                      name="guardianMobile"
                      value={formik.values.guardianMobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.guardianMobile && Boolean(formik.errors.guardianMobile)}
                      helperText={formik.touched.guardianMobile && formik.errors.guardianMobile}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} lg={12} xl={1.5}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12}>
                    <input accept="image/*" style={{ display: 'none' }} id="photo-upload" type="file" onChange={handlePhotoUpload} />
                    <label htmlFor="photo-upload">
                      {/* <Button variant="contained" component="span" startIcon={<PhotoCameraIcon />} fullWidth> */}
                        Upload Photo
                      {/* </Button> */}
                    </label>
                  </Grid>

                  <Grid item xs={12}>
                    {photoPreview && (
                      <div style={{ textAlign: 'center' }}>
                        <img src={photoPreview} alt="Student" style={{ width: '100%', maxWidth: '150px', borderRadius: '8px' }} />
                        <Button variant="outlined" color="error" onClick={clearPhoto} style={{ marginTop: '8px' }}>
                          Clear Photo
                        </Button>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Discount"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.discount && Boolean(formik.errors.discount)}
              helperText={formik.touched.discount && formik.errors.discount}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled>
              {loading ? 'Updating...' : 'Update Student'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default StudentsEdit;
