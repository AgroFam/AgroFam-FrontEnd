import React from 'react';
import { AppBar, IconButton, Tooltip } from '@material-ui/core';

import useStyles from './Styles';
import agroFamForLight from '../../images/agroFamTextForLight.png';
import agroFamTextForDark from '../../images/agroFamTextForDark.png';
import agroFamLogo from '../../images/agroFamLogo.png';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Search from './Search';
import ProfileMenu from './ProfileMenu';
import { Link, useNavigate } from 'react-router-dom';
import { AddCircle, Home, Settings } from '@material-ui/icons';

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  return (
    <AppBar className={classes.appBar} position="static" color="inherit" elevation={0}>
      <div className={classes.menuItems1}>
        <Link to="/" className={classes.brandContainer}>
          <img src={agroFamLogo} alt="icon" height="40px" />
          <img className={classes.logoText} src={prefersDarkMode ? agroFamTextForDark : agroFamForLight} alt="icon" height="30px" />
        </Link>
        <Search />
      </div>
      <div className={classes.menuItems2}>
        <Tooltip className={classes.menuItemsChild} title="Home">
          <IconButton onClick={() => navigate('/posts')} aria-label="Home" >
            <Home/>
          </IconButton>
        </Tooltip>
        <Tooltip className={classes.menuItemsChild} title="Write">
          <IconButton onClick={() => navigate('/write')} aria-label="Write">
            <AddCircle />
          </IconButton>
        </Tooltip>
        <Tooltip className={classes.menuItemsChild} title="Settings">
          <IconButton onClick={() => navigate('/account')} aria-label="Settings">
            <Settings />
          </IconButton>
        </Tooltip>
        <ProfileMenu />
      </div>
    </AppBar>
  );
};

export default Navbar;
