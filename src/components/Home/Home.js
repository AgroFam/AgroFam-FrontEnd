import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import Posts from '../Posts/Posts';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Pagination from '../Pagination/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import { getArticlesFromSearch, getPostsBySearch } from '../../actions/posts';
import config from '../../config';
import News from '../News/News';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const queryString = useLocation().search;
  const searchQuery = query.get('searchQuery');
  const tagsQuery = query.get('tags')

  const googleSuccess = async (res) => {
    const actualRes = jwt_decode(res.credential);
    const result = actualRes;
    const token = res.credential;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      /* global google */
      google.accounts.id.initialize({
        client_id: config.googleOAuthClientID,
        callback: googleSuccess
      });
      google.accounts.id.prompt();
    }
    if (queryString !== '') {
      dispatch(getPostsBySearch({ search: searchQuery, tags: tagsQuery }));
      dispatch(getArticlesFromSearch(searchQuery))
    }
    // eslint-disable-next-line
  }, [queryString]);

  return (
      <Container className={classes.homeContainer} maxWidth="lg" style={{ margin: '100px auto 20px' }}>
        <Grid
          container
          className={classes.gridContainer}
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12} sm={12} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid className={classes.newsGrid} item xs={12} sm={12} md={4}>
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
