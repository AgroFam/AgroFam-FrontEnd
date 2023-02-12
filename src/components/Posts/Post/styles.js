import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  media: {
    aspectRatio: '1/1',
    height: '200px',
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
    cursor: 'pointer',
  },
  actions: {
    padding: '1em',
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
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em'
    },
  },
  cardHeader: {
    [theme.breakpoints.down('xs')]: {
      padding: '0.7em',
    },
  }
}));
