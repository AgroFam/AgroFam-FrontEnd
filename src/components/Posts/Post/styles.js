import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  media: {
    aspectRatio: '1/1',
    height: '150px',
    objectFit: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '100px',
    },
    borderRadius: '12px',
  },
  card: {
    borderRadius: '12px',
    maxWidth: '900px'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '1.5em',
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
    padding: '1.5em',
    display: 'flex',
    justifyContent: 'space-between',
  },
  postDetailsText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }
}));
