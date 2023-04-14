import { AUTH, SET_SNACKBAR } from '../constants/actionTypes';
import * as api from '../../api/index.js';
import jwtDecode from 'jwt-decode';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    
    const token = data.token;

    const authData = jwtDecode(token);

    dispatch({ type: AUTH, payload: { token, authData } });
    
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
    const token = data.token;

    const authData = jwtDecode(token);

    dispatch({ type: AUTH, payload: { token, authData } });

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

export const googleLogin = (authToken) => async (dispatch) => {
  try {
    const { data } = await api.googleSignIn(authToken);

    const token = data.token;

    const authData = jwtDecode(token);

    dispatch({ type: AUTH, payload: { token, authData } });

    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: 'Logged In With Google' } })

  } catch (error) {
    if (error.response) {
      dispatch({ type: SET_SNACKBAR, payload: { open: true, message: `⚠️ ${error.response.data.message}` } })
    } else {
      console.log(error.message);
    }
  }
}