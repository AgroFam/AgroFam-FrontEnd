import React from 'react';
import { Grid, CircularProgress, Paper, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return 'No Posts';

  return isLoading ? (
    <Paper elevation={2} className={classes.loadingPaper}>
      <CircularProgress size="5em" />
    </Paper>
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Container key={post._id} justifyContent="center">
          <Post post={post} setCurrentId={setCurrentId} />
        </Container>
      ))}
    </Grid>
  );
};

export default Posts;
