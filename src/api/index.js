import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

let API;

if (process.env.REACT_APP_ENVIRONMENT === 'DEVELOPMENT') {
    API = axios.create({ baseURL: 'http://localhost:5000' });
} else if (process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION'){
    API = axios.create({ baseURL: 'https://notionofnetizen.up.railway.app' });
}

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
})

export const fetchPost = (id) => API.get(`api/posts/${id}`);
export const fetchPosts = (page) => API.get(`api/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`api/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createPost = (newPost) => API.post('api/posts', newPost);
export const likePost = (id) => API.patch(`api/posts/${id}/likePost`);
export const comment = (value ,id) => API.post(`api/posts/${id}/commentPost`, {value});
export const updatePost = (id, updatedPost) => API.patch(`api/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`api/posts/${id}`);

export const signIn = (FormData) => API.post('api/user/signin', FormData);
export const signUp = (FormData) => API.post('api/user/signup', FormData);

