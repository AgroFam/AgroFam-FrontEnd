import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import preferences './preferences';

export const reducers = combineReducers({ posts, auth, preferences });
