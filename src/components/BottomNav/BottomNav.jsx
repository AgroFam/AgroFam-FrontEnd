import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { AddCircle, Home, Person } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '4.5em',
    position: 'fixed',
    bottom: 0,
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'none',
    [theme.breakpoints.down('xs')]: {
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
        pathName !== '/create' &&
        pathName !== '/account') {
      setValue(0);
    } else if (pathName === '/posts') {
      setValue('posts')
    } else if (pathName === '/create') {
      setValue('create')
    } else if (pathName === '/account') {
      setValue('account')
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
      <BottomNavigationAction label="Feed" value="posts" icon={<Home />} />
      <BottomNavigationAction label="Create" value="create" icon={<AddCircle />} />
      <BottomNavigationAction label="Account" value="account" icon={<Person />} />
    </BottomNavigation>
  );
};

export default BottomNav;