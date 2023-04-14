import React, { useState, useRef } from 'react';
import { TextField, Button, Typography, Chip } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { commentPost } from '../../redux/actions/posts';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.auth.authData)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.name}: ${comment}`;
    const newComments = dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {!comments.length
            ? <Chip color="primary" variant="outlined" label="🏆 Be the first to comment on this Post" />
            : comments.map((c, i) => (
                <Typography key={i} gutterBottom variant="subtitle1">
                  <strong>{c.split(': ')[0]}</strong> :{c.split(':')[1]}
                </Typography>
              ))}
          <div ref={commentsRef} />
        </div>
        <div className={classes.commentsTextContainer}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            fullWidth
            minRows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            disabled={!isLoggedIn}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            disableElevation
            style={{ marginTop: '10px' }}
            fullWidth
            disabled={!comment || !isLoggedIn}
            variant="contained"
            color="primary"
            onClick={handleClick}>
            {isLoggedIn ? 'comment' : 'Login To Post Comment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
