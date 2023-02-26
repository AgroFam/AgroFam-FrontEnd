import { SET_THEME} from '../constants/actionTypes';

const preferencesReducer = (state = { userTheme: localStorage.getItem('userTheme') }, action) => {
  switch (action.type) {
    case SET_THEME:
      localStorage.setItem('userTheme', true);
      return { ...state, authData: action?.data, isLoggedIn: true };
    default:
      return state;
  }
};

export default preferencesReducer;