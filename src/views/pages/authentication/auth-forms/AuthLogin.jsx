import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
  FormHelperText,
  Typography,
  Card,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { selectError, userLogin } from 'container/LoginContainer/slice';
import BackgroundImage from 'assets/images/logo-dark.svg'; // Ensure you have an appropriate image

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const errorRespHndle = useSelector(selectError);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container sx={{ height: '100vh', width: '100vw' }}>
      {/* Left Side - Image */}
      <Grid
        item
        xs={12} md={5}
        sx={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100%',
        }}
      />

      {/* Right Side - Login Form */}
      <Grid
        item
        xs={12} md={7}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(250.38deg, rgb(26, 35, 31) 2.39%, rgb(19, 80, 47) 32.42%, rgb(10, 125, 62) 60.95%, rgb(31, 143, 78) 84.83%, rgb(92, 176, 122) 104.37%)',
        }}
      >
        <Card sx={{ padding: 4, width: '90%', maxWidth: 400, bgcolor: 'rgba(0, 0, 0, 0.7)', color: 'white', borderRadius: 2 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Academic Management Login
          </Typography>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Invalid email').required('Required'),
              password: Yup.string().required('Required'),
            })}
            onSubmit={(values) => {
              dispatch(userLogin({ ...values, navigate }));
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
              <form noValidate onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }} error={touched.email && !!errors.email}>
                  <InputLabel>Email Address</InputLabel>
                  <OutlinedInput
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Email Address"
                  />
                  {touched.email && errors.email && <FormHelperText>{errors.email}</FormHelperText>}
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }} error={touched.password && !!errors.password}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {touched.password && errors.password && <FormHelperText>{errors.password}</FormHelperText>}
                </FormControl>
                {errorRespHndle && (
                  <Typography color="error" align="center" sx={{ mb: 2 }}>
                    Incorrect username or password.
                  </Typography>
                )}
                <Button fullWidth variant="contained" color="primary" type="submit">
                  Sign In
                </Button>
              </form>
            )}
          </Formik>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
