import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Container,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography
} from '@material-ui/core';
import useStyles from './styles';
import { Brightness4Rounded, Translate } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage, setTheme } from '../../redux/actions/settings';
import {
  BENGALI,
  DARK,
  ENGLISH,
  FOLLOW_SYSTEM,
  GUJARATI,
  HINDI,
  KANNADA,
  LIGHT,
  MALAYALAM,
  MARATHI,
  PUNJABI,
  TAMIL,
  TELUGU
} from '../../redux/constants/settings';
import { SET_SNACKBAR } from '../../redux/constants/actionTypes';
import { getPost, getPosts } from '../../redux/actions/posts';
import { getAvatar } from '../../utils/utils';

const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  console.log(user)
  const { colorTheme, language } = useSelector((state) => state.settings);
  const { currentPage, post } = useSelector((state) => state.posts);
  const classes = useStyles();

  const handleChangeTheme = (e) => {
    dispatch(setTheme(e.target.value));
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: `💡 Set ${e.target.value} Mode` }
    });
  };

  const handleChangeLanguage = (e) => {
    dispatch(setLanguage(e.target.value));
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: `🌐 Changed Default Content Language to ${e.target.value}` }
    });
    dispatch(getPosts(currentPage || 1, e.target.value));
    dispatch(getPost(post?._id, language));
  };

  return (
    <>
      <Container
        className={classes.profileContainer}
        maxWidth="xl"
        style={{ margin: '100px 0 20px' }}>
        <div className={classes.cardContent}>
          <div className={classes.cardHeaders}>
            <Avatar
              className={classes.avtar}
              alt={user?.name}
              src={user?.picture || getAvatar(user?.id)}>
              {user?.name?.charAt(0)}
            </Avatar>
            <Typography variant="h5" color="text.secondary" className={classes.content}>
              {user?.name}
            </Typography>
            <Typography
              variant="subtitle"
              color="text.secondary"
              gutterBottom
              className={classes.content}>
              {user?.email}
            </Typography>
          </div>
          <Paper elevation={0} className={classes.list}>
            <List
              subheader={
                <Typography style={{ padding: '0.7em' }} variant="h6">
                  {' '}
                  General Settings
                </Typography>
              }>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <Brightness4Rounded />
                </ListItemIcon>
                <ListItemText primary="AgroFam Colors" />
                <ListItemSecondaryAction>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      className={classes.select}
                      value={colorTheme}
                      onChange={handleChangeTheme}>
                      <MenuItem value={FOLLOW_SYSTEM}>System</MenuItem>
                      <MenuItem value={DARK}>Dark</MenuItem>
                      <MenuItem value={LIGHT}>Light</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem className={classes.listItem}>
                <ListItemIcon>
                  <Translate />
                </ListItemIcon>
                <ListItemText id="switch-list-label-language" primary="Preferred Language" />
                <ListItemSecondaryAction>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <Select
                      className={classes.select}
                      value={language}
                      onChange={handleChangeLanguage}>
                      <MenuItem value={ENGLISH}>English</MenuItem>
                      <MenuItem value={HINDI}>Hindi</MenuItem>
                      <MenuItem value={MARATHI}>Marathi</MenuItem>
                      <MenuItem value={GUJARATI}>Gujrati</MenuItem>
                      <MenuItem value={PUNJABI}>Punjabi</MenuItem>
                      <MenuItem value={BENGALI}>Bengali</MenuItem>
                      <MenuItem value={TAMIL}>Tamil</MenuItem>
                      <MenuItem value={TELUGU}>Telugu</MenuItem>
                      <MenuItem value={KANNADA}>Kannada</MenuItem>
                      <MenuItem value={MALAYALAM}>Malayalam</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </div>
      </Container>
    </>
  );
};

export default Account;
