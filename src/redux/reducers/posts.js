import {
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  START_LOADING,
  END_LOADING,
  COMMENT,
  FETCH_ARTICLES,
  START_LOADING_NEWS,
  END_LOADING_NEWS,
  SET_PROGRESS
} from '../constants/actionTypes';

const defaultState = {
  isLoading: false,
  isLoadingNews: false,
  progress: 0,
  posts: [],
  articles: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case START_LOADING_NEWS:
      return { ...state, isLoadingNews: true };
    case END_LOADING_NEWS:
      return { ...state, isLoadingNews: false };
    case SET_PROGRESS:
      return { ...state, progress: action.payload }
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload
      };
    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        })
      };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))
      };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case FETCH_ARTICLES:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
};
