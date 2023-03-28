import { createTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

export const Theme = () => {
  const prefersDarkMode = useSelector(state => state.settings.prefersDarkMode);
  return createTheme({
    palette: {
      type: prefersDarkMode ? 'dark' : 'light',
      primary: {
        main: prefersDarkMode ? '#acd370' : '#47680f'
      },
      secondary: {
        main: prefersDarkMode ? '#ffb86e' : '#8a5100'
      },
      background: {
        default: prefersDarkMode ? '#1b1c18' : '#f6f4ed',
        paper: prefersDarkMode ? '#35382f' : '#e0e3d4'
      },
      error: {
        main: prefersDarkMode ? '#ffb4ab' : '#f44336'
      },
      warning: {
        main: prefersDarkMode ? '#ffb86e' : '#8a5100'
      },
      text: {
        primary: prefersDarkMode ? '#e2f5da' : '#14290a',
        secondary: prefersDarkMode ? '#d8fac8b3' : '#0a1505b3'
      },
      divider: prefersDarkMode ? '#6a6e65' : '#a4ab9a'
    },
    typography: {
      fontFamily: 'Lexend Deca'
    },
    shape: {
      borderRadius: 10
    },
    overrides: {
      MuiSwitch: {
        root: {
          width: 47,
          height: 24,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(22px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 18,
          height: 18,
          margin: 2,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
  })}