import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Container, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import WelcomeImage from 'assets/images/Onboarding-amico.svg';
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

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
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={(values, actions) => {
                            console.log(values);
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <Box mb={3}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email address"
                                        variant="outlined"
                                        margin="normal"
                                        error={Boolean(errors.email && touched.email)}
                                        helperText={errors.email && touched.email ? errors.email : ''}
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
                                    disabled={isSubmitting}
                                >
                                    Sign in
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
