import { makeStyles, alpha } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
    top: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1em',
    backgroundColor:
      theme.palette.type === 'dark' ? 'hsla(104, 25%, 10%, 0.85)' : 'hsla(104, 25%, 90%, 0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: '5px 20px',
    zIndex: '9',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5em 1em'
    },
    [theme.breakpoints.down('xs')]: {
      flexGrow: '1'
    }
  },
  menuItems1: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    width: 'inherit'
  },
  menuItems2: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300
  },
  toolbar: {
    display: 'flex',
    padding: '0',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    },
    gap: '1em'
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center'
    }
  },
  logout: {
    marginLeft: '20px'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  logoText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  menuItemsChild: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    alignSelf: 'strech'
  },
  profileButton: {
    padding: '0'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  },
  userMenu: {
    width: '320px',
  },
  userMenuItem: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divider: {
    width: '100%'
  },
  privacyPolicy: {
    display: 'grid',
    placeItems: 'center',
    padding: '0.5em'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.type === 'dark' ? alpha(theme.palette.common.white, 0.15) : alpha(theme.palette.common.black, 0.10),
    '&:hover': {
      backgroundColor: theme.palette.type === 'dark' ? alpha(theme.palette.common.white, 0.25) : alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: 'inherit',
    paddingLeft: '3em',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create('width'),
    width: '100%',
    color: 'inherit',
    width: 'inherit',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));
