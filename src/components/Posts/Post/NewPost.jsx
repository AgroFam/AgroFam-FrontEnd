import React, { useState } from 'react';
import useStyles from './styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import {
  CardContent,
  IconButton,
  Typography,
  CardHeader,
  Avatar,
  Chip,
  Button,
  MenuItem,
  ClickAwayListener,
  Paper,
  Popper,
  Grow,
  MenuList,
  CardActions,
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import Comment from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { likePost, deletePost, getPostsBySearch } from '../../../redux/actions/posts';
import { convertToPlain, getMinutesToRead, removeTrailingQuotes } from '../../../utils/utils';

const NewPost = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result.sub || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const tags = post.tags;

  const searchPost = () => {
    if (tags) {
      dispatch(getPostsBySearch({ tags: tags.join(','), lang: language }));
      navigate(`/posts/search?tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleEdit = () => {
    window.scroll(0, 0);
    setCurrentId(post._id);
    handleClose();
  };

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; {likes.length} like{likes.length > 1 ? 's' : ''}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp; {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Paper className={classes.card} elevation={0}>
      <div className={classes.details}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar className={classes.green} alt={post.name} src={post?.creatorImg}>
              {post?.name?.charAt(0)}
            </Avatar>
          }
          action={
            (user?.result.sub === post?.creator || user?.result?._id === post?.creator) && (
              <div>
                <IconButton aria-label="edit post" onClick={handleToggle} ref={anchorRef}>
                  <MoreVertIcon />
                </IconButton>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                      }}>
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleEdit}>Edit Blog</MenuItem>
                            <MenuItem onClick={() => dispatch(deletePost(post._id))}>
                              Delete Blog
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            )
          }
          title={post.name}
          subheader={moment(post.createdAt).fromNow()}
        />
        <div className={classes.content}>
          <CardContent component={Link} to={`/posts/${post._id}`}>
              <Typography className={classes.postDetailsTitleText} component="h6" variant="h6">
               {removeTrailingQuotes(post.title[language])}
              </Typography>
            <Typography className={classes.postDetailsText} variant="subtitle1" color="textSecondary">
              {convertToPlain(removeTrailingQuotes(post.message[language])).substring(0, 240)}...
            </Typography>
          </CardContent>
          <img
            className={classes.media}
            src={
              `${post.selectedFile}?tr=w-800,h-800` ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt="Live from space album cover"
          />
        </div>
      </div>
      <CardActions className={classes.actions}>
        <div>
          <Chip label={tags[0] || 'No Tag'} color="secondary" onClick={searchPost}/> &#160; {getMinutesToRead(post.message[language])} Minute Read
        </div>
        <div>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            disableElevation
            onClick={handleLike}>
            <Likes />
          </Button>
          <IconButton 
            component={Link}
            disableElevation
            to={`/posts/${post._id}`}
            size="small"
            color="primary">
            <Comment />
          </IconButton>
        </div>
      </CardActions>
    </Paper>
  );
};

export default NewPost;
