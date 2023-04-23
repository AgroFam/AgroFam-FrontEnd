import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import useStyles from './styles';
import NewPost from './Post/NewPost';
import { useDispatch } from 'react-redux';
import SkeletonLoader from './Post/SkeletonLoader';
import { getMorePosts, getPosts } from '../../redux/actions/posts';

const InfiniteScrollPosts = ({ setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { posts, numberOfPages, currentPage } = useSelector((state) => state.posts);
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const page = 1;

  console.log('test')

  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        // next={dispatch(getMorePosts(currentPage, language))}
        next={console.log('fetchmore')}
        hasMore={numberOfPages !== currentPage}
        scrollThreshold="200px"
        inverse
        loader={
          <div className={classes.container}>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        }>
        <div className={classes.container}>
          {posts.map((post) => (
            <NewPost key={post._id} post={post} setCurrentId={setCurrentId} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollPosts;
