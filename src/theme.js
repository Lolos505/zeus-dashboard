// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007aff', // MacOS blue
    },
    secondary: {
      main: '#ff2d55', // MacOS red
    },
    background: {
      default: '#f5f5f7', // Light grey background
    },
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', '"Open Sans"', '"Helvetica Neue"', 'sans-serif'].join(','),
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // MacOS-style shadow
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#000000',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;
