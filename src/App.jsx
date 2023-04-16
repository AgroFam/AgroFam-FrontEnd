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
import { DARK, FOLLOW_SYSTEM, LIGHT } from './redux/constants/settings';
import { PREFERS_DARK_MODE } from './redux/constants/actionTypes';
import SnackbarComponent from './components/SnackbarComponent/SnackbarComponent';
import Team from './components/Team/Team';
import About from './components/About/About';
import Support from './components/Support/Support';


const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { colorTheme } = useSelector((state) => state.settings);
  const prefersDarkMode = !useMediaQuery('(prefers-color-scheme: light)');

  useEffect(() => {
    switch (colorTheme) {
      case FOLLOW_SYSTEM:
        dispatch({ type: PREFERS_DARK_MODE, payload: prefersDarkMode })
        break;
      case DARK:
        dispatch({ type: PREFERS_DARK_MODE, payload: true })
        break;
      case LIGHT:
        dispatch({ type: PREFERS_DARK_MODE, payload: false })
        break;
      default:
        break;
    } 
  }, [colorTheme, prefersDarkMode])
  
  const theme = Theme();
  
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
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </Container>
        <BottomNav />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
