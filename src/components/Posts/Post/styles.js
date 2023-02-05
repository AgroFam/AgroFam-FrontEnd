import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


export default makeStyles((theme) => ({
  media: {
    aspectRatio: '1/1',
    height: '200px',
    objectFit: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '120px',
    },
    borderRadius: '12px',
    marginRight: '1em',
  },
  card: {
    borderRadius: '12px',
    maxWidth: '900px',
    padding: '0.5em'
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
  },
  postDetailsText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  }
}));
