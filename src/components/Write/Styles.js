import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '90px 0 20px',
    padding: '0',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: '110vh',
    width: 'min(100%, 1000px)',
    padding: '1.5em',
    gap: '1em',
    '& ul,ol': {
      padding: '0 1em',
    },
    [theme.breakpoints.down('xs')]: {
      minHeight: '100vh',
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
  fileInputNormal: {
    border: '1px solid',
    borderColor: theme.palette.divider,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  fileInputError: {
    border: '1px solid',
    borderColor: theme.palette.error.main,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  selectedFile: {
    width: '100%',
    aspectRatio: 2 / 1,
    objectFit: 'cover',
    transform: 'scale(1.05) translateY(4px)',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1em',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
      flexDirection: 'column',
      gap: '1em',
    },
  },
  headerTitle: {
    '& > *': {
      display: 'inline'
    },
    '& p': {
      color: theme.palette.divider
    }
  },
  buttonSubmit: {
    marginBottom: 10
  },
  buttonGroup: {
    display: 'flex',
    gap: '1em',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
      width: '100%',
      // margin: '10px 0'
    },
  },
}));
