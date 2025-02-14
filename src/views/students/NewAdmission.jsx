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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Placeholder icon
import { useDispatch, useSelector } from 'react-redux';
import { addStudent, genarateAdmissionNo, getCourses } from 'container/branchContainer/slice';
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import BatchPicker from 'ui-component/BatchPicker';
import { useNavigate } from 'react-router-dom';
import states from 'utils/masterData/indianStateDisdata.json';
import config from 'config';

const NewAdmission = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Formik setup

  const newAdmission = useSelector((state) => state.branch.newAdmission);
  const loading = useSelector((state) => state.branch.loading);
  const admission = useSelector((state) => state.branch.admission);
  const divisions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const [stateNames, setstateNames] = useState([]);
  const [districts, setDistricts] = useState(states?.states.find((data) => data.state === 'Kerala').districts || []);

  const courses = useSelector((state) => state.branch.courseList);

  useEffect(() => {
    if (!courses || courses == []) {
      dispatch(getCourses());
    }
    setstateNames(states.states.map((stateObj) => stateObj.state));
  }, []);
  const [photoPreview, setPhotoPreview] = useState(null);
  const initialValuesTest = {
    admissionDate: new Date(),
    courseobj: null,
    courseId: '',
    course: '',
    academicYear: '2025-2025',
    classCode: null,
    division: null,
    admissionNo: '',
    rollNo: '',
    name: 'Test Student-',
    mobile: '9999999000',
    email: 'teststudent@gmail.com',
    dob: '',
    gender: 'male',
    uid: '789456132001',
    // photoURL: null,
    qualification: 'Diploma',
    state: 'Kerala',
    district: 'Kozhikode',
    pinCode: '666666',
    address: 'lorem lipsum 2 lorem litpol',
    guardianName: 'Test gauridain',
    guardianMobile: '9999999999',
    placement: false,
    discount: '',
    bloodGroup: 'O-',
    healthCondition: 'lorem lipsum',
    identificationMarks: 'lorem lipsum'
  };
  const initialValues = {
    admissionDate: new Date(),
    courseobj: null,
    courseId: '',
    course: '',
    academicYear: '',
    classCode: null,
    division: null,
    admissionNo: '',
    rollNo: '',
    name: '',
    mobile: '',
    email: '',
    dob: '',
    gender: '',
    uid: '',
    photoURL: null,
    qualification: '',
    state: 'Kerala',
    district: '',
    pinCode: '',
    address: '',
    houseNo: '',
    guardianName: '',
    guardianMobile: '',
    placement: false,
    discount: '',
    bloodGroup: '',
    healthCondition: '',
    identificationMarks: ''
  };
  const formik = useFormik({
    initialValues: config.env == 'development' ? initialValuesTest : initialValues,
    validationSchema: Yup.object({
      admissionDate: Yup.string().required('Admission date is required '),
      academicYear: Yup.string().required('academicYear  is required'),
      division: Yup.string().required('Division is required'),
      courseobj: Yup.object().required('course is required'),
      course: Yup.string().required('course is required'),
      courseId: Yup.string().required('courseId is required'),
      courseName: Yup.string().required('courseName is required'),
      // batch: Yup.string().required('batch is required'),
      batchCode: Yup.string().required('batchCode is required'),
      classCode: Yup.string().required('classCode is required'),

      batchType: Yup.string().required('batchType is required'),
      admissionNo: Yup.string().required('Admission No is required.Select batch & division to get one'),
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
      // pinCode: Yup.string().required('Pin Code is required'),
      pinCode: Yup.number()
        .test('len', 'Pin Code must be 6 digits', (val) => val && val.toString().length === 6)
        .required('Pin Code is required'),

      address: Yup.string().required('Address is required'),
      guardianName: Yup.string().required('Guardian Name is required'),
      guardianMobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Guardian mobile number must be 10 digits')
        .required('Guardian Mobile is required'),
      placement: Yup.boolean().required('Placement is required'), // Updated to boolean
      discount: Yup.string(), // Assuming this field can be optional
      bloodGroup: Yup.string().required('Blood Group is required'),
      identificationMarks: Yup.string(), // Optional, if you want it to be required, remove the `.string()`
      healthCondition: Yup.string() // Optional, if required, remove `.string()`
    }),

    onSubmit: (values) => {
      dispatch(addStudent(values));
    }
  });

  // const handlePhotoUpload = (event) => {
  //   const file = event.target.files[0];

  //   if (!file) return;

  //   const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  //   if (!validTypes.includes(file.type)) {
  //     toast.error('Please upload a valid image (JPEG, PNG, JPG)');
  //     return;
  //   }

  //   if (file.size > 1 * 1024 * 1024) {
  //     toast.error('File size must not exceed 2MB');
  //     return;
  //   }

  //   formik.setFieldValue('photo', file);

  //   const reader = new FileReader();
  //   reader.onloadend = () => setPhotoPreview(reader.result);
  //   reader.readAsDataURL(file);
  // };
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, JPG)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size must not exceed 2MB');
      return;
    }

    console.log('Original file size:', (file.size / 1024).toFixed(2), 'KB');

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 400;
        const maxHeight = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const resizedFile = new File([blob], file.name, { type: file.type });

            // Log the size of the resized image
            console.log('Resized file size:', (resizedFile.size / 1024).toFixed(2), 'KB');

            formik.setFieldValue('photo', resizedFile);
            setPhotoPreview(URL.createObjectURL(resizedFile));
          },
          file.type,
          0.8
        );
      };
    };
  };

  const clearPhoto = () => {
    setPhotoPreview(null);
    formik.setFieldValue('photo', null);
  };

  const currentYear = dayjs().year();
  const academicYears = [`${currentYear - 1}-${currentYear}`, `${currentYear}-${currentYear}`, `${currentYear}-${currentYear + 1}`];

  const generateAdmissionNo = (division, values) => {
    console.log('%c [ values ]-142', 'font-size:13px; background:pink; color:#bf2c9f;', values);
    if (division && values.courseobj) {
      const classCode = `${values.batchDetails?.yearNumber}-${values.batchDetails?.monthNumber}-${values.courseobj.course_code}-${division}-${values.batchDetails?.batchType?.slice(0, 1)}`;
      dispatch(
        genarateAdmissionNo({
          batchYM: values.batchDetails?.batchYM,
          batchCode: values.batchDetails?.batchCode,
          classCode: classCode,
          batchType: values.batchDetails?.batchType,
          division: division,
          course: values.courseobj.course_code
        })
      );
      formik.setFieldValue('classCode', classCode);
    }
  };

  useEffect(() => {
    if ((formik.values.division && formik.values.division !== '', newAdmission?.admissionNo && newAdmission?.rollNo)) {
      formik.setFieldValue('admissionNo', newAdmission.admissionNo);
      formik.setFieldValue('classCode', newAdmission.classCode);
      formik.setFieldValue('rollNo', newAdmission.rollNo);
    } else {
      return;
    }
  }, [newAdmission]);

  useEffect(() => {
    if (admission?.success) {
      formik.resetForm({ values: config.env == 'development' ? initialValuesTest : initialValues });
      setPhotoPreview(null);
    }
  }, [admission?.success]);

  return (
    <div>
      <Typography py={2} px={1} variant="h4" gutterBottom>
        Admission Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Divider sx={{ fontSize: '12px' }} textAlign="left">
              Accademic Info
            </Divider>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Admission Date"
                renderInput={(params) => (
                  <TextField {...params} fullWidth label="Date" variant="filled" InputProps={{ disableUnderline: true }} />
                )}
                value={formik.values.admissionDate ? dayjs(formik.values.admissionDate) : null}
                onChange={(newValue) => {
                  formik.setFieldValue('admissionDate', newValue ? newValue.toDate() : null);
                }}
                maxDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={1.5}>
            <Autocomplete
              fullWidth
              id="courseobj"
              name="courseobj"
              options={courses || []}
              getOptionLabel={(option) => option?.course_code || ''}
              value={formik.values.courseobj || null}
              onChange={(_, newValue) => {
                formik.setFieldValue('courseobj', newValue || null);
                formik.setFieldValue('courseName', newValue.course_name || null);
                formik.setFieldValue('course', newValue.course_code || null);
                formik.setFieldValue('courseFee', newValue.course_fee || null);
                formik.setFieldValue('courseId', newValue._id || '');
                formik.setFieldValue('pendingFeeAmount', newValue.course_fee || null);
                formik.setFieldValue('totalPaidFee', 0);
                formik.setFieldValue('admissionNo', '');
                formik.setFieldValue('division', '');
              }}
              onBlur={formik.handleBlur}
              getOptionSelected={(option, value) => option.course_code === value?.course_code}
              disabled={!formik.values.admissionDate}
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Course"
                  error={formik.touched.courseobj && Boolean(formik.errors.courseobj)}
                  helperText={formik.touched.courseobj && formik.errors.courseobj}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={2} xl={1.75}>
            <Autocomplete
              fullWidth
              id="academicYear"
              name="academicYear"
              options={academicYears}
              getOptionLabel={(option) => option}
              value={formik.values.academicYear}
              onChange={(_, newValue) => formik.setFieldValue('academicYear', newValue || '')}
              onBlur={formik.handleBlur}
              disabled={!formik.values.courseobj}
              disableClearable
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

          <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
            <BatchPicker
              value={formik.values.batchDetails}
              course={formik.values.course}
              onChange={(value) => {
                formik.setFieldValue('batchDetails', value);
                formik.setFieldValue('batchYear', value.batchYear);
                formik.setFieldValue('batchMonth', value.batchMonth);
                formik.setFieldValue('batchType', value.batchType);
                formik.setFieldValue('batchCode', value.batchCode);
                formik.setFieldValue('admissionNo', '');
                formik.setFieldValue('division', '');
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.batchDetails && Boolean(formik.errors.batchDetails)}
              helperText={{
                academicYear: formik.touched.batchDetails?.academicYear && formik.errors.batchDetails?.academicYear,
                month: formik.touched.batchDetails?.month && formik.errors.batchDetails?.month,
                batch: formik.touched.batchDetails?.batch && formik.errors.batchDetails?.batch
              }}
              disabled={!formik.values.academicYear} // Disable if academicYear is not selected
            />
          </Grid>

          <Grid item xs={4} sm={6} md={2} lg={1.5} xl={1.1}>
            <Autocomplete
              fullWidth
              id="division"
              name="division"
              options={divisions}
              getOptionLabel={(option) => option}
              value={formik.values.division}
              onChange={(_, newValue) => {
                formik.setFieldValue('division', newValue || '');
                formik.setFieldValue('admissionNo', '');
                generateAdmissionNo(newValue, formik.values);
              }}
              onBlur={formik.handleBlur}
              disableClearable
              disabled={!formik.values.batchDetails?.batchYear || !formik.values.batchDetails?.batchMonth}
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

          <Grid item xs={8} sm={6} md={4} lg={2.5}>
            <TextField
              disabled
              fullWidth
              label="Admission No"
              name="admissionNo"
              id="admissionNo"
              value={formik.values.admissionNo}
              error={formik.touched.admissionNo && Boolean(formik.errors.admissionNo)}
              helperText={formik.touched.admissionNo && formik.errors.admissionNo}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ fontSize: '12px' }} textAlign="left">
              basic Info
            </Divider>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent={'center'} direction={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12} lg={12} xl={10.5}>
                <Grid container spacing={2}>
                  {/* Name */}
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

                  {/* Mobile */}
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
                  {/* Email */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formik.values.email}
                      onChange={(e) => {
                        const value = e.target.value.toLowerCase();
                        formik.setFieldValue('email', value);
                      }}
                      // onChange={(e) => {
                      //   const value = e.target.value
                      //     .split(' ')
                      //     .map((word) => word.charAt(0).toLowerCase() + word.slice(1).toLowerCase())
                      //     .join(' '); // Join the words back together with spaces
                      //   formik.setFieldValue('email', value);
                      // }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

                  {/* Date of Birth */}
                  <Grid item xs={12} sm={6} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={formik.values.dob ? dayjs(formik.values.dob) : null}
                        onChange={(newValue) => {
                          formik.setFieldValue('dob', newValue ? newValue.toDate() : null);
                        }}
                        format="DD-MM-YYYY"
                        minDate={dayjs().subtract(50, 'years')}
                        maxDate={dayjs().subtract(10, 'years')}
                        label="Date of Birth"
                        error={formik.touched.dob && Boolean(formik.errors.dob)}
                        helperText={formik.touched.dob && formik.errors.dob}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            label="Date"
                            variant="filled"
                            InputProps={{ disableUnderline: true }}
                            error={formik.touched.dob && Boolean(formik.errors.dob)}
                            helperText={formik.touched.dob && formik.errors.dob}
                          />
                        )}
                      />
                      <Typography fontSize={12} py={1} px={2} variant="body1" color="error">
                        {formik.touched.dob && formik.errors.dob}
                      </Typography>
                    </LocalizationProvider>
                  </Grid>

                  {/* Gender */}
                  <Grid px={3} item xs={12} sm={6} md={4}>
                    <FormControl>
                      {/* <FormLabel>Gender</FormLabel> */}
                      <RadioGroup sx={{ paddingX: '30px' }} row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {/* UID */}
                  <Grid item xs={12} sm={6} md={4}></Grid>
                  {/* UID */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="UID No (Adhaar Number)"
                      name="uid"
                      value={formik.values.uid}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.uid && Boolean(formik.errors.uid)}
                      helperText={formik.touched.uid && formik.errors.uid}
                    />
                  </Grid>
                  {/* Qualification */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Education Qualification"
                      name="qualification"
                      select
                      value={formik.values.qualification}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.qualification && Boolean(formik.errors.qualification)}
                      helperText={formik.touched.qualification && formik.errors.qualification}
                    >
                      <MenuItem value="High School">High School</MenuItem>
                      <MenuItem value="Higher Secondary">Higher Secondary</MenuItem>
                      <MenuItem value="Diploma">Diploma</MenuItem>
                      <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                      <MenuItem value="Postgraduate">Postgraduate</MenuItem>
                    </TextField>
                  </Grid>

                  {/* Blood Group */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="blood Group"
                      name="bloodGroup"
                      select
                      value={formik.values.bloodGroup}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                      helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                    >
                      {/* ABO System */}
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>

                      {/* A1 and A2 */}
                      <MenuItem value="A1">A1</MenuItem>
                      <MenuItem value="A2">A2</MenuItem>

                      {/* Rare Blood Types */}
                      <MenuItem value="Bombay (Oh)">Bombay (Oh)</MenuItem>

                      {/* Kell System */}
                      <MenuItem value="K+">K+</MenuItem>
                      <MenuItem value="K-">K-</MenuItem>
                    </TextField>
                  </Grid>

                  {/* health condition */}
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      label="Identification mark"
                      name="identificationMarks"
                      value={formik.values.identificationMarks}
                      onChange={(e) => {
                        const value = e.target.value;
                        formik.setFieldValue('identificationMarks', value.charAt(0).toUpperCase() + value.slice(1));
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.identificationMarks && Boolean(formik.errors.identificationMarks)}
                      helperText={formik.touched.identificationMarks && formik.errors.identificationMarks}
                      multiline
                    />
                  </Grid>

                  {/* health condition */}
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      label="Health condition remarks"
                      name="healthCondition"
                      value={formik.values.healthCondition}
                      onChange={(e) => {
                        const value = e.target.value;
                        formik.setFieldValue('healthCondition', value.charAt(0).toUpperCase() + value.slice(1));
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.healthCondition && Boolean(formik.errors.healthCondition)}
                      helperText={formik.touched.healthCondition && formik.errors.healthCondition}
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Divider */}

              <Grid sx={{ display: 'flex', justifyContent: 'center' }} item xs={12} md={1.5}>
                <Button
                  sx={{
                    height: '180px',
                    width: '135px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  variant="outlined"
                  component="label"
                  fullWidth
                >
                  {photoPreview ? (
                    <>
                      <img
                        src={photoPreview}
                        alt="Preview"
                        style={{
                          height: '180px',
                          width: '135px',
                          padding: '2px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '2px solid #ccc' // Add border to the image
                        }}
                      />
                      <Button
                        onClick={clearPhoto} // Call the clear function when clicked
                        sx={{
                          fontSize: '10px',
                          position: 'absolute',
                          top: '5px',
                          right: '5px',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          borderRadius: '50%',
                          padding: '2px',
                          minWidth: '24px',
                          minHeight: '24px'
                        }}
                      >
                        X
                      </Button>
                    </>
                  ) : (
                    <>
                      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
                        <Grid sx={{ display: 'flex', justifyContent: 'center' }} item>
                          <PhotoCameraIcon style={{ fontSize: '30px', color: '#555' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="textSecondary">
                            Select Photo
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  )}
                  <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ fontSize: '12px' }} textAlign="left">
              Address Info
            </Divider>
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={6} md={4}>
            {/* <TextField fullWidth label="State" value="Kerala" disabled /> */}
            <Autocomplete
              fullWidth
              id="state"
              name="state"
              options={stateNames}
              getOptionLabel={(option) => option}
              value={formik.values.state}
              onChange={(_, newValue) => {
                formik.setFieldValue('state', newValue || '');
                formik.setFieldValue('district', '');
                setDistricts(states.states.find((data) => data.state === newValue).districts);
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
            {/* <TextField fullWidth label="State" value="Kerala" disabled /> */}
            <Autocomplete
              fullWidth
              id="district"
              name="district"
              options={districts}
              getOptionLabel={(option) => option}
              value={formik.values.district}
              onChange={(_, newValue) => {
                formik.setFieldValue('district', newValue || '');
              }}
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

          {/* District */}
          {/* <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="District"
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.district && Boolean(formik.errors.district)}
              helperText={formik.touched.district && formik.errors.district}
            />
          </Grid> */}

          {/* Pin Code */}
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

          {/* Place */}
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={2}
              value={formik.values.address}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue('address', value.charAt(0).toUpperCase() + value.slice(1));
              }}
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

          {/* Guardian Name */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Guardian Name"
              name="guardianName"
              value={formik.values.guardianName}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue('guardianName', value.charAt(0).toUpperCase() + value.slice(1));
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.guardianName && Boolean(formik.errors.guardianName)}
              helperText={formik.touched.guardianName && formik.errors.guardianName}
            />
          </Grid>

          {/* Guardian Mobile */}
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

          <Grid item xs={12}>
            <Divider sx={{ fontSize: '12px' }} textAlign="left">
              Additional Info
            </Divider>
          </Grid>

          {formik.values?.course == 'DCUP' && (
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Training Center"
                name="trainingCenter"
                select
                value={formik.values.trainingCenter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.trainingCenter && Boolean(formik.errors.trainingCenter)}
                helperText={formik.touched.trainingCenter && formik.errors.trainingCenter}
              >
                {/* ABO System */}
                <MenuItem value="Calicut">Calicut</MenuItem>
                <MenuItem value="Kochi">Kochi</MenuItem>
              </TextField>
            </Grid>
          )}

          {/* Discount */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Discount / Fee Concession"
              name="discount"
              value={formik.values.discount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.discount && Boolean(formik.errors.discount)}
              helperText={formik.touched.discount && formik.errors.discount}
            />
          </Grid>

          <Grid px={2} item xs={12} sm={6} md={4}>
            <FormControlLabel
              sx={{ paddingX: '16px' }}
              control={<Checkbox checked={formik.values.placement} onChange={formik.handleChange} name="placement" color="primary" />}
              label="Placement"
            />
            {formik.touched.placement && formik.errors.placement && <FormHelperText error>{formik.errors.placement}</FormHelperText>}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button sx={{ marginY: '8px' }} disabled={loading} color="primary" variant="contained" fullWidth type="submit">
              {loading ? <>Processing...</> : <>Submit</>}
            </Button>

            {formik.dirty && Object.keys(formik.errors).length > 0 && (
              <Typography color="error" variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                All fields are required.
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewAdmission;
