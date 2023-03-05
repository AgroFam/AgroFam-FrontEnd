import React from 'react'
import { Avatar, Typography } from '@material-ui/core'
import useStyles from './styles';
import { getHumanReadableDate, getMinutesToRead } from '../../utils/utils';

const BlogHeader = ({ post }) => {
  const classes = useStyles();
  return (
    <div className={classes.blogHeader}>
      <Avatar className={classes.blogHeaderAvatar} alt={post.name} src={post.creatorImg} >
        { post?.name?.charAt(0) }
      </Avatar> 
      <div>
        <Typography className={classes.blogHeaderTitle}> { post.name } </Typography>
        <Typography
          className={classes.blogHeaderDate}
        >
          {getHumanReadableDate(post.createdAt)}
          &nbsp; &#8226; &nbsp;
          {getMinutesToRead(post.message)} Minutes Read
          &nbsp; &#8226; &nbsp;
          ▶️ Listen
        </Typography>
      </div>
    </div>
  )
}

export default BlogHeader