import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  newsContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '1em'
  },
  newsCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    padding: '1em 0',
    maxWidth: '410px',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    '& a:hover': {
      textDecoration: 'underline',
    }
  },
  newsContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '1em',
    '& img': {
      width: '2em',
      height: '2em'
    },
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.secondary,
      '& :hover': {
        textDecoration: 'underline',
      }
    }
  },
}));
