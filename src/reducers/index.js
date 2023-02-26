import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import preferences from './preferences';

export const reducers = combineReducers({ posts, auth, preferences });
