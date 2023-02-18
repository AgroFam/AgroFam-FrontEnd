import { createTheme } from '@material-ui/core/styles';
export const Theme = (prefersDarkMode) => 
    createTheme({
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
            primary: prefersDarkMode ? '#e2f5da' : '#14290a'
            },
          divider: prefersDarkMode ? '#6a6e65' : '#a4ab9a'
        },
        typography: {
          fontFamily: 'Lexend Deca'
        },
        shape: {
          borderRadius: 10
        }
      })