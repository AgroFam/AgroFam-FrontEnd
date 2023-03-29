import Axios from 'axios';
import config from '../config';

const API = Axios.create({ baseURL: config.apiBaseURL });
const NLP_API = Axios.create({ baseURL: 'https://nlp-production.up.railway.app' });
 
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const fetchPost = (id, lang) => API.get(`api/posts/${id}?lang=${lang}`);
export const fetchPosts = (page, lang) => API.get(`api/posts?page=${page}&lang=${lang}`);
export const fetchPostsBySearch = (searchQuery, lang) =>
  API.get(`api/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&lang=${searchQuery.lang}`);
export const createPost = (newPost) => API.post('api/posts', newPost);
export const likePost = (id) => API.patch(`api/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`api/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`api/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`api/posts/${id}`);

export const signIn = (FormData) => API.post('api/user/signin', FormData);
export const signUp = (FormData) => API.post('api/user/signup', FormData);

export const getArticlesFromSearch = (searchQuery) => NLP_API.get(`searchImage?q=${searchQuery}`)
