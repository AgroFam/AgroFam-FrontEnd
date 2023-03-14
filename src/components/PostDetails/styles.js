import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    margin: '90px auto 20px',
    [theme.breakpoints.down('xs')]: {
      padding: '0'
    },
  },
  blogHeader: {
    padding: '1em 0',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  blogHeaderAvatar: {
    width: '45px',
    height: '45px',
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500]
  },
  blogHeaderTitle: {
    fontSize: '1.3em',
    color: theme.palette.text.primary,
  },
  blogHeaderSubText: {
    color: theme.palette.text.secondary,
    fontSize: '0.9em',
    '& .MuiButton-label': {
      color: theme.palette.text.secondary,
      fontSize: '0.9em',
      textTransform: 'none'
    }
  },
  blogTitle: {
    fontSize: '4em',
    color: theme.palette.text.primary,
    [theme.breakpoints.down('xs')]: {
      fontSize: '2em'
    },
  },
  blogContent: {
    fontSize: '1.5em',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3em'
    },
    '& p': {
      paddingBottom: '2em'
    },
    '& a': {
      color: theme.palette.secondary.main,
    },
    '& h2': {
      color: theme.palette.text.primary,
    },
    '& code': {
      backgroundColor: 'rgba(110,118,129,0.4)',
      borderRadius: theme.shape.borderRadius,
      padding: '0 0.2em',
    }
  },
  media: {
    margin: '2em 0',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
    marginTop: '100px'
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0'
    },
    commentsTextContainer: {
      width: '70%',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    }
  }
}));
