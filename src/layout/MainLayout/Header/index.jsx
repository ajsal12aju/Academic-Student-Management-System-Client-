import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Switch from '@mui/material/Switch';

// project imports
import LogoSection from '../LogoSection';

import ProfileSection from './ProfileSection';
toggleTheme;
import { toggleTheme } from 'container/LoginContainer/slice';
// assets
import { IconMenu2 } from '@tabler/icons-react';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));

    // const themeMode = useSelector((state) => state.login.themeMode);

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '8px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            {/* header search */}
            {/* <SearchSection /> */}
            <Typography px={3} variant="body2" sx={{ color: theme.palette.grey[400] }}>
                {user?.branch?.branch_name || 'DIAT'}
            </Typography>{' '}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />
            {/* notification & profile */}
            {/* <NotificationSection /> */}
            <Switch checked={theme.palette.mode === 'dark'} onChange={() => dispatch(toggleTheme())} color="default" />
            <ProfileSection />
        </>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
