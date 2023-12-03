import { configureStore } from '@reduxjs/toolkit';

import baseApi, { rtkQueryErrorLogger } from './api/baseApi';
import reducer from './reducers';

export const store = configureStore({
  reducer,
  middleware: (gdm) => [...gdm({ serializableCheck: false }).concat(baseApi.middleware).concat(rtkQueryErrorLogger)],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
