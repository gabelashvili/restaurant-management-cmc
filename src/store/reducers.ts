import { combineReducers } from 'redux';

import baseApi from './api/baseApi';
import auth from './slices/authSlice';

export default combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth,
});
