import React from 'react';
import { CardActions, CardContent, CardHeader, Chip, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import useStyles from './styles';

const SkeletonLoader = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.card} elevation={0}>
      <div className={classes.details}>
        <CardHeader
          className={classes.cardHeader}
          avatar={<Skeleton animation="wave" variant="circle" width={45} height={45} />}
          title={<Skeleton animation="wave" variant="text" width={150} />}
          subheader={<Skeleton animation="wave" variant="text" width={100} />}
        />
        <div className={classes.content}>
          <CardContent style={{ width: '75%' }}>
            <Typography className={classes.postDetailsTitleText} component="h6" variant="h6">
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Typography>
            <Typography
              className={classes.postDetailsText}
              variant="subtitle1"
              color="textSecondary">
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </Typography>
          </CardContent>
          {window.innerWidth < 600 ? (
            <Skeleton
              className={classes.media}
              animation="wave"
              variant="rect"
              height={100}
              width={100}
            />
          ) : (
            <Skeleton
              className={classes.media}
              animation="wave"
              variant="rect"
              height={175}
              width={175}
            />
          )}
        </div>
      </div>
      <CardActions className={classes.actions}>
        <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
          <Skeleton animation="wave" width={50} height={40} />
          <Skeleton animation="wave" width={130} height={20} />
        </div>
        <div style={{ display: 'flex', gap: '1em', alignItems: 'center' }}>
          <Skeleton animation="wave" width={50} height={40} />
          <Skeleton animation="wave" width={22} height={40} />
        </div>
      </CardActions>
    </Paper>
  );
};

export default SkeletonLoader;
