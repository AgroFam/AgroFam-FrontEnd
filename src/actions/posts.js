import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  START_LOADING_NEWS,
  END_LOADING_NEWS,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  COMMENT,
  FETCH_ARTICLES,
  SET_PROGRESS,
} from '../constants/actionTypes';

import * as api from '../api/index.js';
import { createPostProgressInterval } from '../utils/utils';

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data }
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, navigate, clear) => async (dispatch) => {
  
  let setProgressInterval = createPostProgressInterval(dispatch)

  try {

    dispatch({ type: START_LOADING });

    const { data } = await api.createPost(post);
    
    dispatch({ type: CREATE, payload: data });
    
    clear();
    clearInterval(setProgressInterval);
    navigate(`/posts/${data._id}`);

    setTimeout(() => {
      dispatch({ type: END_LOADING });
    }, 500);

  } catch (error) {
    if (error.response && error.response.status === 500) {

      clearInterval(setProgressInterval);

      dispatch({ type: SET_PROGRESS, payload: 100 });

      setTimeout(() => {
        dispatch({ type: END_LOADING });
      }, 500);
      
      dispatch({ type: SET_PROGRESS, payload: 0 })

    } else {
      console.log(error.message);
    }
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const getArticlesFromSearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_NEWS });

    const query = searchQuery.toLowerCase().replace(/ /g, '_');
    const { data } = await api.getArticlesFromSearch(query);

    dispatch({ type: FETCH_ARTICLES, payload: data.results });

    dispatch({ type: END_LOADING_NEWS });
  } catch (error) {
    console.log(error.message);
  }
};
