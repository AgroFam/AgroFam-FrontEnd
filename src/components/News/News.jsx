import React, { useEffect } from 'react';
import { Divider, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesFromSearch } from '../../actions/posts';
import useStyles from './styles';
import { Skeleton } from '@material-ui/lab';
import { useLocation } from 'react-router-dom';
import agroFamLogo from '../../images/agroFamLogo.png';
import { getQueryParams } from '../../utils/utils';


const News = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchQuery = getQueryParams('searchQuery');
  const tagsQuery = getQueryParams('tags');
  const { articles, isLoadingNews } = useSelector((state) => state.posts);
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const queries = [
    'Agriculture News In India',
    'india agri news',
    'agri news india',
    `agri news ${language}`,
    `agriculture news ${language}`,
    'agriculture news india',
    `agriculture news ${language}`,
    'india agriculture news',
    'agri news marathi',
    'agri news hindi',
  ];

  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  useEffect(() => {
    !tagsQuery && !searchQuery && dispatch(getArticlesFromSearch(randomQuery));
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
              <img src={newsItem.image_url || agroFamLogo} alt="news-source favicon" />
              <a href={newsItem.link} target="_blank">
                <h3>{newsItem.title}</h3>
              </a>
            </div>
            <a href={newsItem.link} target="_blank">
              {newsItem.link.substring(0, 40)}...
            </a>
          </div>
          <Divider />
        </div>
      ))
    );

  return (
    <>
      {tagsQuery || searchQuery ? (
        <Typography variant="h5">🔍 Results From Web</Typography>
      ) : (
        <Typography variant="h5">📰 Latest News</Typography>
      )}
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
