import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    borderRadius: '12px'
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px'
  },
  homeContainer: {
    padding: '0',
  },
  newsGrid: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  }
}));
