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
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import * as actionType from '../../redux/constants/actionTypes';
import { getAvatar } from '../../utils/utils';
import jwtDecode from 'jwt-decode';

const ProfileMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.authData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [open, setOpen] = useState(false)
  const id = open ? 'simple-popover' : undefined;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setOpen(true)
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setOpen(false);
  };

  useEffect(() => {
    // Logs out user if the jwt token expires
    const token = JSON.parse(localStorage.getItem('profile'))?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  //Function to logout user
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate('/auth');
  };

  return (
    <Toolbar className={classes.toolbar}>
      {isLoggedIn ? (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              className={classes.profileButton}
              aria-describedby={id}
              onClick={handleOpenUserMenu}>
              <Avatar
                className={classes.purple}
                alt={user?.name}
                src={user?.picture || getAvatar(user?.id)}>
                {user?.name?.charAt(0)}
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
                  alt={user?.name}
                  src={user?.picture || getAvatar(user?.id)}>
                  {user?.name?.charAt(0)}
                </Avatar>
                <Typography variant="subtitle1">
                  <b>{user?.name}</b>
                </Typography>
                <Typography variant="body2">{user?.email}</Typography>
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
