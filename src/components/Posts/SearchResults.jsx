import React from 'react';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import NewPost from './Post/NewPost';
import NotFound from './NotFound';
import SkeletonLoader from './Post/SkeletonLoader';

const SearchResults = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return <NotFound />;

  return isLoading ? (
    <div className={classes.container}>
      <SkeletonLoader />
      <SkeletonLoader />
      <SkeletonLoader />
    </div>
  ) : (
    <div className={classes.container}>
      {posts.map((post) => (
        <NewPost key={post._id} post={post} setCurrentId={setCurrentId} />
      ))}
    </div>
  );
};

export default SearchResults;
