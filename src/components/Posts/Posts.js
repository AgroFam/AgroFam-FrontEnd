import React from 'react';
import { CircularProgress, Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import NewPost from './Post/NewPost';
import NotFound from './NotFound';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return <NotFound />;

  return isLoading ? (
    <Paper elevation={0} className={classes.loadingPaper}>
      <CircularProgress size="5em" />
    </Paper>
  ) : (
    <div className={classes.container}>
      {posts.map((post) => (
          <NewPost key={post._id} post={post} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default Posts;
