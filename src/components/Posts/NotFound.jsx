import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import NotFoundBg from '../../images/NotFoundBg.svg'
import useStyles from './styles';

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Container className={classes.notFoundContainer}>
      <img className={classes.notFoundImg} src={NotFoundBg} alt="" />
      <Typography variant='h5'>No results Found</Typography>
      <Button
        variant='contained'
        color='primary'
        disableElevation
        tabIndex={2}
        onClick={navigate('/')}
      >
        Go Back
      </Button>
    </Container>
  )
}

export default NotFound