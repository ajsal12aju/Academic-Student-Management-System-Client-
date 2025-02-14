import React from 'react';
import { Drawer, Button, Box, Grid, Typography, Divider, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IconUser } from '@tabler/icons-react';
import config from 'config';
import { formatDate } from 'utils/formateDate';

const StaffDrawer = ({ open, onClose, staff }) => {

  const primaryDetails = [
    { label: 'Name', value: staff?.name },
    { label: 'Staff ID', value: staff?.admissionNo },
    { label: 'Email', value: staff?.email },
    { label: 'Mobile No.', value: staff?.phone },
    { label: 'Address', value: staff?.address },
    { label: 'Joining Date', value: staff?.joiningDate ? formatDate(staff?.joiningDate) : '' },
  ];

  
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '100%', md: '90%', lg: '70%' },
          padding: '3% 2% 1.5% 3%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Grid container spacing={1} justifyContent="space-between" alignItems="flex-start">
          <Grid item>
            {staff && (
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                    {staff?.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Divider orientation="vertical" />
                </Grid>
                <Grid item>
                  <Typography variant="h4" color="gray">
                    {staff?.staffId}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Grid>
          <Grid item>
            <IconButton onClick={onClose} sx={{ padding: '8px', borderRadius: '50%', '&:hover': { backgroundColor: '#e0e0e0' } }}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Divider />

        <Box sx={{ flexGrow: 1, overflowY: 'auto', paddingRight: 1 }} my={1}>
          <Box sx={{ p: 1 }}>
            <div id="print-area">
              <Grid
                container
                mt={0}
                sx={{
                  border: '2px dashed rgb(221, 221, 221)',
                  borderRadius: '8px',
                  padding: '16px',
                  bgcolor: 'background.default'
                }}
                direction={{ xs: 'column-reverse', md: 'row' }}
              >
                {/* <Grid container spacing={2} justifyContent={'center'} direction={{ xs: 'column-reverse', md: 'row' }}> */}

                <Grid item xs={10}>
                  <Grid container spacing={2}>
                    {primaryDetails.map((detail, index) => (
                      <Grid item xs={12} md={index % 2 === 0 ? 6 : 6} key={index}>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 'bold', mr: 1 ,minWidth:"60px"}}>
                            {detail.label}:
                          </Typography>
                          <Typography variant="body1">{detail.value || '-'}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/* Student Photo */}
                <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box
                    sx={{
                      marginBottom: '15px',
                      width: '90px',
                      height: '120px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '8px',
                      backgroundColor: '#f0f0f0', // Light gray background for the fallback icon
                      border: '1px solid #ddd' // Optional border
                    }}
                  >
                    {staff?.photoURL ? (
                      <img
                        src={`${config.ip}/${staff?.photoURL}`}
                        alt="Student"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                      />
                    ) : (
                      <IconUser stroke={2} size={80} color="#666" /> // Fallback icon
                      // <IconUser stroke={2} />
                    )}
                  </Box>
                </Grid>
              </Grid>

           
            </div>
          </Box>
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

export default StaffDrawer;
