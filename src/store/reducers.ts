import { combineReducers } from 'redux';

import baseApi from './api/baseApi';
import auth from './slices/authSlice';
import warningModalSlice from './slices/warningModalSlice';

export default combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth,
  warningModal: warningModalSlice,
});
