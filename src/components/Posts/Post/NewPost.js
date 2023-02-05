import React, { useState } from 'react';
import useStyles from './styles';
import moment from 'moment';
import { useDispatch } from 'react-redux';
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
  MenuList
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpOutlined';
import Comment from '@material-ui/icons/Comment';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { likePost, deletePost } from '../../../actions/posts';

const NewPost = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);

  const userId = user?.result.sub || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
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
                            <MenuItem onClick={handleEdit}>Edit Notion</MenuItem>
                            <MenuItem onClick={() => dispatch(deletePost(post._id))}>
                              Delete Notion
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
        <div className={classes.content} onClick={()=> navigate(`/posts/${post._id}`)}>
          <CardContent >
            <Typography component="h6" variant="h6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nam?
            </Typography>
            <Typography className={classes.postDetailsText} variant="subtitle1" color="textSecondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et ipsam, deserunt tempore,
              ratione debitis fugiat perferendis explicabo officiis est sapiente, neque dicta
              laudantium cupiditate. Voluptate quisquam eum consectetur possimus dolorum!
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
      <div className={classes.actions}>
        <div>
          <Chip label="Catagory" color="secondary" onClick={()=>{}}/> &#160; 5 min read
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
          <Button
            component={Link}
            disableElevation
            to={`/posts/${post._id}`}
            size="small"
            color="primary">
            <Comment />
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default NewPost;
