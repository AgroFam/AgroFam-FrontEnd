import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  media: {
    aspectRatio: '1/1',
    height: '175px',
    objectFit: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '100px',
    },
    borderRadius: '12px',
    marginRight: '1em',
  },
  card: {
    borderRadius: '12px',
    maxWidth: '900px',
    width: '100%',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  green: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500]
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 0.2em',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
    '& a': {
      textDecoration: 'none',
    },
    '& a:hover': {
      textDecoration: 'underline',
      color: theme.palette.text.secondary,
    },
  },
  actions: {
    padding: '1.2em',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      padding: '0.7em',
    },
  },
  postDetailsText: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  postDetailsTitleText: {
    color: theme.palette.text.primary,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3em'
    },
  },
  cardHeader: {
    padding: '1.2em',
    [theme.breakpoints.down('xs')]: {
      padding: '0.7em',
    },
  }
}));
