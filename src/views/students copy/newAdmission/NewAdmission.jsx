import React, { useState } from 'react';
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
  FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'; // Placeholder icon
import { useDispatch } from 'react-redux';
import { addStudent } from 'container/branchContainer/slice';
import { toast } from 'react-toastify';

const NewAdmission = () => {
  const dispatch = useDispatch()
  // Formik setup

  const [photoPreview, setPhotoPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
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
      postOffice: '',
      place: '',
      houseNo: '',
      guardianName: '',
      guardianMobile: '',
      placement: false,
      discount: '',
      classStartAt: '',
      bloodGroup: '',
      healthCondition: '',
      identificationMarks: '',
      student_id: "0000443DIATSTUDENT",
      course: "6784ebfff9a6546d41e93f06",
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      dob: Yup.date().required('Date of Birth is required').max(new Date(), 'Date of Birth cannot be in the future'),
      gender: Yup.string().required('Gender is required'),
      uid: Yup.string()
        .matches(/^\d{12}$/, 'UID number must be exactly 12 digits') // assuming it is Aadhaar format
        .required('UID number is required'),
      qualification: Yup.string().required('Qualification is required'),
      district: Yup.string().required('District is required'),
      postOffice: Yup.string().required('Post Office is required'),
      place: Yup.string().required('Place is required'),
      houseNo: Yup.string().required('House Name / No is required'),
      guardianName: Yup.string().required('Guardian Name is required'),
      guardianMobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Guardian mobile number must be 10 digits')
        .required('Guardian Mobile is required'),
      placement: Yup.boolean().required('Placement is required'), // Updated to boolean
      discount: Yup.string(), // Assuming this field can be optional
      classStartAt: Yup.date().required('Class Start Date is required').min(new Date(), 'Class Start Date cannot be in the past'),
      bloodGroup: Yup.string().required('Blood Group is required'),
      identificationMarks: Yup.string(), // Optional, if you want it to be required, remove the `.string()`
      healthCondition: Yup.string() // Optional, if required, remove `.string()`
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);
      dispatch(addStudent({ data: values}));
    }
  });



  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, JPG)");
      return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB size limit
      toast.error("File size must not exceed 2MB");
      return;
    }

    formik.setFieldValue('photo', file);

    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };



  return (
    <div>
      <Typography py={2} px={1} variant="h4" gutterBottom>
        New Admission Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent={'center'} direction={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12} md={10.5}>
                <Grid container spacing={2}>
                  {/* Name */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
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
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  {/* Date of Birth */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.dob && Boolean(formik.errors.dob)}
                      helperText={formik.touched.dob && formik.errors.dob}
                    />
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
                      value={formik.values.healthCondition}
                      onChange={formik.handleChange}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.healthCondition && Boolean(formik.errors.healthCondition)}
                      helperText={formik.touched.healthCondition && formik.errors.healthCondition}
                      multiline
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Divider */}

              <Grid item xs={12} md={1.5}>
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
                  ) : (
                    <>
                      <Grid container direction="column" alignItems="center" justifyContent="center" spacing={1}>
                        <Grid item>
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
            <TextField fullWidth label="State" value="Kerala" disabled />
          </Grid>

          {/* District */}
          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>

          {/* Post Office */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Post Office"
              name="postOffice"
              value={formik.values.postOffice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.postOffice && Boolean(formik.errors.postOffice)}
              helperText={formik.touched.postOffice && formik.errors.postOffice}
            />
          </Grid>

          {/* Place */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Place"
              name="place"
              value={formik.values.place}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.place && Boolean(formik.errors.place)}
              helperText={formik.touched.place && formik.errors.place}
            />
          </Grid>

          {/* House No */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="House Name / No"
              name="houseNo"
              value={formik.values.houseNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.houseNo && Boolean(formik.errors.houseNo)}
              helperText={formik.touched.houseNo && formik.errors.houseNo}
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
              onChange={formik.handleChange}
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
              Course Info
            </Divider>
          </Grid>

          <Grid px={2} item xs={12} sm={6} md={4}>
            <FormControlLabel
              sx={{ paddingX: '16px' }}
              control={<Checkbox checked={formik.values.placement} onChange={formik.handleChange} name="placement" color="primary" />}
              label="Placement"
            />
            {formik.touched.placement && formik.errors.placement && <FormHelperText error>{formik.errors.placement}</FormHelperText>}
          </Grid>

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

          {/* Class Start Date */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Class Start At"
              name="classStartAt"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.classStartAt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.classStartAt && Boolean(formik.errors.classStartAt)}
              helperText={formik.touched.classStartAt && formik.errors.classStartAt}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button sx={{ marginY: '8px' }} color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewAdmission;
