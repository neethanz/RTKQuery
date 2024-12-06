import {combineReducers, configureStore} from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import {setupListeners} from '@reduxjs/toolkit/query';
import baseService from './services/base_query';

const combinedReducer = combineReducers({
  [baseService.reducerPath]: baseService.reducer,
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat([
      baseService.middleware,
    ]),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
