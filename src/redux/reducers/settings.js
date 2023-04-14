import { SET_LANGUAGE, SET_THEME, PREFERS_DARK_MODE, SET_SNACKBAR } from '../constants/actionTypes';
import { ENGLISH, FOLLOW_SYSTEM } from '../constants/settings';

const defaultState = {
  colorTheme: localStorage.getItem('colorTheme') || FOLLOW_SYSTEM,
  language: localStorage.getItem('language') || ENGLISH,
  prefersDarkMode: false,
  snackBarState: { open: false, message: '' }
};

const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_THEME:
      localStorage.setItem('colorTheme', action.payload);
      if (action.payload === FOLLOW_SYSTEM) {
        localStorage.removeItem('colorTheme');
      }
      return { ...state, colorTheme: action.payload };
    case SET_LANGUAGE:
      localStorage.setItem('language', action.payload);
      return { ...state, language: action.payload };
    case PREFERS_DARK_MODE:
      return { ...state, prefersDarkMode: action.payload };
    case SET_SNACKBAR:
      return { ...state, snackBarState: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
