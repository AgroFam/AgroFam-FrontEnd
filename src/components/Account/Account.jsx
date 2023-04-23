import React from 'react';
import {
  Avatar,
  Button,
  CardActionArea,
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
import {
  Brightness4Rounded,
  ChevronRightRounded,
  ExitToAppRounded,
  GroupRounded,
  HeadsetMicRounded,
  InfoRounded,
  SecurityRounded,
  Translate
} from '@material-ui/icons';
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
import { LOGOUT, SET_SNACKBAR } from '../../redux/constants/actionTypes';
import { getPost, getPosts } from '../../redux/actions/posts';
import { getAvatar } from '../../utils/utils';
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.authData);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/auth');
  };

  const NotLoggedInComponent = () => {
    return (
      <div className={classes.NotLoggedInComponent} elevation={0}>
        <Avatar
          className={classes.avtar}
          src="https://i.pinimg.com/736x/b2/54/ea/b254ea1ec256b93c61aecb2aca62e277.jpg"
        />
        <Typography variant="body1" align="center" style={{ padding: '0.5em' }}>
          Please Sign in for Better Experience.
        </Typography>
        <Button
          variant="contained"
          size="small"
          color="primary"
          disableElevation
          onClick={() => navigate('/auth')}>
          Sign In
        </Button>
      </div>
    );
  };

  return (
    <>
      <Container
        className={classes.profileContainer}
        maxWidth="xl"
        style={{ margin: '100px auto 20px' }}>
        <div className={classes.cardContent}>
          {!isLoggedIn ? (
            <NotLoggedInComponent />
          ) : (
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
          )}
          <Paper elevation={0} className={classes.list}>
            <List
              subheader={
                <Typography style={{ padding: '0.7em' }} variant="h6">
                  {' '}
                  General Settings
                </Typography>
              }>
              <CardActionArea>
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
              </CardActionArea>

              <CardActionArea>
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
              </CardActionArea>

              <CardActionArea component={Link} to="/team">
                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <GroupRounded />
                  </ListItemIcon>
                  <ListItemText id="switch-list-label-team" primary="Meet Team" />
                  <ListItemSecondaryAction>
                    <ChevronRightRounded />
                  </ListItemSecondaryAction>
                </ListItem>
              </CardActionArea>

              <CardActionArea component={Link} to="/about">
                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <InfoRounded />
                  </ListItemIcon>
                  <ListItemText id="switch-list-label-about" primary="About Us" />
                  <ListItemSecondaryAction>
                    <ChevronRightRounded />
                  </ListItemSecondaryAction>
                </ListItem>
              </CardActionArea>

              <CardActionArea component={Link} to="/support">
                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <HeadsetMicRounded />
                  </ListItemIcon>
                  <ListItemText id="switch-list-label-support" primary="Help and Support" />
                  <ListItemSecondaryAction>
                    <ChevronRightRounded />
                  </ListItemSecondaryAction>
                </ListItem>
              </CardActionArea>

              <CardActionArea component={Link} to="/privacyPolicy">
                <ListItem className={classes.listItem}>
                  <ListItemIcon>
                    <SecurityRounded />
                  </ListItemIcon>
                  <ListItemText
                    id="switch-list-label-privacyPolicy"
                    primary="Terms and Privacy Policy"
                  />
                  <ListItemSecondaryAction>
                    <ChevronRightRounded />
                  </ListItemSecondaryAction>
                </ListItem>
              </CardActionArea>

              {isLoggedIn && (
                <CardActionArea onClick={logout}>
                  <ListItem className={classes.listItem}>
                    <ListItemIcon>
                      <ExitToAppRounded />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-Logout" primary="Logout" />
                    <ListItemSecondaryAction>
                      <ChevronRightRounded />
                    </ListItemSecondaryAction>
                  </ListItem>
                </CardActionArea>
              )}
            </List>
          </Paper>
          <Typography className={classes.footer}>
            Crafted with 💝 by AgroFam&#8482; <Link to="/team">Team</Link>
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Account;
