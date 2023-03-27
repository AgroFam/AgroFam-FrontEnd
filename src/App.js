import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import { Theme } from './Theme/Theme';
import BottomNav from './components/BottomNav/BottomNav';
import Write from './components/Write/Write';
import Account from './components/Account/Account';
import useStyles from './styles'
import NewsPage from './components/News/NewsPage';
import { DARK, FOLLOW_SYSTEM, LIGHT } from './constants/settings';
import { PREFERS_DARK_MODE } from './constants/actionTypes';
import SnackbarComponent from './components/SnackbarComponent/SnackbarComponent';


const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { colorTheme } = useSelector((state) => state.settings);
  const prefersDarkMode = !useMediaQuery('(prefers-color-scheme: light)');
  const [mode, setMode] = useState('')

  useEffect(() => {
    switch (colorTheme) {
      case FOLLOW_SYSTEM:
        setMode(prefersDarkMode);
        dispatch({ type: PREFERS_DARK_MODE, payload: prefersDarkMode })
        break;
      case DARK:
        setMode(true);
        dispatch({ type: PREFERS_DARK_MODE, payload: true })
        break;
      case LIGHT:
        setMode(false);
        dispatch({ type: PREFERS_DARK_MODE, payload: false })
        break;
      default:
        break;
    } 
  }, [colorTheme, prefersDarkMode])
  
  const theme = Theme(mode);
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <SnackbarComponent />
        <Container className={classes.appContainer} maxWidth="xl">
          <Routes>
            <Route exact path="/" element={<Navigate replace={true} to="/posts" />} />
            <Route exact path="/posts" element={<Home />} />
            <Route exact path="/write" element={<Write />} />
            <Route exact path="/news" element={<NewsPage />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/auth" element={!isLoggedIn ? <Auth /> : <Navigate to="/posts" />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </Container>
        <BottomNav />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
