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
    borderTop: `1px solid ${theme.palette.divider}`
  }
}));

const BottomNav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = useState('posts');


  useEffect(() => {
    if (window.location.pathname !== '/posts' &&
        window.location.pathname !== '/create' &&
        window.location.pathname !== '/account') {
      setValue(0);
    }
  }, [window.location.pathname])
  

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
