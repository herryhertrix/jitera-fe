import { createTheme } from "@mui/material/styles";
import type {} from '@mui/x-date-pickers-pro/themeAugmentation';

const themeConstants = {
  paper: "#F9F9F9",
  primary: {
    main: "#fff",
    dark: "#0a1929",
  },
  secondary: {
    main: "#212121",
    dark: "#0a1929",
  },
  error: {
    main: "#b22222",
    dark: "#8b0000",
  },
  fg: { main: "#fff", dark: "0a1929" },
  breakpoints: {
    xs: 0,
    mb: 350,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

// Check here for more configurations https://material-ui.com/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: themeConstants.primary,
    secondary: themeConstants.secondary,
    background: { paper: themeConstants.paper },
    text: {
      primary: themeConstants.fg.main,
      secondary: themeConstants.fg.dark,
    },
    error: themeConstants.error,
  },
  breakpoints: {
    values: themeConstants.breakpoints,
  },
  components: { 
    MuiDatePicker: {
      styleOverrides: {
        root: {
          backgroundColor: 'blue',
        },
      },
    },
  },
});

export { theme };