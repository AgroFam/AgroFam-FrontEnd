import React, { useEffect } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesFromSearch } from '../../actions/posts';
import useStyles from './styles';
import { Skeleton } from '@material-ui/lab';

const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { articles, isLoadingNews } = useSelector((state) => state.posts);
  const query = 'Agriculture News In India';
  // const query = 'Agriculture News';

  useEffect(() => {
    dispatch(getArticlesFromSearch(query));
  }, []);

  const NewsLoading = () => (
    <>
      <div className={classes.newsCard}>
        <div className={classes.newsContent}>
          <Skeleton variant="circle" width={28} height={28} />
          <Skeleton variant="rect" width={300} height={30} />
        </div>
        <Skeleton variant="text" />
      </div>
      <Divider />
    </>
  );

  const NewsList = () =>
    articles.length === 0 ? (
      <div>No News Found</div>
    ) : (
      articles.map((newsItem, i) => (
        <div key={i}>
          <div className={classes.newsCard}>
            <div className={classes.newsContent}>
              <img src={newsItem.image_url} alt="news favicon" />
              <a href={newsItem.link} target='_blank'>
                <h3>{newsItem.title}</h3>
              </a>
            </div>
            <a href={newsItem.link} target='_blank'>{newsItem.link.substring(0, 40)}...</a>
          </div>
          <Divider />
        </div>
      ))
    );

  return (
    <>
      <Typography variant="h4">📰 Latest News</Typography>
      <div className={classes.newsContainer}>
        {isLoadingNews ? (
          <>
            <NewsLoading />
            <NewsLoading />
            <NewsLoading />
            <NewsLoading />
            <NewsLoading />
          </>
        ) : (
          <NewsList />
        )}
      </div>
    </>
  );
};

export default News;
