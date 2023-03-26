import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { HomeRounded, MenuBookRounded, PersonRounded, PostAddRounded } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '4.5em',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
    borderTop: `0.5px solid ${theme.palette.divider}`,
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex'
    }
  }
}));

const BottomNav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = useState('posts');
  const pathName = window.location.pathname;

  useEffect(() => {
    if (pathName !== '/posts' &&
        pathName !== '/write' &&
        pathName !== '/account' &&
        pathName !== '/news') {
      setValue(0);
    } else if (pathName === '/posts') {
      setValue('posts')
    } else if (pathName === '/write') {
      setValue('write')
    } else if (pathName === '/account') {
      setValue('account')
    } else if (pathName === '/news') {
      setValue('news')
    }
  }, [pathName])
  
  return (
    <BottomNavigation 
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        navigate(`/${newValue}`)
      }}
      showLabels
      className={classes.root}>
      <BottomNavigationAction label="Feed" value="posts" icon={<HomeRounded />} />
      <BottomNavigationAction label="News" value="news" icon={<MenuBookRounded />} />
      <BottomNavigationAction label="Write" value="write" icon={<PostAddRounded />} />
      <BottomNavigationAction label="Account" value="account" icon={<PersonRounded />} />
    </BottomNavigation>
  );
};

export default BottomNav;
