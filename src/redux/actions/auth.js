import { AUTH, SET_SNACKBAR } from '../constants/actionTypes';
import * as api from '../../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: 'Successfully Logged In' } })
    navigate('/');
  } catch (error) {
    if (error.response) {
      dispatch({ type: SET_SNACKBAR, payload: { open: true, message: `⚠️ ${error.response.data.message}` } })
    } else {
      console.log(error.message);
    }

  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: 'Welcome New User, You are all set for AgroFam' } })
    navigate('/');
  } catch (error) {
    if (error.response) {
      dispatch({ type: SET_SNACKBAR, payload: { open: true, message: `⚠️ ${error.response.data.message}` } })
    } else {
      console.log(error.message);
    }
  }
};
