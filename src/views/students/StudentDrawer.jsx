import React, { useEffect, useState } from 'react';
import { Drawer, Button, Box, Grid, Typography, Divider, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// import { useTheme } from '@emotion/react';
import StudentsDetail from './tabs/StudentsDetail';
import StudentsEdit from './tabs/StudentsEdit';
import StudentPayment from './tabs/StudentPayment';
import { useDispatch } from 'react-redux';
import { getStudentById } from 'container/branchContainer/slice';
import { useTheme } from '@emotion/react';

const DetailsDrawer = ({ open, onClose, student }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    setActiveTab('info');
    dispatch(getStudentById({ id: student?._id }));
  }, [student?._id]);

  // const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <StudentsDetail student={student} />;
      case 'edit':
        return <StudentsEdit student={student} />;
      case 'payment':
        return <StudentPayment student={student} />;
      default:
        return <Typography>No Tab Selected</Typography>;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '100%', md: '90%', lg: '70%', xl: '65%' },
          padding: '3% 2% 1.5% 3%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Grid container spacing={1} justifyContent="space-between" alignItems="flex-start">
          <Grid xs={11} item>
            {student && (
              <Grid container alignItems="center" spacing={1} flexWrap={{ xs: 'wrap', sm: 'nowrap' }}>
                {/* Student Name */}
                <Grid item xs={12} sm="auto">
                  <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                    {student?.name}
                  </Typography>
                </Grid>

                {/* Divider - Visible only on sm and above */}
                <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Divider sx={{ height: '30px' }} orientation="vertical" />
                </Grid>

                {/* Admission No. */}
                <Grid item xs={12} sm="auto">
                  <Typography variant="subtitle1" color="gray">
                    {student?.admissionNo}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>

          <Grid xs={1} item>
            <IconButton
              onClick={onClose}
              sx={{ fontSize: '20px', padding: '8px', borderRadius: '50%', '&:hover': { backgroundColor: '#e0e0e0' } }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Divider sx={{ paddingTop: { xs: '8px', sm: '0px' } }} />

        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab value="info" label="Info" />
          <Tab value="payment" label="Payment" />
          <Tab value="edit" label="Edit" />
        </Tabs>

        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            paddingRight: 1,
            '&::-webkit-scrollbar': {
              width: '10px' // Scrollbar width
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: theme.palette.grey[100], // Scrollbar track color
              borderRadius: '10px' // Rounded track
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#cfcccc', // Thumb color
              borderRadius: '10px', // Rounded thumb
              border: `2px solid ${theme.palette.grey[100]}` // Adds a gap effect around the thumb
            },
            '&::-webkit-scrollbar-thumb:hover': {
              // backgroundColor: theme.palette.primary.main, // Thumb color on hover
            }
          }}
          my={1}
        >
          {renderActiveTabContent()}
        </Box>

        <Box sx={{ marginTop: 'auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button onClick={onClose} variant="contained" fullWidth>
                Close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DetailsDrawer;
