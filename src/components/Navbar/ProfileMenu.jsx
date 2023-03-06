import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Popover,
  Divider
} from '@material-ui/core';
import useStyles from './Styles';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import * as actionType from '../../constants/actionTypes';

const ProfileMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  const open = Boolean(anchorElUser);
  const id = open ? 'simple-popover' : undefined;


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // Logs out user if the jwt token expires
    // const token = user?.token;
    // if (token) {
    //   const decodedToken = decode(token);
    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }

    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

    //Function to logout user
    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
      navigate('/auth');
      setUser(null);
    };
  
  return (
    <Toolbar className={classes.toolbar}>
      {user ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              className={classes.profileButton}
              aria-describedby={id}
              onClick={handleOpenUserMenu}>
              <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>
                {user.result.name.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorElUser}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className={classes.userMenu}>
              <div className={classes.userMenuItem}>
                <Avatar
                  style={{ margin: '0.5em' }}
                  className={classes.purple}
                  alt={user.result.name}
                  src={user.result.picture}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography variant="subtitle1">
                  <b>{user.result.name}</b>
                </Typography>
                <Typography variant="body2">{user.result.email}</Typography>
              </div>
              <Divider className={classes.divider} />
              <div className={classes.userMenuItem}>
                <Button disableElevation onClick={logout} size="small" variant="outlined">
                  Log out
                </Button>
              </div>
              <Divider className={classes.divider} />
              <div className={classes.privacyPolicy}>
                <Typography variant="caption" component={Link} to="/privacypolicy">
                  Privacy Policy
                </Typography>
              </div>
            </div>
          </Popover>
        </Box>
      ) : (
        <Button
          disableElevation
          component={Link}
          style={{ whiteSpace: 'nowrap' }}
          to="/auth"
          variant="contained"
          color="primary">
          Sign In
        </Button>
      )}
    </Toolbar>
  );
};

export default ProfileMenu;
