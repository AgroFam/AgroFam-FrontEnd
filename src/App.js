import React from 'react';
import { Container } from '@material-ui/core';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
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
import Create from './components/Create/Create';
import Account from './components/Account/Account';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = Theme(prefersDarkMode);
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Container style={{marginBottom: '5em'}} maxWidth="xl">
          <Routes>
            <Route exact path="/" element={<Navigate replace={true} to="/posts" />} />
            <Route exact path="/posts" element={<Home />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/account" element={<Account />} />
            <Route exact path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </Container>
        <BottomNav />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
