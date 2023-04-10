import { Container } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import useStyles from './styles';

const SkeletonLoader = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="md">
      <div className={classes.blogHeader}>
        <Skeleton animation="wave" variant="circle" width={45} height={45} />
        <div>
          <Skeleton animation="wave" variant="text" width={200} />
          <Skeleton animation="wave" variant="text" width={300} />
        </div>
      </div>
      <Skeleton className={classes.media} animation="wave" variant="rect" height={30} />
      <Skeleton className={classes.media} animation="wave" variant="rect" height={30} />
      <Skeleton className={classes.media} animation="wave" variant="rect" height={400} />
      <Skeleton animation="wave" variant="text" style={{ marginBottom: 6 }}/>
      <Skeleton animation="wave" variant="text" style={{ marginBottom: 6 }}/>
      <Skeleton animation="wave" variant="text" style={{ marginBottom: 6 }}/>
      <Skeleton animation="wave" variant="text" style={{ marginBottom: 6 }}/>
      <Skeleton animation="wave" variant="text" style={{ marginBottom: 6 }}/>
    </Container>
  );
};

export default SkeletonLoader;
