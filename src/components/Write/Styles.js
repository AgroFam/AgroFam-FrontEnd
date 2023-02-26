import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '90px 0 20px',
    padding: '0',
  },
  header: {
    marginBlock: '0.5em',
    [theme.breakpoints.down('xs')]: {
      alignSelf: 'baseline',
    }
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: '73vh',
    padding: '1.5em',
    '& ul,ol': {
      padding: '0 1em',
    },
  },
  loginImg: {
    width: '30%',
    [theme.breakpoints.down('xs')]: {
      width: '60%',
    },
  },
  NotLoggedInComponent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    gap: '2em',
    textAlign: 'center',
  },
}));
