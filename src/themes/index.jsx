import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';

// assets
import colors from 'assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */
const ThemedComponent = ({ customization }) => {
    const mode = useSelector((state) => state.login.themeMode); // Moved inside component
    const color = colors;

    const themeOption =
        mode == 'dark'
            ? {
                  colors: color,
                  heading: color.headingText,
                  paper: color.darkPaper,
                  backgroundDefault: color.darkPaper,
                  background: color.darkPrimaryLight,
                  darkTextPrimary: color.headingSubText,
                  darkTextSecondary: color.primaryLight,
                  textDark: color.headingText,
                  menuSelected: color.darkSecondaryDark,
                  menuSelectedBack: color.darkSecondaryLight,
                  divider: color.grey200,
                  customization,
                  mode // Include mode in the theme option
              }
            : {
                  colors: color,
                  heading: color.grey900,
                  paper: color.paper,
                  backgroundDefault: color.paper,
                  background: color.primaryLight,
                  darkTextPrimary: color.grey700,
                  darkTextSecondary: color.grey500,
                  textDark: color.grey900,
                  menuSelected: color.secondaryDark,
                  menuSelectedBack: color.secondaryLight,
                  divider: color.grey200,
                  customization
              };

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
        typography: themeTypography(themeOption)
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default ThemedComponent;
