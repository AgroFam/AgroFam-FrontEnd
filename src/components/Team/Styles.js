import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    height: 0,
    paddingTop: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundBlendMode: 'darken'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  mediaContainer: {
    position: 'relative'
  },
  CardsContainer: {
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: '1.5em',
    left: '1.5em',
    '& h3': {
      fontSize: '2em',
      color: '#e2f5da',
      textShadow: '0px 0px 3px rgba(0,0,0,0.80)',
    },
    '& p': {
      color: '#f7cda1',
      textShadow: '0px 0px 6px rgba(0,0,0,0.80)',
    },
    '& hr': {
      marginBlock: '0.2em',
      backgroundColor: '#e2f5da',
    },
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
  },
  iconsContainer: {
    display: 'flex',
    gap: '0.5em',
    '& .MuiIconButton-label': {
      color: '#e2f5da'
    }
  }
}));
