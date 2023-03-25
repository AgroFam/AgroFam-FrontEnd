import React from 'react'
import { Avatar, Typography } from '@material-ui/core'
import useStyles from './styles';
import { getHumanReadableDate, getMinutesToRead } from '../../utils/utils';
import TextToSpeech from '../TextToSpeech/TextToSpeech';
import { useSelector } from 'react-redux';

const BlogHeader = () => {
  const post = useSelector((state) => state.posts.post);
  const language = useSelector((state) => state.settings.language).toLowerCase();
  const classes = useStyles();
  return (
    <div className={classes.blogHeader}>
      <Avatar className={classes.blogHeaderAvatar} alt={post.name} src={post.creatorImg} >
        { post?.name?.charAt(0) }
      </Avatar> 
      <div>
        <Typography className={classes.blogHeaderTitle}> { post.name } </Typography>
        <Typography
          className={classes.blogHeaderSubText}
        >
          {getHumanReadableDate(post.createdAt)}
          &nbsp; &#8226; &nbsp;
          {getMinutesToRead(post.message[language])} Minutes Read
          &nbsp; &#8226; &nbsp;
          <TextToSpeech />
        </Typography>
      </div>
    </div>
  )
}

export default BlogHeader