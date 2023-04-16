import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Pagination from '../Pagination/Pagination';

import { getWebResults, getPostsBySearch } from '../../redux/actions/posts';
import News from '../News/News';
import { useSelector } from 'react-redux';
import { getQueryParams } from '../../utils/utils';

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const page = getQueryParams('page') || 1;
  const searchQuery = getQueryParams('searchQuery')
  const tagsQuery = getQueryParams('tags')
  const language = useSelector((state) => state.settings.language).toLowerCase();

  const useStyles2 = makeStyles((theme) => ({
    newsGrid: {
      [theme.breakpoints.down('sm')]: {
        display: searchQuery ? 'block' : 'none'
      }
    }
  }));

  const classes2 = useStyles2();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     /* global google */
  //     google.accounts.id.initialize({
  //       client_id: config.googleOAuthClientID,
  //       callback: (res) => googleSuccess(res, dispatch, navigate)
  //     });
  //     google.accounts.id.prompt();
  //   }
  // }, [])
  

  useEffect(() => {
    if (searchQuery || tagsQuery) {
      dispatch(getPostsBySearch({ search: searchQuery, tags: tagsQuery, lang: language }));
      dispatch(getWebResults(searchQuery || tagsQuery));
    }
    // eslint-disable-next-line
  }, [searchQuery, tagsQuery]);
  
  return (
    <Container
      className={classes.homeContainer}
      maxWidth="lg"
      style={{ margin: '100px auto 20px' }}>
      <Grid
        container
        className={classes.gridContainer}
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}>
        <Grid item xs={12} sm={12} md={8}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid className={classes2.newsGrid} item xs={12} sm={12} md={4}>
          <News />
        </Grid>
      </Grid>
      {!searchQuery && !tagsQuery && (
        <Paper className={classes.pagination} elevation={0}>
          <Pagination page={page} />
        </Paper>
      )}
    </Container>
  );
};

export default Home;
