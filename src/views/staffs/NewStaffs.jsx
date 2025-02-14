import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useDispatch } from 'react-redux';
import { addStaff } from 'container/branchContainer/slice';
import { toast } from 'react-toastify';

const NewStaffs = () => {
  const dispatch = useDispatch();
  const [photoPreview, setPhotoPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      qualification: '',
      photo: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
      address: Yup.string().required('Address is required'),
      qualification: Yup.string().required('Qualification is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('address', values.address);
      formData.append('qualification', values.qualification);
      if (values.photo) {
        formData.append('photo', values.photo);
      }

      try {
        dispatch(addStaff(formData));
        resetForm();
        setPhotoPreview(null);
      } catch (error) {
        toast.error('Failed to add staff. Please try again.');
      }
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
          0.7 
        );
      };
    };
  };

  return (
    <div>
      <Typography py={2} px={1} variant="h4" gutterBottom>
        Add Staff Form
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <Grid container spacing={2} justifyContent={'center'} direction={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12}>
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

                  {/* Phone */}
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>

                  {/* Address */}
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

                  {/* Qualification */}
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} md={2}>
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

export default NewStaffs;
