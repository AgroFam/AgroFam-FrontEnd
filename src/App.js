import React from 'react';
import { Container } from '@material-ui/core';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
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
          }
        },
        typography: {
          fontFamily: 'Lexend Deca'
        },
        shape: {
          borderRadius: 10
        }
      }),
    [prefersDarkMode]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="xl">
          <Routes>
            <Route exact path="/" element={<Navigate replace={true} to="/posts" />} />
            <Route exact path="/posts" element={<Home />} />
            <Route exact path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
