import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { SET_SNACKBAR } from '../../redux/constants/actionTypes';
import useStyles from './Styles'

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { snackBarState } = useSelector(state => state.settings);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: SET_SNACKBAR, payload: { open: false, message: '' } })
  };

  return (
    <>
      <Snackbar
        className={classes.snackBar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackBarState.open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={snackBarState.message}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
}

export default SnackbarComponent;