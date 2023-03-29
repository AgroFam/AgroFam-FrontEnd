import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid, Container } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts';

import CommentSection from './CommentSection';
import useStyles from './styles';
import NewPost from '../Posts/Post/NewPost';
import BlogHeader from './BlogHeader';
import { removeTrailingQuotes } from '../../utils/utils';

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id, language));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: post.name, tags: post?.tags.join(','), lang: language }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={2} className={classes.loadingPaper}>
        <CircularProgress size="5em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <>
      <Container className={classes.container} maxWidth="md">
        <BlogHeader />
        <Typography className={classes.blogTitle} gutterBottom variant="h2" component="h2">
          <strong>{removeTrailingQuotes(post.title[language])}</strong>
        </Typography>
        <img
          className={classes.media}
          src={
            `${post.selectedFile}?tr=w-1000` ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          alt={post.title[language]}
        />
        <Typography
          className={classes.blogContent}
          gutterBottom
          paragraph
          variant="body1"
          color="textSecondary">
          <div dangerouslySetInnerHTML={{__html: removeTrailingQuotes(post.message[language])}} />
        </Typography>
        <Typography gutterBottom variant="caption" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Written by:</strong> {post.name}
        </Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        <Divider style={{ margin: '20px 0' }} />

        <CommentSection post={post} />

        {!!recommendedPosts.length && (
          <>
            <Divider style={{ margin: '20px 0' }} />
            <div className={classes.section}>
              <Typography gutterBottom variant="h5">
                You might also like:
              </Typography>
              <div className={classes.recommendedPosts}>
                <Grid container alignItems="stretch" spacing={3}>
                  {recommendedPosts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={12}>
                      <NewPost post={post} />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default PostDetails;
