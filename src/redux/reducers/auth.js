import jwtDecode from 'jwt-decode';
import { AUTH, LOGOUT } from '../constants/actionTypes';

const profile = JSON.parse(localStorage.getItem('profile'))

let defaultAuthData;
try {
  defaultAuthData = jwtDecode(profile?.token)
} catch (error) {
  defaultAuthData = null;
}

const defaultState = {
  authData: defaultAuthData,
  isLoggedIn: profile?.isLoggedIn || false
}

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ token: action?.payload.token, isLoggedIn: true }));
      return { ...state, authData: action?.payload.authData, isLoggedIn: true };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
