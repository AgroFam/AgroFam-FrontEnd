import React from 'react';
import { Container } from '@material-ui/core';
import useStyles from './Styles';

const About = () => {
    const classes = useStyles()
  return (
    <Container
      className={classes.homeContainer}
      maxWidth="lg"
      style={{ margin: '100px auto 20px' }}>
     <div>About</div>
      <img style={{width: '200px'}} src='https://media0.giphy.com/media/Lr4HRF6DEEJo90SQXF/giphy.gif?cid=6c09b952b76587897d4ccc54bcd9f79e9d4fcabb8397a3b1&rid=giphy.gif&ct=s'/>
    </Container>
  );
};

export default About;
