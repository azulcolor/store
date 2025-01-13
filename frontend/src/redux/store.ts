import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const loadAuthState = () => {
  const authData = localStorage.getItem('auth');
  return authData ? JSON.parse(authData) : { user: null, token: null };
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: loadAuthState(),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
