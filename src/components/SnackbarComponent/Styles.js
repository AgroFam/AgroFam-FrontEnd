import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  snackBar: {
    maxWidth: '450px',
    [theme.breakpoints.down('xs')]: {
      bottom: 70
    }
  }
}));
