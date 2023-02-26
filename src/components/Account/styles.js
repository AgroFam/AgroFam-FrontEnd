import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '80vh',
    alignItems:'center',
  },
  cardContent: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    gap:'2em',
  },
  cardHeaders: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    gap:'0.5em',
  },
  avtar:{
    width: '100px',
    height: '100px',
  }
}));