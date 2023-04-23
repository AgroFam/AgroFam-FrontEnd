import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  Link
} from '@material-ui/core';
import useStyles from './Styles';
import { GitHub, Instagram, LinkedIn } from '@material-ui/icons';

const teamData = [
  {
    firstName: 'Uday',
    lastName: 'Girhepunje',
    position: 'Project Lead',
    about:
      "Hi, I'm a movie buff 🍿, a shutterbug 📸, and a lifelong learner📖. I love watching all kinds of films, from classics to comedies, and capturing the beauty of the world through my lens. I'm always curious and eager to learn new things.",
    github: 'https://github.com/mrcoder991',
    linkedIn: 'https://www.linkedin.com/in/uday-girhepunje/',
    instagram: 'https://www.instagram.com/uday_699/',
    photo: 'https://ik.imagekit.io/nmtrlmn4bwh/AgroFam/Team/uday?updatedAt=1682244859808'
  },
  {
    firstName: 'Prathamesh',
    lastName: 'Kenjale',
    position: 'AI/ML Enthusiast',
    about:
      "Hi, I'm a tech enthusiast who likes to explore the fascinating world of AI and ML. I enjoy applying my skills and knowledge to solve real-world problems. When I'm not coding or learning new things, I like to play cricket and have fun with my friends. ",
    github: 'https://github.com/Prathamesh1811',
    linkedIn: 'https://www.linkedin.com/in/prathamesh-kenjale-b58a55208/',
    instagram: 'https://www.instagram.com/pratham_1811/',
    photo: 'https://ik.imagekit.io/nmtrlmn4bwh/AgroFam/Team/Prathamesh_?updatedAt=1682258555042'
  },
  {
    firstName: 'Vaibhav',
    lastName: 'Bombe',
    position: 'Frontend Developer',
    about:
      'As a front-end developer specializing in React JavaScript, I am skilled in creating dynamic and interactive user interfaces that deliver seamless and engaging user experiences. With a strong foundation in modern web development concepts and best practices.',
    github: 'https://github.com/vaibhavbombe',
    linkedIn: 'https://www.linkedin.com/in/vabby13',
    instagram: 'https://instagram.com/_v_s_bombe_',
    photo:
      'https://ik.imagekit.io/nmtrlmn4bwh/AgroFam/Team/Vaibhav_U6Lm-GlST?updatedAt=1682245556571'
  },
  {
    firstName: 'Rohit',
    lastName: 'More',
    position: 'Software Developer',
    about:
      "I love building websites and making them look great with React. I'm always trying to learn new things and stay up-to-date with the latest technology. I worked on this project with my team using MERN stack, and I got better at creating fun and easy-to-use websites.",
    github: 'https://github.com/rohitmore02',
    linkedIn: 'https://www.linkedin.com/in/rohit-more-25bb79206/',
    instagram: 'https://instagram.com/mr.rohit__more?igshid=ZDdkNTZiNTM',
    photo: 'https://ik.imagekit.io/nmtrlmn4bwh/AgroFam/Team/rohit?updatedAt=1682258516115'
  }
];

const Team = () => {
  const classes = useStyles();

  const ProfileCard = ({ member }) => (
    <Card className={classes.card} variant="outlined">
      <div className={classes.mediaContainer}>
        <CardMedia className={classes.media} image={member.photo} />
        <div className={classes.overlay}>
          <Typography variant="h3">{member.firstName}</Typography>
          <Typography variant="h3">{member.lastName}</Typography>
          <Divider />
          <Typography variant="body2" color="secondary">
            {member.position}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          <div className={classes.iconsContainer}>
            <IconButton size="small">
              <Link href={member.github} target='_blank' underline="none" color="inherit">
                <GitHub fontSize="small" />
              </Link>
            </IconButton>
            <IconButton size="small">
              <Link href={member.linkedIn} target='_blank' underline="none" color="inherit">
                <LinkedIn fontSize="small" />
              </Link>
            </IconButton>
            <IconButton size="small">
              <Link href={member.instagram} target='_blank' underline="none" color="inherit">
                <Instagram fontSize="small" />
              </Link>
            </IconButton>
          </div>
        </div>
      </div>
      <CardContent>
        <Typography variant="caption" color="textSecondary">
          About
        </Typography>

        <Typography gutterBottom variant="body2" color="textPrimary">
          {member.about}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container
      className={classes.homeContainer}
      maxWidth="md"
      style={{ margin: '100px auto 20px' }}>
      <Typography variant="h5" gutterBottom>
        🪴 Meet AgroFam Team
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        style={{ maxWidth: '500px', marginBottom: '2em' }}>
        The development of the project and its maintenance is lead by team of 4 highly passionate
        students at MESCOE Pune.
      </Typography>
      <Grid className={classes.CardsContainer} container spacing={2}>
        {teamData.map((memberData, i) => (
          <Grid key={i} item xs={12} sm={6} md={6}>
            <ProfileCard member={memberData} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Team;
