import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '50vh',
    alignItems: 'center'
  },
  cardContent: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    gap: '2em'
  },
  cardHeaders: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    gap: '0.5em'
  },
  list: {
    width: '50vw',
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
    },
  },
  listItem: {
    paddingBlock: '1em',
    [theme.breakpoints.down('sm')]: {
      '& .MuiListItemIcon-root': {
        minWidth: '3em',
      }
    },
  },
  avtar: {
    width: '100px',
    height: '100px'
  },
  select: {
    '& div': {
      padding: '12px 30px 12px 12px',
    },
  }
}));
