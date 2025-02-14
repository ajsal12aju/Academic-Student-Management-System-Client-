import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// assets
import { IconBrandWhatsapp } from '@tabler/icons-react';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const contacts = [
  { name: 'Saleem Sir', role: 'Manager', number: '7012662939' },
  { name: 'Reheesh Sir', role: 'S C M', number: '8848025797' },
  { name: 'Anas Sir', role: 'Principal', number: '9539082261' },
  { name: 'Shaheed Sir', role: 'IT', number: '8921898118' },
  { name: 'Shareef Sir', role: 'Lab', number: '9539742696' },
  { name: 'Ananya Mis', role: 'Electronics', number: '9074673608' },
  { name: 'Jishad Sir', role: '3rd Module Regular', number: '9496904859' },
  { name: 'Salam Sir', role: '2nd Module Regular', number: '9497419390' },
  { name: 'Sachin Sir', role: '1st Module Regular', number: '9037353587' },
  { name: 'Shijin Sir', role: '', number: '9207093193' },
  { name: 'Zeniya', role: 'Office Admin', number: '8281060688' },
  { name: 'Shihana', role: 'Accountant', number: '8547747402' },
  { name: 'Raha', role: 'Telecalling Executive', number: '8960886633' },
  { name: 'Shahla', role: 'Telecalling', number: '9778547007' },
  { name: 'Faija', role: 'Telecalling', number: '9516007008' },
  { name: 'Nandhu', role: 'Camera', number: '7025616361' },
  { name: 'Maruthi (Courier)', role: '', number: '6282838262' },
  { name: 'DTDC (Courier)', role: '', number: '7907800558' },
  { name: 'T S Water', role: '', number: '9744927854' },
  { name: 'Latheef Bismi (ID Card)', role: '', number: '9048778236' },
  { name: 'Bazooka (Certificate)', role: '', number: '9846753997' },
  { name: 'Tea Shop 1', role: '', number: '9645230308' },
  { name: 'Tea Shop 2', role: '', number: '9447232578' }
];

const PopularCard = ({ isLoading }) => {

  const theme = useTheme();

  const handleWhatsappClick = (number) => {
    window.open(`https://wa.me/${number}`, '_blank');
  };

  const handleCopyNumber = (number) => {
    navigator.clipboard.writeText(number);
    // alert('Number copied to clipboard');
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false} sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent sx={{padding:"24px 8px 24px 24px"}}>
            <Grid container spacing={1}>
              <Grid item pt={2} pb={1} xs={12}>
                <Typography variant="h4">Important Contacts</Typography>
              </Grid>
              <Grid
                item
                py={2}
                xs={12}
                sx={{
                  maxHeight: '70vh',
                  overflow:"auto",
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
              >
                {contacts.map((contact, index) => (
                  <Grid item xs={12} key={index} pr={2}>
                    <Grid container direction="column">
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1">{contact.name}</Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <a href={`tel:+${contact.number}`} style={{ textDecoration: 'none' }}>
                                  <Typography variant="subtitle1">{contact.number}</Typography>
                                </a>
                              </Grid>
                              <Grid item>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '5px',
                                    bgcolor: 'success.light',
                                    color: 'success.dark',
                                    ml: 2,
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => handleWhatsappClick(contact.number)}
                                >
                                  <IconBrandWhatsapp />
                                </Avatar>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">{contact.role}</Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 1.5 }} />
                  </Grid>
                ))}{' '}
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
