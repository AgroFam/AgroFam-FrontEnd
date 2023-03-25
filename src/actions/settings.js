import { SET_THEME, SET_LANGUAGE } from "../constants/actionTypes";

export const setTheme = (mode) => async (dispatch) => {
  dispatch({ type: SET_THEME, payload: mode });
};

export const setLanguage = (language) => async (dispatch) => {
  dispatch({ type: SET_LANGUAGE, payload: language });
};
