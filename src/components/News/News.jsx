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
  const queries = ['Agriculture News In India', 'india agri news', 'agri news india', 'agri news hindi','agri news marathi','agriculture news india','agriculture news hindi','india agriculture news'];

  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  useEffect(() => {
    dispatch(getArticlesFromSearch(randomQuery));
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
              <a href={newsItem.link}>
                <h3>{newsItem.title}</h3>
              </a>
            </div>
            <a href={newsItem.link}>{newsItem.link.substring(0, 40)}...</a>
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
          </>
        ) : (
          <NewsList />
        )}
      </div>
    </>
  );
};

export default News;
