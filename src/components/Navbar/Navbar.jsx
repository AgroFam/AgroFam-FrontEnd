import React from 'react';
import { AppBar, IconButton, Tooltip } from '@material-ui/core';

import useStyles from './Styles';
import agroFamForLight from '../../images/agroFamTextForLight.png';
import agroFamTextForDark from '../../images/agroFamTextForDark.png';
import agroFamLogo from '../../images/agroFamLogo.png';
import Search from './Search';
import ProfileMenu from './ProfileMenu';
import { Link, useNavigate } from 'react-router-dom';
import { HomeRounded, PostAddRounded, SettingsRounded } from '@material-ui/icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = useSelector(state => state.settings.prefersDarkMode);
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
            <HomeRounded/>
          </IconButton>
        </Tooltip>
        <Tooltip className={classes.menuItemsChild} title="Write">
          <IconButton onClick={() => navigate('/write')} aria-label="Write">
            <PostAddRounded />
          </IconButton>
        </Tooltip>
        <Tooltip className={classes.menuItemsChild} title="Settings">
          <IconButton onClick={() => navigate('/account')} aria-label="Settings">
            <SettingsRounded />
          </IconButton>
        </Tooltip>
        <ProfileMenu />
      </div>
    </AppBar>
  );
};

export default Navbar;
