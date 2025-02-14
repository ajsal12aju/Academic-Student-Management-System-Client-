// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
//  * import logo from 'assets/images/logo.svg';
 *
 */
import logo from 'assets/images/logos/DIAT.png';

// ==============================|| LOGO SVG ||============================== //

const LogoLg = () => {
  const theme = useTheme();
  return (
    <img src={logo} alt="Berry" width="130" />
  );
};

export default LogoLg;
