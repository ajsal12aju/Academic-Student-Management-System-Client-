import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Container, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import WelcomeImage from 'assets/images/Onboarding-amico.svg';

import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'container/LoginContainer/slice'; // Import login action
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.login.loading);

    const LoginSchema = Yup.object().shape({
        user_name: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    });

    return (
        <Grid container sx={{ height: '100vh' }}>
            {/* Left side - Image */}
            <Grid
                item
                xs={false}
                lg={5}
                sx={{
                    display: { xs: 'none', lg: 'block' },
                    position: 'relative',
                    backgroundImage: 'url(/?height=1080&width=1080)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <Box
                    sx={{
                        paddingTop: '10px',
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom right, #1a231f, #135030, #5cb07a)',
                        opacity: 0.2
                    }}
                />
                <img style={{ paddingTop: '50px' }} src={WelcomeImage} alt="" />
            </Grid>

            {/* Right side - Login Form */}
            <Grid
                item
                xs={12}
                lg={7}
                container
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: 'rgb(18, 18, 18)', p: 5 }}
            >
                <Container maxWidth="sm">
                    <Box textAlign="center" mb={4}>
                        <Typography variant="h1" color="white" fontWeight="bold">
                            Welcome Back
                        </Typography>
                        <Typography variant="h4" color="gray">
                            Please sign in to your account
                        </Typography>
                    </Box>

                    <Formik
                        initialValues={{ user_name: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            dispatch(userLogin({ ...values, navigate })); // ✅ Include navigate
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Box mb={3}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        id="user_name"
                                        name="user_name"
                                        label="User Name"
                                        variant="outlined"
                                        margin="normal"
                                        error={Boolean(errors.user_name && touched.user_name)}
                                        helperText={errors.user_name && touched.user_name ? errors.user_name : ''}
                                        InputProps={{
                                            sx: { color: 'white', backgroundColor: '#121212' }
                                        }}
                                        InputLabelProps={{
                                            sx: { color: 'white', fontSize: '15px' },
                                            shrink: true // Fixes label overlap issue
                                        }}
                                        sx={{
                                            '& label.Mui-focused': { color: 'white' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { border: '3px solid #0a7d3e' },
                                                '&:hover fieldset': { border: '3px solid #0a7d3e' },
                                                '&.Mui-focused fieldset': { border: '3px solid #0a7d3e' }
                                            }
                                        }}
                                    />
                                </Box>
                                <Box mb={3}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        margin="normal"
                                        error={Boolean(errors.password && touched.password)}
                                        helperText={errors.password && touched.password ? errors.password : ''}
                                        InputProps={{
                                            sx: { color: 'white', backgroundColor: '#121212' },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? (
                                                            <VisibilityOff sx={{ color: 'gray' }} />
                                                        ) : (
                                                            <Visibility sx={{ color: 'gray' }} />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        InputLabelProps={{
                                            sx: { color: 'white', fontSize: '15px' },
                                            shrink: true // Fixes label overlap issue
                                        }}
                                        sx={{
                                            '& label.Mui-focused': { color: 'white' },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { border: '3px solid #0a7d3e' },
                                                '&:hover fieldset': { border: '3px solid #0a7d3e' },
                                                '&.Mui-focused fieldset': { border: '3px solid #0a7d3e' }
                                            }
                                        }}
                                    />
                                </Box>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#1f834b',
                                        '&:hover': { backgroundColor: '#0a7d3e' },
                                        color: 'white',
                                        fontWeight: 'bold',
                                        py: 1.5
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
